import { LightningElement } from 'lwc';
import getCSV from '@salesforce/apex/CSVImporterController.getCSV';
import getListAPINameForObject from '@salesforce/apex/CSVImporterController.getListAPINameForObject';

export default class CsvImporter extends LightningElement {
    contentVersionId;
    csvHeaderOptions;
    fieldAPINameHeaderOptions;
    chosenCSVHeaderOption;
    chosenFieldAPINameHeaderOption;

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
            this.generateSObjectOptions();
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

    generateSObjectOptions(){
        this.fieldAPINameHeaderOptions = [];

        getListAPINameForObject({ objectAPIName: 'Lead' })
        .then(result => {
            console.log(result);
            result.forEach(fieldAPIName => {
                this.fieldAPINameHeaderOptions.push({
                    label: fieldAPIName,
                    value: fieldAPIName
                });
            })
        })
        .catch(error => {
            console.log(error);
        });

        console.log(this.fieldAPINameHeaderOptions);
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