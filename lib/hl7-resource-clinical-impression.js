
// create the object using our BaseModel
ClinicalImpression = BaseModel.extend();


//Assign a collection so the object knows how to perform CRUD operations
ClinicalImpression.prototype._collection = ClinicalImpressions;

// Create a persistent data store for addresses to be stored.
// HL7.Resources.Patients = new Mongo.Collection('HL7.Resources.Patients');
ClinicalImpressions = new Mongo.Collection('ClinicalImpressions');

//Add the transform to the collection since Meteor.users is pre-defined by the accounts package
ClinicalImpressions._transform = function (document) {
  return new ClinicalImpression(document);
};


if (Meteor.isClient){
  Meteor.subscribe("ClinicalImpressions");
}

if (Meteor.isServer){
  Meteor.publish("ClinicalImpressions", function (argument){
    if (this.userId) {
      return ClinicalImpressions.find();
    } else {
      return [];
    }
  });
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
  "triggerCodeableConceptSchema" : {
    type: CodeableConceptSchema
    },
  "triggerReference" : {
    type: ReferenceSchema
    },
  "investigations.$.code" : {
    type: CodeableConceptSchema
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
    type: CodeableConceptSchema
    },
  "finding.$.cause" : {
    type: String
    },
  "resolved" : {
    type: [ CodeableConceptSchema ]
    },
  "ruledOut.$.item" : {
    type: CodeableConceptSchema
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
