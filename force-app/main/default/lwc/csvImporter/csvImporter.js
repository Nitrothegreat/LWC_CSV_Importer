import { LightningElement } from 'lwc';
import getCSV from '@salesforce/apex/CSVImporterController.getCSV';

export default class CsvImporter extends LightningElement {
    contentVersionId;

    get acceptedFormats() {
        return ['.csv'];
    }

    get disableMapFieldsButton(){
        return this.contentVersionId === undefined;
    }

    handleMapButtonClick(event){
        getCSV({ contentVersionId: this.contentVersionId})
        .then(result =>{
            let rowArr = result.split('\r\n');
        })
        .catch(error => {
            console.log(error);
        });
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