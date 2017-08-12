import FileSaver from 'file-saver';

export const GenerateFile = {
    methods: {
        saveAs(buffer, filename) {
            FileSaver.saveAs(new Blob([buffer], {type: "application/octet-stream"}), `${filename}.xlsx`);

        }
    }
}