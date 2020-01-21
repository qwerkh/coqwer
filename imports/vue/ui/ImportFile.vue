<template>
    <!--<v-container grid-list-md>
        <v-layout row wrap justify-center align-center>
            <v-flex xs12 sm6 md4 lg4>
                <v-card class="pa-4" outlined>
                    <v-text-field
                            @click='pickTestFile'
                            v-model="testImport.fileName"
                            append-icon="attach_file"
                            @click:clear="testImport.fileName=''"
                            clearable
                            readonly
                            label="Import data"
                            outlined
                            :rules="rules.testImportFileName"
                            required
                    >
                    </v-text-field>
                    <input
                            type="file"
                            style="display: none"
                            ref="testImportFile"
                            @change="onTestFilePicked">
                    <v-btn @click="submitTestImport"
                           color="primary"
                           :disabled="!testImport.fileName"
                           text
                           :loading="testImportLoading">
                        <v-icon left>send</v-icon>
                        <span class="font-weight-bold">Submit</span>
                    </v-btn>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>-->
    <div class="weightTest">
        <el-upload
                class="upload-demo"
                drag
                v-model="testImport.fileName"
                action="https://jsonplaceholder.typicode.com/posts/"
                :on-preview="handlePreview"
                :on-success="handleSuccess"
                :before-upload="handleBeforeUpload"
        >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
            <div class="el-upload__tip" slot="tip">files with a size less than 500kb</div>
        </el-upload>

        <br><br>
        <div class="card card-stats">
            <div class="card-header card-header-icon" data-background-color="purple">
                <i class="material-icons"><i class="material-icons">streetview</i></i>
            </div>
            <el-row type="flex" justify="right">
                <el-col :span="8">
                    <h4>
                        <a class="cursor-pointer">
                            Weight Test
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
            <br>
            <el-table
                    v-loading="newLoading"
                    :data="weightTestData"
                    stripe
                    border
                    style="width: 100%;font-size: 15px !important;">
                <el-table-column
                        prop="id"
                        label="Id"
                >
                </el-table-column>
                <el-table-column
                        prop="fileName"
                        label="File Name"
                >
                </el-table-column>
                <el-table-column
                        prop="testNo"
                        label="Test No">
                </el-table-column>
                <el-table-column
                        prop="date"
                        label="Date">
                </el-table-column>
                <el-table-column
                        prop="age"
                        width="60"
                        label="Age">
                </el-table-column>
                <el-table-column
                        prop="sex"
                        width="100"
                        label="Gender">
                </el-table-column>
                <el-table-column
                        prop="height"
                        width="100"

                        label="Height">
                </el-table-column>
                <el-table-column
                        prop="health"
                        width="100"

                        label="Health">
                </el-table-column>
                <el-table-column
                        label="Action"
                        width="140"
                >
                    <template slot-scope="scope">
                        <el-button-group>
                            <el-button type="danger" class="cursor-pointer" icon="el-icon-delete" size="medium"
                                       @click="removeWeightTest(scope.$index,scope.row,weightTestData)"
                                       :disabled="disabledRemove"></el-button>
                            <el-button type="success" size="medium" class="cursor-pointer"
                                       @click="printWeightTest(scope)"
                            >Print
                            </el-button>
                        </el-button-group>

                    </template>
                </el-table-column>

            </el-table>
            <br>
            <el-row type="flex" class="row-bg" justify="center">
                <el-col :span="24" style="text-align: center;">
                    <div class="block">
                        <el-pagination @size-change="handleSizeChange" background @current-change="handleCurrentChange"
                                       :current-page.sync="currentPage" :page-sizes="[10,20, 50, 100,200]"
                                       :page-size="currentSize"
                                       layout="total, sizes, prev, pager, next, jumper" :total="count">
                        </el-pagination>
                    </div>
                </el-col>
            </el-row>
            <br>
        </div>
    </div>

</template>
<!--:on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"-->
<script>
    import XLSX from 'xlsx';
    // import "element-ui";

    export default {
        name: "ImportFile",
        data() {
            return {
                rawData: [],
                loading: false,
                searchData: '',
                isSearching: false,
                currentPage: 1,
                currentSize: 10,
                count: 0,
                skip: 0,
                newLoading: true,
                /*currentUser: this.$store.state.currentUser,
                currentModule: this.$store.state.currentModule,
                *///test
                testImportLoading: false,
                testImport: {
                    fileName: '',
                    file: ''
                },
                weightTestData: [],
                patientId: "",
                disabledRemove: false,
                //rules
                /*rules: {
                    testImportFileName: [v => !!v || this.$t('fileIsRequired')],
                },*/
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
                Meteor.call('queryWeightTest', {
                    q: val,
                    filter: this.filter,
                    rolesArea: Session.get('area'),
                    patientId: this.patientId,
                    options: {skip: skip || 0, limit: limit || 10}
                }, (err, result) => {
                    if (!err) {
                        this.weightTestData = result.content;
                        this.count = result.countWeightTest;
                    }
                    this.isSearching = false;
                    this.newLoading = false;
                });
            }, 300),
            handlePreview(file) {

            },
            handleSuccess(respond, file, fileList) {
                this.submitTestImport(file.raw);
            },
            handleBeforeUpload(file) {

            },

            pickTestFile() {
                this.$refs.testImportFile.click();
            },
            onTestFilePicked(e) {
                const files = e.target.files;
                if (files[0] !== undefined) {
                    const matchExtension = files[0].name.match(/xlsx/g);
                    if (!matchExtension) {
                        // this.$toaster.error(this.$t('fileTypeMustBeXlsx'));
                        this.testImport.file = [];
                        this.testImport.fileName = '';
                    } else {
                        this.testImport.fileName = files[0].name;
                        this.testImport.file = files[0];
                    }
                } else {
                    this.testImport.fileName = '';
                    this.testImport.file = null;
                }
            },
            submitTestImport(file) {
                // this.testImportLoading = true;
                //const {file} = this.testImport;
                this.testImport.fileName = file.name;
                setTimeout(() => {
                    this.readDataFromFile({
                        file,
                        onFileRead: (docs) => this.insertData({
                            docs,
                            error: () => {
                                alertify.error("Failed to upload file!!");
                            },
                            success: () => {
                                this.queryData();
                                alertify.success("Upload success!!");


                            }
                        })
                    })

                    /*this.readDataFromFile({
                        file,
                        onFileRead: (docs) => this.uploadData({
                            methodName: 'sam_importTest', docs,
                            error: () => {
                                this.testImportLoading = false;
                                this.testImport.fileName = '';
                                this.testImport.file = null;
                            },
                            success: () => {
                                this.testImportLoading = false;
                                this.testImport.fileName = '';
                                this.testImport.file = null;
                            }
                        })
                    })*/
                }, 500);
            },
            /*binaryDecode(data) {
                let ret = '';
                if (data) {
                    let byteArray = new Uint8Array(data);
                    for (let i = 0; i < data.byteLength; i++) {
                        ret = ret + String.fromCharCode(byteArray[i]);
                    }
                }
                return ret;
            },*/
            //
            /*uploadData({methodName, docs, error, success}) {
                this.rawData = docs;
                /!*Meteor.call(methodName, {userId: this.currentUser._id, docs: docs, module: this.currentModule}, (err, res) => {
                  if (!err) {
                    this.$toaster.success('បញ្ជូនរួចរាល់');
                    success();
                  } else {
                    this.$toaster.error(err.message);
                    error();
                  }
                });*!/
            }*/
            insertData({docs, error, success}) {
                Meteor.call("insertWeightTest", docs, Session.get("area"), this.patientId, this.testImport.fileName, (err, result) => {
                    if (!err) {
                        success();
                    } else {
                        error();
                    }
                })
            },
            fixdata(data) {
                let o = "",
                    l = 0,
                    w = 10240;
                for (l; l < data.byteLength / w; ++l)
                    o += String.fromCharCode.apply(
                        null,
                        new Uint8Array(data.slice(l * w, l * w + w))
                    );
                o += String.fromCharCode.apply(null, new Uint8Array(data.slice(l * w)));
                return o;
            },
            removeWeightTest(index, row, rows) {
                let vm = this;
                this.$confirm('This will permanently delete the Item. Continue?', 'Warning', {
                    confirmButtonText: 'OK',
                    cancelButtonText: 'Cancel',
                    type: 'warning'
                }).then(() => {
                    Meteor.call("removeWeightTest", row._id, (err, result) => {
                        if (!err) {
                            rows.splice(index, 1);

                            vm.$message({
                                message: `
                        លុប ${row.id} : ${row.testNo} បានជោគជ័យ`,
                                type: 'success'
                            });


                        } else {
                            vm.$message({
                                type: 'error',
                                message: 'Delete Fialed'
                            });
                        }

                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: 'Delete canceled'
                    });
                });
            },
            readDataFromFile({file, onFileRead}) {
                /*let reader = new FileReader();
                reader.onload = (val) => {
                    let results,
                        data = val.target.result,
                        fixedData = this.fixdata(data),
                        workbook = XLSX.read(btoa(fixedData), {type: "base64"}),
                        firstSheetName = workbook.SheetNames[0],
                        worksheet = workbook.Sheets[firstSheetName];
                    results = XLSX.utils.sheet_to_json(worksheet);
                    onFileRead(results);
                };
                reader.readAsArrayBuffer(file);*/

                let reader = new FileReader();
                reader.onload = (event) => {
                    // NOTE: event.target point to FileReader
                    let contents = event.target.result;
                    let lines = contents.split('\n');
                    //////
                    // document.getElementById('container').innerHTML = contents;
                    onFileRead(lines);
                };

                reader.readAsText(file);
            }
            ,
            get_header_row(sheet) {
                let headers = [], range = XLSX.utils.decode_range(sheet["!ref"]);
                let C, R = range.s.r;
                /* start in the first row */
                for (C = range.s.c; C <= range.e.c; ++C) {
                    /* walk every column in the range */
                    let cell = sheet[XLSX.utils.encode_cell({c: C, r: R})];
                    /* find the cell in the first row */
                    let hdr = "UNKNOWN " + C; // <-- replace with your desired default
                    if (cell && cell.t) hdr = XLSX.utils.format_cell(cell);
                    headers.push(hdr);
                }
                return headers;
            }
            ,
            workbook_to_json(workbook) {
                let result = {};
                workbook.SheetNames.forEach(function (sheetName) {
                    let roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    if (roa.length > 0) {
                        result[sheetName] = roa;
                    }
                });
                return result;
            }
            ,
        },
        watch: {
            'testImport.fileName'(val) {
                if (!val) {
                    this.testImport.file = null;
                }
            },
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
        created() {
            this.patientId = FlowRouter.getParam('patientId');
            this.isSearching = true;
            this.queryData();
        }
    }
</script>

<style scoped>

</style>