<template>
    <div class="co-unPaidByCustomer-report">
        <div slot="header">
            <el-collapse v-model="activeName" class="no-print" accordion>
                <el-collapse-item name="1">
                <span slot="title">

                            UnPaid By Customer Report
                        </span>

                    <el-form :inline="true" :model="unPaidByCustomerReport" ref="unPaidByCustomerReport">
                        <el-row type="flex" class="row-bg" justify="left" style="width: 100%">
                            <el-col :span="21">
                                <el-form-item label="Branch :">
                                    <el-select width="100%" filterable
                                               v-model="unPaidByCustomerReport.roleBranchOptionsModel"
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
                                    <el-select width="100%" filterable
                                               v-model="unPaidByCustomerReport.roleAreaOptionsModel"
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

                                <el-form-item class="registerDateAs" label="Date :">
                                    <el-date-picker format="dd/MM/yyyy"
                                                    v-model="unPaidByCustomerReport.dateAs"
                                                    type="date"
                                                    align="right"
                                                    placeholder="Pick a Date"
                                    >
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
                                <u>Unpaid By Customer Report</u>
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
                            <strong>Date:</strong> {{dateHeader}}
                        </div>
                    </div>
                        <table class="ui celled table table-report">
                                <thead>
                                    <tr>
                                        <th>#</th>
                                        <th>Patient Name</th>
                                        <th>Register Date</th>
                                        <th>Day Late</th>
                                        <th>Balance Unpaid</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <slot v-for="(unpaidByCustomer,index) in unPaidByCustomerData.data">
                                        <tr>
                                            <td>{{index + 1}}</td>
                                            <td>{{unpaidByCustomer.khName}}</td>
                                            <td>{{unpaidByCustomer.registerDate | momentFormat}}</td>
                                            <td>{{parseInt(unpaidByCustomer.dayLate)}}</td>
                                            <td style="text-align: right">{{ unpaidByCustomer.balance | numFormat}}</td>
                                        </tr>
                                    </slot>
                                    <tr>
                                        <td colspan="4" style="text-align: right">Total :</td>
                                        <td style="text-align: right">{{unPaidByCustomerData.totalBalanceUnPaid | numFormat}}</td>
                                    </tr>
                                </tbody>
                        </table>
                         <div style="width: 100%">

                                <div style="width: 30%; float: left; text-align: right">
                                   <div style="margin-bottom: 7em">
                                        Approved By
                                    </div>
                                    __________________
                                </div>
                            <div style="width: 40%">
                            </div>
                                <div style="width: 30%; float: right;text-align: left;">
                                            <div style="margin-bottom: 7em">
                                        Prepared By
                                            </div>
                                    __________________

                                    </div>
                                </div>
                            </span>
            <!--</el-col>
     </el-row>-->
        </span>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                unPaidByCustomerReport: {
                    roleBranchOptionsModel: [],
                    roleAreaOptionsModel: [],
                    dateAs: ""
                },

                roleBranchOptions: [],
                roleAreaOptions: [],

                dateAs: "",
                activeName: "1",
                unPaidByCustomerData: {},
                loading: false,

                companyName: "",
                companyEnName: "",
                addressName: "",

                branchHeader: "All",
                dateHeader: "All",

                printLoading: false,
            }
        },
        methods: {
            fetchBranchOption() {
                Meteor.call("fetchRolesBranch", Meteor.userId(), (err, result) => {
                    this.roleBranchOptions = result;
                })
            },
            fetchAreaOption(val) {
                Meteor.call("fetchRolesAreaByMultiRoleBranch", Meteor.userId(), val, (err, result) => {
                    this.roleAreaOptions = result;
                })
            },

            handleRunReport(formName) {
                let params = {};
                let userId = Meteor.userId();

                this.loading = true;
                if (this.unPaidByCustomerReport.roleAreaOptionsModel != "") {
                    params.rolesArea = {$in: this.unPaidByCustomerReport.roleAreaOptionsModel};
                    Meteor.call("getBranchHeader", this.unPaidByCustomerReport.roleAreaOptionsModel, (err, result) => {
                        this.branchHeader = result;
                    })
                }

                if (this.unPaidByCustomerReport.dateAs != "") {
                    params.registerDate = {
                        $lte: moment(this.unPaidByCustomerReport.dateAs).endOf("days").toDate()
                    };

                    this.dateHeader = moment(this.unPaidByCustomerReport.dateAs).format("DD/MM/YYYY");
                }

                Meteor.call('giveMeUnPaidByCustomerReport', params, userId, (err, result) => {
                    if (!err) {
                        this.unPaidByCustomerData = result;
                    }
                    this.loading = false;
                });


            },
            getCompany() {
                Meteor.call("getCompany", (err, result) => {
                    if (!err) {
                        this.companyName = result.khName;
                        this.companyEnName = result.enName;
                        this.addressName = result.khAddress;
                    }
                })

            },
            PrintReport() {
                window.print();
            }
        },
        watch: {


            "unPaidByCustomerReport.roleBranchOptionsModel"(val) {
                this.fetchAreaOption(val);
            }
            ,
            "unPaidByCustomerReport.roleAreaOptionsModel"(val) {
                this.fetchPatientOption(val);
            }
        },
        created() {
            this.fetchBranchOption();
            this.getCompany();
            this.unPaidByCustomerReport.dateAs = new Date();
        },
        computed: {
            dataExist() {
                return this.unPaidByCustomerData.data > 0;
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

    .el-table .cell {
        padding-left: 3px;
        padding-right: 3px;
    }


</style>