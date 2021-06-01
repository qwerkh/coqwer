<template>
  <div class="co-medicineBarcode-report">
    <div slot="header">
      <el-collapse v-model="activeName" class="no-print" accordion>
        <el-collapse-item name="1">
                <span slot="title">

                            Register Report
                        </span>

          <el-form :inline="inl" label-position="top" :model="medicineBarcodeReport" :rules="rules"
                   ref="medicineBarcodeReport">
            <el-row type="flex" class="row-bg" justify="left" style="width: 100%">
              <el-col :span="18">
                <el-form-item label="Branch :">
                  <el-select width="100%" filterable
                             v-model="medicineBarcodeReport.roleBranchOptionsModel"
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
                             v-model="medicineBarcodeReport.roleAreaOptionsModel"
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
                <el-form-item label-width="60px" label="Medicine Type  :" prop="medicineTypeModel">
                  <el-select width="100%" filterable
                             v-model="medicineBarcodeReport.medicineTypeModel"
                             placeholder="Select">
                    <el-option
                        v-for="item in medicineTypeOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>
                <el-form-item label-width="60px" label="Medicine  :">
                  <el-select width="100%" filterable clearable
                             v-model="medicineBarcodeReport.medicineModel"
                             placeholder="All">
                    <el-option
                        v-for="item in medicineOption"
                        :key="item.value"
                        :label="item.label"
                        :value="item.value">
                    </el-option>
                  </el-select>
                </el-form-item>


              </el-col>
              <el-col :span="3">
                <el-button :loading="loading" @click="handleRunRandomReport()"
                           type="success"
                           style="float: right;width: 130px;">
                  <i class="el-icon-caret-right"></i>
                  Run Random
                </el-button>
              </el-col>
              <el-col :span="3">
                <el-button :loading="loading" @click="handleRunReport('dynamicValidateForm')"
                           type="primary"
                           style="float: right;width: 130px;">
                  <i class="el-icon-caret-right"></i>
                  Run Barcode
                </el-button>
              </el-col>
            </el-row>
          </el-form>
        </el-collapse-item>
      </el-collapse>
    </div>
    <span slot="content" v-if="!isRandom">
            <div v-for="d in medicineBarcodesData">
                <div v-if="isChooseMedicine">
                    {{ d.name }}
                    <br><br>
                    <el-row type="flex" v-for="b in 16"
                            style="margin-left: -7px !important;margin-bottom: 2px !important;">
                        <el-col :span="5">
                        <barcode :doc="d"></barcode>
                        </el-col>
                        <el-col :span="5">
                        <barcode :doc="d"></barcode>
                        </el-col>

                        <el-col :span="5">
                        <barcode :doc="d"></barcode>
                        </el-col>
                        <el-col :span="5">
                        <barcode :doc="d"></barcode>
                        </el-col>
                        <el-col :span="5">
                        <barcode :doc="d"></barcode>
                        </el-col>

                    </el-row>

                </div>
                <div v-else>
                    <el-row type="flex">
                    <el-col :span="3">{{ d.name }}</el-col>
                    <el-col :span="7" v-for="a in 3">
                        <barcode :doc="d"></barcode>
                    </el-col>

                </el-row>
                </div>

            </div>
        </span>
    <span slot="content" v-if="isRandom">
            <div v-for="d in randomBarcodesData">
                <div>
                    a, b ,c ,d ,e
                    <br><br>
                    <el-row type="flex" v-for="b in 16"
                            style="margin-left: -7px !important;margin-bottom: 2px !important;">
                        <el-col :span="5">
                        <barcode :doc="d.doc1"></barcode>
                        </el-col>
                        <el-col :span="5">
                        <barcode :doc="d.doc2"></barcode>
                        </el-col>

                        <el-col :span="5">
                        <barcode :doc="d.doc3"></barcode>
                        </el-col>
                        <el-col :span="5">
                        <barcode :doc="d.doc4"></barcode>
                        </el-col>
                        <el-col :span="5">
                        <barcode :doc="d.doc5"></barcode>
                        </el-col>

                    </el-row>

                </div>
            </div>
        </span>
  </div>
</template>
<script>
import MedicineBarcode from "../component/barcode"
import "./ImportFile"
import ImportFile from "./ImportFile";

export default {
  components: {
    ImportFile,
    "barcode": MedicineBarcode,
  },
  data() {
    return {
      medicineBarcodeReport: {
        roleBranchOptionsModel: [],
        roleAreaOptionsModel: [],
        medicineBarcodeReport: "",
        medicineTypeModel: ""
      },
      inl: true,
      roleBranchOptions: [],
      roleAreaOptions: [],
      medicineOption: [],
      medicineTypeOption: [],
      activeName: "1",
      medicineBarcodesData: [],
      randomBarcodesData: [],
      loading: false,
      isRandom: false,
      branchHeader: "All",
      printLoading: false,
      isChooseMedicine: false,
      rules: {
        medicineTypeModel: [{required: true, message: 'Please input Medicine Type', trigger: 'change'}],
      },
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
    fetchMedicineOption(typeId) {
      let vm = this;
      Meteor.call('co_medicineOptionForReportByType', typeId, function (err, result) {
        if (result) {
          vm.medicineOption = result;
        }

      })
    },
    fetchMedicineTypeOption() {
      let vm = this;
      Meteor.call('co_medicineTypeOption', function (err, result) {
        if (result) {
          vm.medicineTypeOption = result;
        }

      })
    },
    handleRunReport(formName) {
      this.isRandom = false;

      this.$refs["medicineBarcodeReport"].validate((valid) => {
        if (valid) {
          let params = {};
          let userId = Meteor.userId();
          this.isChooseMedicine = true;

          this.loading = true;
          if (this.medicineBarcodeReport.roleAreaOptionsModel != "") {
            params.rolesArea = {$in: this.medicineBarcodeReport.roleAreaOptionsModel};

          }
          if (this.medicineBarcodeReport.medicineModel != "") {
            params._id = this.medicineBarcodeReport.medicineModel;
            this.isChooseMedicine = true;
          } else {
            this.isChooseMedicine = false;

          }

          params.medicineTypeId = this.medicineBarcodeReport.medicineTypeModel;

          Meteor.call('giveMeMedicineBarcodeReport', params, userId, (err, result) => {
            if (!err) {
              this.medicineBarcodesData = result;
            }
            this.loading = false;
          });
        }
      });


    },

    handleRunRandomReport() {

      this.isRandom = true;
      this.loading = true;
      let list = [];
      let doc1 = {};
      let doc2 = {};
      let doc3 = {};
      let doc4 = {};
      let doc5 = {};
      doc1._id = "a" + moment().format("YYMMDDhhss");
      doc2._id = "b" + moment().format("YYMMDDhhss");
      doc3._id = "c" + moment().format("YYMMDDhhss");
      doc4._id = "d" + moment().format("YYMMDDhhss");
      doc5._id = "e" + moment().format("YYMMDDhhss");
      list.push({doc1, doc2, doc3, doc4, doc5});
      this.randomBarcodesData = list;
      this.loading = false;
    },
    PrintReport() {
      window.print();
    },
  },
  watch: {


    "medicineBarcodeReport.roleBranchOptionsModel"(val) {
      this.fetchAreaOption(val);
    }
    , "medicineBarcodeReport.medicineTypeModel"(val) {
      this.fetchMedicineOption(val);
    }

  },
  created() {
    this.fetchBranchOption();
    this.fetchMedicineOption();
    this.fetchMedicineTypeOption();


  },
  computed: {
    dataExist() {
      return this.medicineBarcodesData && this.medicineBarcodesData.data && this.medicineBarcodesData.data.length > 0;
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