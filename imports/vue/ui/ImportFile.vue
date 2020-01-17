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
</template>
<!--:on-preview="handlePreview"
            :on-remove="handleRemove"
            :file-list="fileList"-->
<script>
    import XLSX from 'xlsx';
    import "element-ui";

    export default {
        name: "ImportFile",
        data() {
            return {
                rawData: [],
                /*currentUser: this.$store.state.currentUser,
                currentModule: this.$store.state.currentModule,
                *///test
                testImportLoading: false,
                testImport: {
                    fileName: '',
                    file: ''
                },
                //rules
                rules: {
                    testImportFileName: [v => !!v || this.$t('fileIsRequired')],
                },
            }
        },
        methods: {
            handlePreview(file) {
                console.log(file);
            },
            handleSuccess(respond, file, fileList) {
                console.log(respond);
                console.log(file);
                console.log(fileList);
            },
            handleBeforeUpload(file) {
                console.log(file);
                this.testImport.file = file;
                this.testImport.fileName = file.name;
                this.submitTestImport();
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
            submitTestImport() {
                this.testImportLoading = true;
                const {file} = this.testImport;
                setTimeout(() => {
                    this.readDataFromFile({
                        file,
                        onFileRead: (docs) => console.log(docs)
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
            //
            uploadData({methodName, docs, error, success}) {
                this.rawData = docs;
                /*Meteor.call(methodName, {userId: this.currentUser._id, docs: docs, module: this.currentModule}, (err, res) => {
                  if (!err) {
                    this.$toaster.success('បញ្ជូនរួចរាល់');
                    success();
                  } else {
                    this.$toaster.error(err.message);
                    error();
                  }
                });*/
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
            readDataFromFile({file, onFileRead}) {
                let reader = new FileReader();
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
                reader.readAsArrayBuffer(file);
            },
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
            },
            workbook_to_json(workbook) {
                let result = {};
                workbook.SheetNames.forEach(function (sheetName) {
                    let roa = XLSX.utils.sheet_to_row_object_array(workbook.Sheets[sheetName]);
                    if (roa.length > 0) {
                        result[sheetName] = roa;
                    }
                });
                return result;
            },
        },
        watch: {
            'testImport.fileName'(val) {
                if (!val) {
                    this.testImport.file = null;
                }
            }
        }
    }
</script>

<style scoped>

</style>