import { LightningElement } from 'lwc';

export default class CsvImporter extends LightningElement {
    get acceptedFormats() {
        return ['.csv'];
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        console.log(JSON.stringify(uploadedFiles, null, 4));
    }
}