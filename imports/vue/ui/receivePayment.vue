<template>
    <div class="co-receivePayment-report">
        <div slot="header">
            <el-collapse v-model="activeName" class="no-print" accordion>
                <el-collapse-item name="1">
                <span slot="title">

                            ReceivePayment Report
                        </span>

                    <el-form :inline="inl" label-position="top" :model="receivePaymentReport"
                             ref="receivePaymentReport">
                        <el-row type="flex" class="row-bg" justify="left" style="width: 100%">
                            <el-col :span="21">
                                <el-form-item label="Branch :">
                                    <el-select width="100%" filterable
                                               v-model="receivePaymentReport.roleBranchOptionsModel"
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
                                               v-model="receivePaymentReport.roleAreaOptionsModel"
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

                                <el-form-item class="receivePaymentDateRange" label="Date :">
                                    <el-date-picker format="dd/MM/yyyy"
                                                    v-model="receivePaymentReport.dateRange"
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
                                <u>ReceivePayment Report</u>
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
                        <el-table fit v-loading.body="loading" :data="receivePaymentsData" border
                                  :default-sort="{prop: 'receivePaymentDate', order: 'descending'}"
                                  :summary-method="getSummariesReceivePayment"
                                  show-summary
                                  style="width: 100%">


                        <el-table-column type="index" width="50px auto" sortable></el-table-column>
                        <el-table-column prop="patientDoc.khName" sortable label="Name"></el-table-column>
                        <el-table-column prop="receivePaymentDate" width="100px auto" sortable label="Date"></el-table-column>
                        <el-table-column label="Item" width="160px auto">
                            <template scope="props">
                                <span v-html="props.row.itemDetail"></span>
                            </template>
                        </el-table-column>
                            &lt;!&ndash;
                                                    <el-table-column prop="total" label="Total"></el-table-column>
                                                    <el-table-column prop="totalDiscount" label="Discount"></el-table-column>
                            &ndash;&gt;
                        <el-table-column prop="netTotal" label="Amount"></el-table-column>
                        <el-table-column prop="totalPaid" label="Paid"></el-table-column>
                        <el-table-column prop="balance" label="Un Paid"></el-table-column>
                            &lt;!&ndash;<el-table-column prop="status" label="Status"></el-table-column>&ndash;&gt;

                        </el-table>-->
                        <span slot="content">
                            <div class="title">
                            <div class="title1">
                                {{companyName}}
                            </div>
                            <div class="title1">
                                {{companyEnName}}
                            </div>
                            <div class="title2">
                                <u>ReceivePayment Report</u>
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
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Paid Riel</th>
                                        <th>Paid Dollar</th>
                                        <th>Paid Baht</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <slot v-for="(receivePayment,index) in receivePaymentsData.data">
                                        <tr>
                                            <td>{{index + 1}}</td>
                                            <td>{{receivePayment.patientDoc && receivePayment.patientDoc.khName || ""}}</td>
                                            <td>{{receivePayment.paymentDateString}}</td>
                                            <td style="text-align: right">{{receivePayment.paidAmountKHR}}</td>
                                            <td style="text-align: right">{{receivePayment.paidAmountUSD}}</td>
                                            <td style="text-align: right">{{receivePayment.paidAmountTHB}}</td>
                                        </tr>
                                    </slot>
                                    <tr>
                                        <td colspan="3" style="text-align: right">Total :</td>
                                        <td style="text-align: right">{{receivePaymentsData.totalPaidAmountKHR}}</td>
                                        <td style="text-align: right">{{receivePaymentsData.totalPaidAmountUSD}}</td>
                                        <td style="text-align: right">{{receivePaymentsData.totalPaidAmountTHB}}</td>
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
                receivePaymentReport: {
                    roleBranchOptionsModel: [],
                    roleAreaOptionsModel: [],
                    patientOptionsModel: [],
                    typeOptionsModel: [],
                    dateRange: ""
                },
                inl: true,
                roleBranchOptions: [],
                roleAreaOptions: [],
                patientOptions: [],
                typeOptions: [],

                exchangeOptions: [],
                dateRange: "",
                activeName: "1",
                receivePaymentsData: {},
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
            fetchPatientOption(val) {
                Meteor.call("fetchPatientOption", val, (err, result) => {
                    this.patientOptions = result;
                })
            },
            fetchExchangeOption() {
                Meteor.call("fetchExchangeOption", (err, result) => {
                    this.exchangeOptions = result;
                })
            },
            fetchTypeOption() {
                let list = [];
                list.push({label: "Active", value: "Active"});
                list.push({label: "Partial", value: "Partial"});
                list.push({label: "Complete", value: "Complete"});

                this.typeOptions = list;
            },

            handleRunReport(formName) {

                let params = {};
                let userId = Meteor.userId();

                this.loading = true;
                if (this.receivePaymentReport.roleAreaOptionsModel != "") {
                    params.rolesArea = {$in: this.receivePaymentReport.roleAreaOptionsModel};

                    Meteor.call("getBranchHeader", this.receivePaymentReport.roleAreaOptionsModel, (err, result) => {
                        this.branchHeader = result;
                    })
                }

                if (this.receivePaymentReport.dateRange != "") {
                    params.paymentDate = {
                        $gte: moment(this.receivePaymentReport.dateRange[0]).startOf("days").toDate(),
                        $lte: moment(this.receivePaymentReport.dateRange[1]).endOf("days").toDate()
                    };

                    this.dateRangeHeader = moment(this.receivePaymentReport.dateRange[0]).format("DD/MM/YYYY") + "-" + moment(this.receivePaymentReport.dateRange[1]).format("DD/MM/YYYY");
                }

                if (this.receivePaymentReport.patientOptionsModel != "") {
                    params.patientId = {$in: this.receivePaymentReport.patientOptionsModel};
                }



                Meteor.call('giveMeReceivePaymentReport', params, userId, (err, result) => {
                    if (!err) {
                        this.receivePaymentsData = result;
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

            getSummariesReceivePayment(param) {
                const {columns, data} = param;
                const sums = [];
                columns.forEach((column, index) => {
                    if (index === 0) {
                        sums[index] = 'Total';
                        return;
                    }
                    const values = data.map(item => Number(numeral().unformat(item[column.property])));
                    if (!values.every(value => isNaN(value)) && index > 3) {
                        sums[index] = values.reduce((prev, curr) => {
                            const value = Number(curr);
                            if (!isNaN(value)) {
                                return prev + curr;
                            } else {
                                return prev;
                            }
                        }, 0);
                        sums[index] = numeral(sums[index]).format("0,00.000");
                    } else {
                        sums[index] = 'N/A';
                    }
                });

                return sums;
            },
            /* exportToExcel(){
             Meteor.call('giveMeReceivePaymentReport', this.receivePaymentsData, (err, workbookBuffer) => {
             if (!err) {
             //call mixin saveAs from '/imports/api/mixins/file-saver-fn.js'
             this.saveAs(workbookBuffer, 'ReceivePaymentReport');
             }
             })
             },*/
            PrintReport() {
                window.print();
            }
        },
        watch: {


            "receivePaymentReport.roleBranchOptionsModel"(val) {
                this.fetchAreaOption(val);
            }
            ,
            "receivePaymentReport.roleAreaOptionsModel"(val) {
                this.fetchPatientOption(val);
            }

        },
        created() {
            this.fetchBranchOption();
//            this.fetchPatientOption([]);
            this.fetchTypeOption([]);
            this.getCompany();
            this.receivePaymentReport.dateRange = [moment().startOf("months").toDate(), moment().endOf("months").toDate()];


        },
        computed: {
            dataExist() {
                return this.receivePaymentsData && this.receivePaymentsData.data && this.receivePaymentsData.data.length > 0;
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

    /*.receivePaymentDateRange .el-date-editor--daterange.el-input {
        width: 280px;
    }*/

    /*.receivePaymentExchange .el-select {
        width: 280px;
    }*/

    .el-table .cell {
        padding-left: 3px;
        padding-right: 3px;
    }


</style>