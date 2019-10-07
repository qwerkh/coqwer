<template>
    <div class="dashboard">
        <div class="card card-stats">
            <div class="card-header card-header-icon" data-background-color="purple">
                <i class="material-icons"><i class="material-icons">streetview</i></i>
            </div>
            <el-row type="flex" justify="right">
                <el-col :span="24">
                    <h4>
                        <a class="cursor-pointer">
                            <i class="fa fa-plus"></i> Dashboard {{dashboardData.todayAndTime}}
                        </a>
                    </h4>
                </el-col>
            </el-row>
            <hr>
            <el-row type="flex" justify="right">
                <el-col :span="24" style="text-align: center !important;">

                    <el-select filterable v-model="params.dateChoose" clearable
                               :placeholder="All" style="width: 50% !important;"
                    >
                        <el-option
                                v-for="item in chooseDateList"
                                :label="item.label"
                                :value="item.value" :key="item._id">
                        </el-option>
                    </el-select>
                </el-col>
            </el-row>
            <br>

            <slot v-if="loading">
                <div class="row-new">
                    <div class="col-md-12" style="padding: 30px; margin-top: 70px">
                        <!--<loader></loader>-->
                    </div>
                </div>
            </slot>
            <slot v-else>
                <section class="content-new">
                    <!-- Small boxes (Stat box) -->

                    <div class="row-new">
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-aqua">
                                <div class="inner">
                                    <h2>{{dashboardData.totalNumberInvoice}}</h2>

                                    <p style="font-family: 'Khmer OS Battambang';font-size: 17px !important;">
                                        ចំនួនវិក័យបត្រ</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-bag"></i>
                                </div>
                                <a style="font-family: 'Khmer OS Battambang'" href="#" class="small-box-footer">ថ្ងៃ
                                    ({{dashboardData.today}}) <i
                                            class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-green">
                                <div class="inner">
                                    <h2>{{dashboardData.total}} <sup
                                            style="font-size: 20px">{{dashboardData.currency}}</sup>
                                    </h2>

                                    <p style="font-family: 'Khmer OS Battambang';font-size: 17px !important;">សរុប</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-stats-bars"></i>
                                </div>
                                <a href="#" class="small-box-footer" style="font-family: 'Khmer OS Battambang'">ថ្ងៃ
                                    ({{dashboardData.today}}) <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-fuchsia-active">
                                <div class="inner">
                                    <h2>{{dashboardData.totalService}} <sup
                                            style="font-size: 20px">{{dashboardData.currency}}</sup>
                                    </h2>

                                    <p style="font-family: 'Khmer OS Battambang';font-size: 17px !important;">
                                        សរុបការផ្តល់សេវាកម្ម</p>
                                </div>
                                <div class="icon">
                                    <i class="ion ion-stats-bars"></i>
                                </div>
                                <a href="#" class="small-box-footer" style="font-family: 'Khmer OS Battambang'">ថ្ងៃ
                                    ({{dashboardData.today}}) <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>
                        <!-- ./col -->
                        <div class="col-lg-3 col-xs-6">
                            <!-- small box -->
                            <div class="small-box bg-yellow">
                                <div class="inner">
                                    <h2>{{dashboardData.totalMedicine}}<sup
                                            style="font-size: 20px">{{dashboardData.currency}}</sup></h2>

                                    <p style="font-family: 'Khmer OS Battambang';font-size: 17px !important;">
                                        សរុបការលក់ថ្នាំ</p>

                                </div>
                                <div class="icon">
                                    <i class="ion ion-person-add"></i>
                                </div>
                                <a href="#" class="small-box-footer" style="font-family: 'Khmer OS Battambang'">ថ្ងៃ
                                    ({{dashboardData.today}}) <i class="fa fa-arrow-circle-right"></i></a>
                            </div>
                        </div>

                    </div>
                    <br>
                    <br>
                    <br>
                    <h1>សេវាកម្ម</h1>

                    <div class="row">
                        <table class="ui celled striped table">
                            <thead style="margin-top: 5px">
                            <tr>
                                <th>ល.រ</th>
                                <th>ឈ្មោះផលិតផល</th>
                                <th>ចំនួន</th>
                            </tr>
                            </thead>
                            <tbody style="margin-bottom: 5px;" v-html="dashboardData.htmlInvoiceService">

                            </tbody>


                        </table>
                    </div>
                    <br>
                    <br>
                    <h1>លក់ថ្នាំ</h1>

                    <div class="row">
                        <table class="ui celled striped table">
                            <thead style="margin-top: 5px">
                            <tr>
                                <th>ល.រ</th>
                                <th>ឈ្មោះផលិតផល</th>
                                <th>ចំនួន</th>
                            </tr>
                            </thead>
                            <tbody style="margin-bottom: 5px;" v-html="dashboardData.htmlInvoiceMedicine">

                            </tbody>


                        </table>
                    </div>


                </section>
                <br>
            </slot>
            <!--End Pagination-->
        </div>
    </div>
</template>
<script>

    export default {
        meteor: {
            newRe() {
                let vm = this;
                vm.queryData();
            },


        },
        mounted() {
            //this.$jQuery('body').off();

        },
        data() {
            return {
                dialogVisible: false,
                dashboardData: {},
                loading: false,
                searchData: '',
                isSearching: false,
                params: {
                    dateChoose: 0,
                    date: ""
                },
                currentPage: 1,
                currentSize: 10,
                count: 0,
                chooseDateList: [
                    {label: "Today", value: 0},
                    {label: "Last 1 Days", value: 1},
                    {label: "Last 2 Days", value: 2},
                    {label: "Last 3 Days", value: 3},
                    {label: "Last 4 Days", value: 4},
                    {label: "Last 5 Days", value: 5},
                    {label: "Last 6 Days", value: 6},
                    {label: "This Week", value: 7},
                    {label: "Last Week", value: 14},
                    {label: "This Month", value: 30},
                    {label: "Last Month", value: 60},
                    {label: "This Year", value: 365},
                    {label: "Last Year", value: 730},
                ],
            }
        },
        watch: {
            "params.dateChoose"(val) {
                this.params.dateChoose = val;
                this.queryData();
            }
        },
        methods: {
            queryData: _.debounce(function () {
                let param = {};
                param.area = Session.get('area');
                param.today = moment().toDate();
                param.minusDay = this.params.dateChoose || 0;
                param.userId = Meteor.userId();
                Meteor.call('dashboardReport', param, (err, result) => {
                    if (!err) {
                        this.dashboardData = result;
                    }
                });
            }, 300),
        },
        created() {
            this.queryData();
            //Meteor.subscribe('Pos_DashboardReact');

        }
    }
</script>
