<template>
    <div class="co-profitLost-report">
        <div slot="header">
            <el-collapse v-model="activeName" class="no-print" accordion>
                <el-collapse-item name="1">
                <span slot="title">

                            ProfitLost Report
                        </span>

                    <el-form :inline="true" :model="profitLostReport" ref="profitLostReport">
                        <el-row type="flex" class="row-bg" justify="left" style="width: 100%">
                            <el-col :span="21">
                                <el-form-item label="Branch :">
                                    <el-select width="100%" filterable v-model="profitLostReport.roleBranchOptionsModel"
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
                                    <el-select width="100%" filterable v-model="profitLostReport.roleAreaOptionsModel"
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

                                <el-form-item class="profitLostDateRange" label="Date :">
                                    <el-date-picker format="dd/MM/yyyy"
                                                    v-model="profitLostReport.dateRange"
                                                    type="daterange"
                                                    align="right"
                                                    placeholder="Pick a range"
                                                    :picker-options="pickerOptions2">
                                    </el-date-picker>
                                </el-form-item>

                                <el-form-item label-width="100px" label="Exchange  :">
                                    <el-select width="100%" filterable v-model="profitLostReport.exchangeOptionsModel"
                                               placeholder="(Select One)">
                                        <el-option
                                                v-for="item in exchangeOptions"
                                                :key="item.value"
                                                :label="item.label"
                                                :value="item.value">
                                        </el-option>
                                    </el-select>
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

                        <div class="title">
                            <div class="title1">
                                {{companyName}}
                            </div>
                            <div class="title1">
                                {{companyEnName}}
                            </div>
                            <div class="title2">
                                <u>ProfitLost Report</u>
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
                                <tbody>
                                    <tr>
                                        <td colspan="2"><b>Revenue</b></td>
                                    </tr>
                                    <slot v-for="(revenue,index) in profitLostsData.dataIncome">
                                        <tr>
                                            <td class="margin-report-td">{{revenue._id.level | tabFormat}}{{revenue._id.code}} : {{revenue._id.name}}</td>
                                            <td>{{revenue.total | numFormat}}</td>

                                        </tr>
                                    </slot>
                                    <tr>
                                        <td><b>Total Revenue</b></td>
                                        <td><b>{{profitLostsData.totalRevenue | numFormat}}</b></td>
                                    </tr>
                                    <tr>
                                        <td colspan="2"><b>Cost Of Good Sold</b></td>
                                    </tr>
                                    <slot v-for="(cog,index) in profitLostsData.cogs">
                                        <tr>
                                            <td class="margin-report-td">{{cog._id.level | tabFormat}}{{cog._id.code}} : {{cog._id.name}}</td>
                                            <td>{{cog._id.level | tabFormat}}{{cog.total | numFormat}}</td>
                                        </tr>
                                    </slot>
                                    <tr>
                                        <td><b>Total Cost Of Goods Sold</b></td>
                                        <td><b>{{profitLostsData.totalCOGS | numFormat}}</b></td>
                                    </tr>

                                    <tr>
                                        <td><b><u>Gross Profit</u></b> </td>
                                        <td><b>{{profitLostsData.grossProfit | numFormat}}</b></td>

                                    </tr>

                                    <tr>
                                        <td><b>Expense</b></td>
                                        <td></td>
                                    </tr>
                                     <slot v-for="(expense,index) in profitLostsData.dataExpense">
                                        <tr>
                                            <td class="margin-report-td">{{expense._id.level | tabFormat}}{{expense._id.code}} : {{expense._id.name}}</td>
                                            <td>{{expense._id.level | tabFormat}}{{expense.total | numFormat}}</td>
                                        </tr>
                                    </slot>
                                    <tr>
                                        <td><b><u>Total Expense</u></b> </td>
                                        <td><b>{{profitLostsData.totalExpense | numFormat}}</b></td>

                                    </tr>
                                     <tr>
                                        <td><b><u>Net Income</u></b></td>
                                         <td><b>{{profitLostsData.netIncome | numFormat}}</b></td>
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
    </div>
</template>
<script>
    export default {
        data() {
            return {
                profitLostReport: {
                    roleBranchOptionsModel: [],
                    roleAreaOptionsModel: [],
                    exchangeOptionsModel: "",
                    dateRange: ""
                },

                roleBranchOptions: [],
                roleAreaOptions: [],
                patientOptions: [],
                typeOptions: [],

                exchangeOptions: [],

                dateRange: "",
                activeName: "1",
                profitLostsData: [],
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
            fetchExchangeOption(val) {
                Meteor.call("fetchExchangeOption", val, (err, result) => {
                    this.exchangeOptions = result;
                })
            },
            fetchExchangeOption() {
                Meteor.call("fetchExchangeOption", (err, result) => {
                    this.exchangeOptions = result;
                })
            },

            handleRunReport(formName) {

                let params = {};
                let userId=Meteor.userId();

                this.loading = true;
                if (this.profitLostReport.roleAreaOptionsModel != "") {
                    params.rolesArea = {$in: this.profitLostReport.roleAreaOptionsModel};

                    Meteor.call("getBranchHeader", this.profitLostReport.roleAreaOptionsModel, (err, result) => {
                        this.branchHeader = result;
                    })
                }

                if (this.profitLostReport.dateRange != "") {
                    params.journalDate = {
                        $gte: moment(this.profitLostReport.dateRange[0]).startOf("days").toDate(),
                        $lte: moment(this.profitLostReport.dateRange[1]).startOf("days").toDate()
                    };
                    this.dateRangeHeader = moment(this.profitLostReport.dateRange[0]).format("DD/MM/YYYY") + "-" + moment(this.profitLostReport.dateRange[1]).format("DD/MM/YYYY");
                }

                Meteor.call('giveMeProfitLostReport', params, this.profitLostReport.exchangeOptionsModel,userId, (err, result) => {
                    if (!err) {
                        this.profitLostsData = result;
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

            /* exportToExcel(){
             Meteor.call('giveMeProfitLostReport', this.profitLostsData, (err, workbookBuffer) => {
             if (!err) {
             //call mixin saveAs from '/imports/api/mixins/file-saver-fn.js'
             this.saveAs(workbookBuffer, 'ProfitLostReport');
             }
             })
             },*/
            PrintReport() {
                window.print();
            }
        },
        watch: {


            "profitLostReport.roleBranchOptionsModel"(val) {
                this.fetchAreaOption(val);
            }
            ,
            "profitLostReport.roleAreaOptionsModel"(val) {
                this.fetchPatientOption(val);
            }

        },
        created() {
            this.fetchBranchOption();
            this.fetchExchangeOption();
            this.getCompany();
            this.profitLostReport.dateRange = [moment().startOf("months").toDate(), moment().endOf("months").toDate()];


        },
        computed: {
            dataExist() {
                return this.profitLostsData.length > 0;
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

    /*.profitLostDateRange .el-date-editor--daterange.el-input {
        width: 280px;
    }*/

    /*.profitLostExchange .el-select {
        width: 280px;
    }*/

    .el-table .cell {
        padding-left: 3px;
        padding-right: 3px;
    }


</style>