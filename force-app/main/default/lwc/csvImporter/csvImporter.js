import { LightningElement } from 'lwc';
import getCSV from '@salesforce/apex/CSVImporterController.getCSV';

export default class CsvImporter extends LightningElement {
    contentVersionId;
    csvHeaderOptions;
    chosenCSVHeaderOption;

    get acceptedFormats() {
        return ['.csv'];
    }

    get disableMapFieldsButton(){
        return this.contentVersionId === undefined;
    }

    handleMapButtonClick(event){
        getCSV({ contentVersionId: this.contentVersionId})
        .then(result =>{
            this.handleGetCSVResult(result);
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

    handleGetCSVResult(result){
        let rowArr = result.split('\r\n');
        let headerRowArr = rowArr[0].split(',');
        this.csvHeaderOptions = [];

        headerRowArr.forEach(col => {
            this.csvHeaderOptions.push({
                label: col,
                value: col
            });
        });
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