<template>
    <div class="co-registerByDate-report">
        <div slot="header">
            <el-collapse v-model="activeName" class="no-print" accordion>
                <el-collapse-item name="1">
                <span slot="title">

                            Register By Date Report
                        </span>

                    <el-form :inline="true" :model="registerByDateReport" ref="registerByDateReport">
                        <el-row type="flex" class="row-bg" justify="left" style="width: 100%">
                            <el-col :span="21">
                                <el-form-item label="Branch :">
                                    <el-select width="100%" filterable v-model="registerByDateReport.roleBranchOptionsModel"
                                               multiple
                                               placeholder="All">
                                        <el-option
                                                v-for="item in roleBranchOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>


                                <el-form-item label-width="60px" label="Area  :">
                                    <el-select width="100%" filterable v-model="registerByDateReport.roleAreaOptionsModel"
                                               multiple
                                               placeholder="All">
                                        <el-option
                                                v-for="item in roleAreaOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>

                                <el-form-item class="registerDateRange" label="Date :">
                                    <el-date-picker format="dd/MM/yyyy"
                                                    v-model="registerByDateReport.dateRange"
                                                    type="daterange"
                                                    align="right"
                                                    placeholder="Pick a range"
                                                    :picker-options="pickerOptions2">
                                    </el-date-picker>
                                </el-form-item>

                            </el-col>
                            <el-col :span="3">
                                <el-button :loading="loading" @click="handleRunReport('dynamicValidateForm')"
                                           type="primary"
                                           style="float: right;width: 130px;">
                                    <i class="el-icon-caret-right"></i>
                                    Run Report
                                </el-button>
                            </el-col>
                        </el-row>

                        <el-row type="flex" class="row-bg" justify="left">

                            <el-col :span="21">
                                <el-form-item label="Patient :">
                                    <el-select filterable v-model="registerByDateReport.patientOptionsModel" multiple
                                               placeholder="All">
                                        <el-option
                                                v-for="item in patientOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item label-width="60px" label="Status :">
                                    <el-select filterable v-model="registerByDateReport.typeOptionsModel" multiple
                                               placeholder="All">
                                        <el-option
                                                v-for="item in typeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-col>
                            <el-col :span="3">
                                <el-button v-show="dataExist" :loading="printLoading" type="success"
                                           style="float: right;width: 130px;"
                                           @click="PrintReport"><i class="el-icon-document"></i>
                                    Print
                                </el-button>
                            </el-col>
                        </el-row>
                    </el-form>
                </el-collapse-item>
            </el-collapse>

        </div>
        <span slot="content">

                        <span slot="content">
                            <div class="title">
                            <div class="title1">
                                {{companyName}}
                            </div>
                            <div class="title1">
                                {{companyEnName}}
                            </div>
                            <div class="title2">
                                <u>Register By Date Report</u>
                            </div>
                            <div class="title3">
                                {{addressName}}
                            </div>
                        </div>
                        <div style="width: 100%">
                        <div style="width: 50%; float: left">
                            <strong>Branch : </strong> {{branchHeader}}
                        </div>

                        <div style="width: 50%; float: right;text-align: right;">
                            <strong>Date:</strong> {{dateRangeHeader}}
                        </div>
                    </div>
                        <table class="ui celled table table-report">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Date</th>
                                        <th>Amount</th>
                                        <th>Paid</th>
                                        <th>UnPaid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <slot v-for="(register,index) in registersData.data">
                                        <tr>
                                            <td>{{index +1}}</td>
                                            <td>{{register.registerDate}}</td>
                                            <td style="text-align: right">{{register.netTotal}}</td>
                                            <td style="text-align: right">{{register.totalPaid}}</td>
                                            <td style="text-align: right">{{register.balance}}</td>
                                        </tr>
                                    </slot>
                                    <tr>
                                        <td colspan="2" style="text-align: right">Total :</td>
                                        <td style="text-align: right">{{registersData.totalNetTotal}}</td>
                                        <td style="text-align: right">{{registersData.total}}</td>
                                        <td style="text-align: right">{{registersData.totalBalance}}</td>
                                    </tr>
                                </tbody>
                        </table>

                            </span>
        </span>
    </div>
</template>
<script>
    export default {
        data(){
            return {
                registerByDateReport: {
                    roleBranchOptionsModel: [],
                    roleAreaOptionsModel: [],
                    patientOptionsModel: [],
                    typeOptionsModel: [],
                    dateRange: ""
                },

                roleBranchOptions: [],
                roleAreaOptions: [],
                patientOptions: [],
                typeOptions: [],

                exchangeOptions: [],

                dateRange: "",
                activeName: "1",
                registersData: [],
                loading: false,

                companyName: "",
                companyEnName: "",
                addressName: "",

                branchHeader: "All",
                dateRangeHeader: "All",
                pickerOptions2: {
                    shortcuts: [{
                        text: 'Last week',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last month',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: 'Last 3 months',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                printLoading: false,
            }
        },
        methods: {
            fetchBranchOption(){
                Meteor.call("fetchRolesBranch", Meteor.userId(), (err, result) => {
                    this.roleBranchOptions = result;
                })
            },
            fetchAreaOption(val){
                Meteor.call("fetchRolesAreaByMultiRoleBranch", Meteor.userId(), val, (err, result) => {
                    this.roleAreaOptions = result;
                })
            },
            fetchPatientOption(val){
                Meteor.call("fetchPatientOption", val, (err, result) => {
                    this.patientOptions = result;
                })
            },
            fetchExchangeOption(){
                Meteor.call("fetchExchangeOption", (err, result) => {
                    this.exchangeOptions = result;
                })
            },
            fetchTypeOption(){
                let list = [];
                list.push({label: "Active", value: "Active"});
                list.push({label: "Partial", value: "Partial"});
                list.push({label: "Complete", value: "Complete"});

                this.typeOptions = list;
            },

            handleRunReport(formName){

                let params = {};
                this.loading = true;
                if (this.registerByDateReport.roleAreaOptionsModel != "") {
                    params.rolesArea = {$in: this.registerByDateReport.roleAreaOptionsModel};

                    Meteor.call("getBranchHeader", this.registerByDateReport.roleAreaOptionsModel, (err, result) => {
                        this.branchHeader = result;
                    })
                }

                if (this.registerByDateReport.dateRange != "") {
                    params.registerDate = {
                        $gte: moment(this.registerByDateReport.dateRange[0]).startOf("days").toDate(),
                        $lte: moment(this.registerByDateReport.dateRange[1]).startOf("days").toDate()
                    };

                    this.dateRangeHeader = moment(this.registerByDateReport.dateRange[0]).format("DD/MM/YYYY") + "-" + moment(this.registerByDateReport.dateRange[1]).format("DD/MM/YYYY");
                }

                if (this.registerByDateReport.patientOptionsModel != "") {
                    params.patientId = {$in: this.registerByDateReport.patientOptionsModel};
                }

                if (this.registerByDateReport.typeOptionsModel != "") {
                    params.status = {$in: this.registerByDateReport.typeOptionsModel};
                }


                Meteor.call('giveMeRegisterByDateReport', params, (err, result) => {
                    if (!err) {
                        this.registersData = result;
                        console.log(result);
                    }
                    this.loading = false;
                });


            },
            getCompany(){
                Meteor.call("getCompany", (err, result) => {
                    if (!err) {
                        this.companyName = result.khName;
                        this.companyEnName = result.enName;
                        this.addressName = result.khAddress;
                    }
                })

            },
            PrintReport(){
                window.print();
            }
        },
        watch: {


            "registerByDateReport.roleBranchOptionsModel"(val){
                this.fetchAreaOption(val);
            }
            ,
            "registerByDateReport.roleAreaOptionsModel"(val)
            {
                this.fetchPatientOption(val);
            }

        },
        created()
        {
            this.fetchBranchOption();
//            this.fetchPatientOption([]);
            this.fetchTypeOption([]);
            this.getCompany();
            this.registerByDateReport.dateRange = [moment().startOf("months").toDate(), moment().endOf("months").toDate()];


        },
        computed: {
            dataExist(){
                return this.registersData.length > 0;
            }
        },

    }
</script>


<style scope>
    @page {
        /*size: A4 landscape;*/
        size: A4;
        max-height: 100%;
        width: 100%;
        margin: 0;
    }

    @media print {
        html, body {
            /*width: 297mm;*/
            height: auto;
            width: 100%;
            left: 0;
            right: 0;
            top: 0;
        }

        /*el-row {
            max-width: 2480px;
            width: 100%;
        }

        el-table {

            max-width: 2480px;
            width: 100%;
            background: #000;
            height: auto;
            page-break-inside: avoid;
        }

        el-table-column {
            width: auto;
            overflow: hidden;
            word-wrap: break-word;
        }
*/
        /* ... the rest of the rules ... */
    }

    .el-table {
        font-size: 12px !important;
    }

    .el-table td {
        padding: 1px !important;
        margin: 1px !important;
    }

    .el-table th {
        padding: 1px !important;
        text-align: center !important;
    }

    /*.registerDateRange .el-date-editor--daterange.el-input {
        width: 280px;
    }*/

    /*.registerExchange .el-select {
        width: 280px;
    }*/

    .el-table .cell {
        padding-left: 3px;
        padding-right: 3px;
    }


</style>