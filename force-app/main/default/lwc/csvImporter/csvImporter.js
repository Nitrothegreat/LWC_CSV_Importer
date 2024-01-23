import { LightningElement } from 'lwc';

export default class CsvImporter extends LightningElement {
    contentVersionId;

    get acceptedFormats() {
        return ['.csv'];
    }

    get disableMapFieldsButton(){
        return this.contentVersionId === undefined;
    }

    handleUploadFinished(event) {
        const uploadedFiles = event.detail.files;
        
        if(uploadedFiles && uploadedFiles[0].contentVersionId != null){
            this.contentVersionId = uploadedFiles[0].contentVersionId;
        }
    }
}

// [
//     {
//         "name": "Test.csv",
//         "documentId": "[REDACTED]",
//         "contentVersionId": "[REDACTED]",
//         "contentBodyId": "[REDACTED]",
//         "mimeType": "text/csv"
//     }
// ]