<template>
  <div class="uploadPatientImage">

    <div class="ui container animated fadeIn">
      <div class="ui grid">
        <div class="four wide column">
          <!-- Profile Image -->
          <div class="box box-primary">
            <div class="box-body box-profile">
              <img class="ui profile-user-img img-responsive img-circle" src="/no-user-image.png"
                   alt="User profile picture">

              <h3 class="profile-username text-center">{{ patientDoc.khName }}</h3>

              <ul class="list-group list-group-unbordered">
                <li class="list-group-item">
                  <b>Gender</b> <a class="pull-right" style="float: right">{{ patientDoc.gender }}</a>
                </li>
                <li class="list-group-item">
                  <b>Phone Number</b> <a class="pull-right" style="float: right">{{ patientDoc.phoneNumber }}</a>
                </li>
                <li class="list-group-item">
                  <b>DOB</b> <a class="pull-right" style="float: right">{{ patientDoc.dobString }}</a>
                </li>
                <li class="list-group-item">
                  <b>Age</b> <a class="pull-right" style="float: right">{{ patientDoc.age }} ឆ្នាំ {{
                    patientDoc.month
                  }} ខែ</a>
                </li>
                <li class="list-group-item">
                  <b>Address</b> <a class="pull-right" style="float: right">{{ patientDoc.address }}</a>
                </li>
                <li class="list-group-item">
                  <b>Code</b> <a class="pull-right" style="float: right">{{ patientDoc.code }}</a>
                </li>
                <li class="list-group-item">
                  <b>Information</b> <a class="pull-right" style="float: right">{{ patientDoc.info }}</a>
                </li>
              </ul>
              <a class="ui positive button"
                 style="width: 100%"><b>Back</b></a>
            </div>
            <!-- /.box-body -->
          </div>
        </div>
        <!-- /.col -->
        <div class="twelve wide column" style="text-align: center">

          <img :src="imgUrl || '/images/clicktoupload.jpg'" style="height: 200px; width: 300px;"
               class="mb-4 mt-2"
               alt="logo" @click="$refs.fileInput.click()"/>
          <input style="display: none !important;" type="file" @change="onFileSelected" multiple
                 ref="fileInput"></input>
          <br>
          <br>
          <el-row>
            <el-col :span="8" class="block" v-for="d in urlList" :key="d">
              <button style="display: block" class="ui pink button" @click="removeFile(patientId,d)">Remove</button>
              <el-image
                  style="width: 300px; height: 300px"
                  :src=" d"
                  :preview-src-list="urlList">

              </el-image>
            </el-col>
          </el-row>
        </div>
        <!-- /.col -->
      </div>

    </div>
  </div>
</template>
<script>
import firebase from 'firebase/app';

const Compress = require('compress.js')
export default {
  meteor: {},
  mounted() {

  },
  data() {
    return {
      uploadValue: 0,
      selectedFile: '',
      imgUrl: "",
      patientId: "",
      patientDoc: {},
      urlList: [],
      fullscreenLoading: false
    }
  },
  watch: {},
  methods: {
    onFileSelected(e) {
      let vm = this;
      vm.openFullScreen2();
      //this.imgUrl = window.URL.createObjectURL(e.target.files[0]);
      /* Meteor.setTimeout(function () {
         vm.onUpload();
       }, 500);*/
      let tmpFile = [...e.target.files];
      const compress = new Compress();
      compress.compress(tmpFile, {
        size: 4, // the max size in MB, defaults to 2MB
        quality: 0.6, // the quality of the image, max is 1,
        maxWidth: 1920, // the max width of the output image, defaults to 1920px
        maxHeight: 1920, // the max height of the output image, defaults to 1920px
        resize: true // defaults to true, set false if you do not want to resize the image width and height
      }).then((data) => {
        data.forEach((obj) => {
          let img1 = obj;
          let base64str = img1.data;
          let imgExt = img1.ext;
          vm.savePatientImage(Compress.convertBase64ToFile(base64str, imgExt), obj.alt.split(".")[0]);
        })
      })
    },
    savePatientImage(fileDoc, fileName) {
      let vm = this;
      if (!!fileDoc) {
        //const storageRef = firebase.storage().ref(`${this.imageData.name}`).put(vm.imgUrl);
        const storageRef = firebase.storage().ref("patient/" + moment().format("YYYYMMDDmmss") + fileName).put(fileDoc);
        storageRef.on(`state_changed`, snapshot => {
              this.uploadValue = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            }, error => {
              console.log(error.message)
            },
            () => {
              this.uploadValue = 100;
              storageRef.snapshot.ref.getDownloadURL().then((url) => {
                vm.urlList.unshift(url);
                vm.fullscreenLoadin = false;
                Meteor.call("updatePatientUrl", vm.patientId, url, (err, result) => {
                  if (err) {
                    console.log(err.message);
                  }
                  vm.selectedFile = "";
                })
              });
            }
        );
      }

    },
    openFullScreen2() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      });
      setTimeout(() => {
        loading.close();
      }, 2000);
    },
    removeFile(patientId, url) {
      let vm = this;
      vm.$confirm('This will permanently delete the Item. Continue?', 'Warning', {
        confirmButtonText: 'OK',
        cancelButtonText: 'Cancel',
        type: 'warning'
      }).then(() => {
        Meteor.call("removePatientImage", patientId, url, (err, result) => {
          if (!err) {
            vm.urlList = vm.urlList.filter((e) => e !== url);
            vm.$message({
              showClose: true,
              message: `លុប បានជោគជ័យ`,
              type: 'success'
            });

          } else {
            vm.$message({
              showClose: true,
              type: 'error',
              message: 'Delete Failed'
            });
          }

        })
      })
    }

  },
  created() {
    let vm = this;
    vm.patientDoc = {};
    vm.patientId = FlowRouter.getParam('patientId');
    Meteor.call("co_patientById", this.patientId, (err, re) => {
      if (re) {
        vm.patientDoc = re;
        vm.urlList = re.urlList || [];
      }
    })


  },
  computed: {}
}
</script>