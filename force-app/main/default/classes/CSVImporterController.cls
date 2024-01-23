public with sharing class CSVImporterController {
    @AuraEnabled(cacheable=true)
    public static String getCSV(String contentVersionId){
        return [SELECT VersionData FROM ContentVersion WHERE Id = :contentVersionId].VersionData.toString();
    }
}