
ClinicalImpressions = new Meteor.Collection('clinicalImpressions');

if (Meteor.isClient){
  Meteor.subscribe('clinicalImpressions');
}




// Write your package code here!
ClinicalImpressionSchema = new SimpleSchema({
  "resourceType" : {
    type: String,
    defaultValue: "ClinicalImpression"
    },
  "patient" : {
    type: ReferenceSchema
    },
  "assessor" : {
    type: ReferenceSchema
    },
  "status" : {
    type: String
    },
  "date" : {
    type: Date
    },
  "description" : {
    type: String
    },
  "previous" : {
    type: ReferenceSchema
    },
  "problem" : {
    type: [ ReferenceSchema ]
    },
  "triggerCodableConceptSchema" : {
    type: CodableConceptSchema
    },
  "triggerReference" : {
    type: ReferenceSchema
    },
  "investigations.$.code" : {
    type: CodableConceptSchema
    },
  "investigations.$.item" : {
    type: [ ReferenceSchema ]
    },
  "protocol" : {
    type: String
    },
  "summary" : {
    type: String
    },
  "finding.$.item" : {
    type: CodableConceptSchema
    },
  "finding.$.cause" : {
    type: String
    },
  "resolved" : {
    type: [ CodableConceptSchema ]
    },
  "ruledOut.$.item" : {
    type: CodableConceptSchema
    },
  "ruledOut.$.reason" : {
    type: String
    },
  "prognosis" : {
    type: String
    },
  "plan" : {
    type: [ ReferenceSchema ]
    },
  "action" : {
    type: [ ReferenceSchema ]
    }
});

ClinicalImpressions.attachSchema(ClinicalImpressionSchema);
