<template>
  <div class="co_patientCode">
    <br><br>
    <div class="ui container">
      <div class="card card-stats">
        <div class="card-header card-header-icon" data-background-color="purple">
          <i class="material-icons"><i class="material-icons">streetview</i></i>
        </div>
        <el-row type="flex" justify="right">
          <el-col :span="8">
            <h4>
              <a class="cursor-pointer">
                <i class="fa fa-plus"></i> Patient Code
              </a>
            </h4>
          </el-col>
          <el-col :span="16" style="text-align: right; margin-right: 10px">
            <br>
            <el-row type="flex" justify="center">
              <el-col :span="8"></el-col>
              <el-col :span="8"></el-col>
              <el-col :span="8">
                <el-input
                    placeholder="Search Here"
                    suffix-icon="el-icon-search"
                    v-model="searchData"
                >
                </el-input>
              </el-col>
            </el-row>
          </el-col>
        </el-row>
        <hr>
        <br>
        <slot v-if="loading">
          <div class="row">
            <div class="col-md-12" style="padding: 30px; margin-top: 70px">
              <!--<loader></loader>-->
            </div>
          </div>
        </slot>
        <slot v-else>
          <el-table
              v-loading="newLoading"
              :data="patientCodeData"
              stripe
              border
              style="width: 100%;font-size: 16px !important;">

            <el-table-column
                prop="code"
                label="Code"
                sortable>
            </el-table-column>
            <el-table-column
                prop="patientDoc.enName"
                label="English Name"
                sortable>
            </el-table-column>
            <el-table-column
                prop="patientDoc.khName"
                label="Khmer Name"
                sortable>
            </el-table-column>
            <el-table-column
                prop="patientDoc.order"
                label="Order"
                sortable>
            </el-table-column>
            <el-table-column
                prop="patientDoc.dobString"
                label="DOB"
                sortable>
            </el-table-column>
            <el-table-column
                prop="patientDoc.age"
                label="Age"
                sortable>
            </el-table-column>
            <el-table-column
                prop="patientDoc.month"
                label="Month"
                sortable>
            </el-table-column>
            <el-table-column
                prop="patientDoc.occupation"
                label="Occupation"
                sortable>
            </el-table-column>
            <el-table-column
                prop="patientDoc.phoneNumber"
                label="Phone Number"
                sortable>
            </el-table-column>
            <el-table-column
                prop="patientDoc.address"
                label="Address"
                sortable>
            </el-table-column>
            <el-table-column
                prop="lastDate"
                label="Last Date"
                sortable>
            </el-table-column>

            <el-table-column
                label="Action"
                width="80"
            >
              <template slot-scope="scope">
                <el-button-group>

                  <el-button type="primary" icon="el-icon-view" size="small" class="cursor-pointer"
                             @click="goToDetail(scope.row)"
                  ></el-button>
                </el-button-group>

              </template>
            </el-table-column>

          </el-table>
          <!--Pagination-->
          <br>
          <el-row type="flex" class="row-bg" justify="center">
            <el-col :span="24" style="text-align: center;">
              <div class="block">
                <el-pagination @size-change="handleSizeChange" background
                               @current-change="handleCurrentChange"
                               :current-page.sync="currentPage" :page-sizes="[10,20, 50, 100,200]"
                               :page-size="currentSize"
                               layout="total, sizes, prev, pager, next, jumper" :total="count">
                </el-pagination>
              </div>
            </el-col>
          </el-row>
          <br>
        </slot>
        <!--End Pagination-->
      </div>
    </div>
  </div>
</template>
<script>
import {Co_PatientCodeReact} from "../../collection/patientCode";

export default {
  meteor: {

    newRe() {
      let vm = this;
      Co_PatientCodeReact.find({}).fetch();
      vm.queryData(vm.searchData, vm.skip, vm.currentSize + vm.skip);
    }
  },
  mounted() {
    // this.$jQuery('body').off();
  },
  data() {
    return {
      newLoading: true,
      patientCodeData: [],
      loading: false,
      searchData: '',
      isSearching: false,
      currentPage: 1,
      currentSize: 10,
      count: 0,
      dialogAddPatientCode: false,
      dialogUpdatePatientCode: false,
      skip: 0
    }
  },
  watch: {
    currentSize(val) {
      this.isSearching = true;
      this.skip = (this.currentPage - 1) * val;
      this.queryData(this.searchData, this.skip, val + this.skip);
    },
    currentPage(val) {
      this.isSearching = true;
      this.skip = (val - 1) * this.currentSize;
      this.queryData(this.searchData, this.skip, this.currentSize + this.skip);
    },
    searchData(val) {
      this.isSearching = true;
      this.skip = (this.currentPage - 1) * this.currentSize;
      this.queryData(val, this.skip, this.currentSize + this.skip);
    }
  },
  methods: {
    handleSizeChange(val) {
      this.currentSize = val;
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    queryData: _.debounce(function (val, skip, limit) {
      this.newLoading = true;
      Meteor.call('queryPatientCode', {
        q: val,
        filter: this.filter,
        options: {skip: skip || 0, limit: limit || 10}
      }, (err, result) => {
        if (!err) {
          this.patientCodeData = result.content;
          this.count = result.countPatientCode;
        }
        this.isSearching = false;
        this.newLoading = false;
      });
    }, 300),
    goToDetail(doc) {
      patientDoc.set("patient", {});
      registerDoc.set([]);
      Meteor.call("co_getPatientAndRegisterByPatientId", doc.patientDoc._id, Meteor.userId(), (err, result) => {
        if (result) {
          patientDoc.set("patient", result.patientDoc);
          registerDoc.set(result.registerList);
          FlowRouter.go(`/co-data/patient/${doc.patientDoc._id}/showDetail`);
        }
      });
    },
    cancel() {
      this.$message({
        type: 'info',
        message: 'Canceled'
      });
    },
    resetForm() {
    }
  },
  created() {
    this.isSearching = true;
    this.queryData();
    Meteor.subscribe('Co_PatientCodeReact');

  },
  computed: {}
}
</script>