<template>
    <div class="co-journal-report">
        <el-collapse v-model="activeName" class="no-print" accordion>
            <el-collapse-item name="1">
                <span slot="title">

                            Journal Report
                        </span>

                <el-form :inline="true" :model="journalReport" ref="journalReport">
                    <el-row type="flex" class="row-bg" justify="left" style="width: 100%">
                        <el-col :span="21">
                            <el-form-item label="Branch :">
                                <el-select width="100%" filterable v-model="journalReport.roleBranchOptionsModel"
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
                                <el-select width="100%" filterable v-model="journalReport.roleAreaOptionsModel"
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

                            <el-form-item class="journalDateRange" label="Date :">
                                <el-date-picker format="dd/MM/yyyy"
                                                v-model="journalReport.dateRange"
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
                            <el-form-item label="Currency :">
                                <el-select filterable v-model="journalReport.currencyOptionsModel" multiple
                                           placeholder="All">
                                    <el-option
                                            v-for="item in currencyOptions"
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
        <span slot="content">
             <!--<el-row type="flex" class="row-bg a4-portrait" justify="center">
                    <el-col :span="24">
                        <div class="title">
                            <div class="title1">
                                {{companyName}}
                            </div>
                            <div class="title1">
                                {{companyEnName}}
                            </div>
                            <div class="title2">
                                <u>Journal Report</u>
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
                        <el-table fit v-loading.body="loading" :data="journalsData" border
                                  :default-sort="{prop: 'journalDateName', order: 'descending'}"
                                  style="width: 100%">

                        <el-table-column type="index" width="50px auto" sortable></el-table-column>
                        <el-table-column prop="journalDateName" width="80px auto" sortable
                                         label="Date"></el-table-column>
                        <el-table-column prop="voucherId" width="70px" label="Voucher"></el-table-column>
                        <el-table-column prop="memo" label="Description"></el-table-column>
                        <el-table-column label="Account Name" width="250px auto">
                                <template scope="props">
                                    <span v-html="props.row.accountName"></span>
                                </template>
                        </el-table-column>

                        <el-table-column label="Dr">
                                <template scope="props">
                                    <span v-html="props.row.dr"></span>
                                </template>
                        </el-table-column>
                        <el-table-column label="Cr">
                                <template scope="props">
                                    <span v-html="props.row.cr"></span>
                                </template>
                            </el-table-column>
                        </el-table>
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

    </el-col>
    </el-row>-->


            <div class="title">
                            <div class="title1">
                                {{companyName}}
                            </div>
                            <div class="title1">
                                {{companyEnName}}
                            </div>
                            <div class="title2">
                                <u>Journal Report</u>
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
                        <th>Voucher</th>
                        <th>Description</th>
                        <th>Account Name</th>
                        <th>Dr</th>
                        <th>Cr</th>
                    </tr>
                </thead>
                <tbody>
                    <slot v-for="(journal, index) in journalsData">
                        <tr>
                            <td>{{index +1}}</td>
                            <td>{{journal.journalDateName}}</td>
                            <td>{{journal.voucherId}}</td>
                            <td>{{journal.memo}}</td>
                            <td v-html="journal.accountName"></td>
                            <td style="text-align: right"><span v-html="journal.dr"></span></td>
                            <td style="text-align: right"><span v-html="journal.cr"></span></td>
                        </tr>
                    </slot>
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
    </div>
</template>
<script>
    export default {
        data(){
            return {
                journalReport: {
                    roleBranchOptionsModel: [],
                    roleAreaOptionsModel: [],
                    currencyOptionsModel: [],
                    dateRange: ""
                },

                roleBranchOptions: [],
                roleAreaOptions: [],
                currencyOptions: [],


                dateRange: "",
                activeName: "1",
                journalsData: [],
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

            fetchCurrencyOption(){
                let list = [];
                list.push({label: "USD", value: "USD"});
                list.push({label: "KHR", value: "KHR"});
                list.push({label: "THB", value: "THB"});
                this.currencyOptions = list;

            },

            handleRunReport(formName){

                let params = {};
                this.loading = true;
                if (this.journalReport.roleAreaOptionsModel != "") {
                    params.rolesArea = {$in: this.journalReport.roleAreaOptionsModel};

                    Meteor.call("getBranchHeader", this.journalReport.roleAreaOptionsModel, (err, result) => {
                        this.branchHeader = result;
                    })
                }

                if (this.journalReport.dateRange != "") {
                    params.journalDate = {
                        $gte: moment(this.journalReport.dateRange[0]).startOf("days").toDate(),
                        $lte: moment(this.journalReport.dateRange[1]).startOf("days").toDate()
                    };

                    this.dateRangeHeader = moment(this.journalReport.dateRange[0]).format("DD/MM/YYYY") + "-" + moment(this.journalReport.dateRange[1]).format("DD/MM/YYYY");
                }


                if (this.journalReport.currencyOptionsModel != "") {
                    params.currencyId = {$in: this.journalReport.currencyOptionsModel};
                }

                let userId=Meteor.userId();


                Meteor.call('giveMeJournalReport', params,userId, (err, result) => {
                    if (!err) {
                        console.log(result);
                        this.journalsData = result;
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

            /* exportToExcel(){
             Meteor.call('giveMeJournalReport', this.journalsData, (err, workbookBuffer) => {
             if (!err) {
             //call mixin saveAs from '/imports/api/mixins/file-saver-fn.js'
             this.saveAs(workbookBuffer, 'JournalReport');
             }
             })
             },*/
            PrintReport(){
                window.print();
            }
        },
        watch: {


            "journalReport.roleBranchOptionsModel"(val){
                this.fetchAreaOption(val);
            }
            ,
            "journalReport.roleAreaOptionsModel"(val)
            {
                this.fetchPatientOption(val);
            }

        },
        created()
        {
            this.fetchBranchOption();
            this.fetchCurrencyOption();
            this.getCompany();
            this.journalReport.dateRange = [moment().startOf("months").toDate(), moment().endOf("months").toDate()];


        },
        computed: {
            dataExist(){
                return this.journalsData.length > 0;
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

    /*.journalDateRange .el-date-editor--daterange.el-input {
        width: 280px;
    }*/

    /*.journalExchange .el-select {
        width: 280px;
    }*/

    .el-table .cell {
        padding-left: 3px;
        padding-right: 3px;
    }


</style>