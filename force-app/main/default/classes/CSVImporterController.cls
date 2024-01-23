public with sharing class CSVImporterController {
    @AuraEnabled(cacheable=true)
    public static String getCSV(String contentVersionId){
        return [SELECT VersionData FROM ContentVersion WHERE Id = :contentVersionId].VersionData.toString();
    }

    @AuraEnabled(cacheable=true)
    public static List<String> getListAPINameForObject(String objectAPIName){
        List<String> lAPINameForSObject = new List<String>();
        Map<String, Schema.SObjectType> schemaMap = Schema.getGlobalDescribe();
        Map<String, Schema.SObjectField> fieldMap = schemaMap.get(objectAPIName).getDescribe().fields.getMap();

        for(Schema.SObjectField fieldAPIName : fieldMap.values()){	
            lAPINameForSObject.add((String.valueOf(fieldAPIName)));
        }

        return lAPINameForSObject;
    }
}