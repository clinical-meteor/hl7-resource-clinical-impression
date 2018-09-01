import SimpleSchema from 'simpl-schema';


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
  "identifier" : {
    optional: true,
    type:  Array
    },
  "identifier.$" : {
    optional: true,
    type:  IdentifierSchema 
    },

  "status" : {
    optional: true,
    type: String
    },
  "code" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "description" : {
    optional: true,
    type: String
    },

  "context" : {
    optional: true,
    type: ReferenceSchema
  },
  "subject" : {
    optional: true,
    type: ReferenceSchema
  },        

  "effectiveDateTime" : {
    optional: true,
    type: Date
    },
  "effectivePeriod" : {
    optional: true,
    type: PeriodSchema
    },
    
  "date" : {
    optional: true,
    type: Date
    },
  "assessor" : {
    optional: true,
    type: ReferenceSchema
    },
  "previous" : {
    optional: true,
    type: ReferenceSchema
    },
  "problem" : {
    optional: true,
    type: Array
    },
  "problem.$" : {
    optional: true,
    type: ReferenceSchema 
    },
      
  "investigations" : {
    optional: true,
    type:  Array
    },
  "investigations.$" : {
    optional: true,
    type:  Object 
    },

  "investigations.$.code" : {
    optional: true,
    type: CodeableConceptSchema
    },
  "investigations.$.item" : {
    optional: true,
    type: Array
    },
  "investigations.$.item.$" : {
    optional: true,
    type: ReferenceSchema 
    },
  
  "protocol" : {
    optional: true,
    type: Array
    },
  "protocol.$" : {
    optional: true,
    type: String 
    },
  "summary" : {
    optional: true,
    type: String
    },


  "finding" : {
    optional: true,
    type:  Array
    },
  "finding.$" : {
    optional: true,
    type:  Object 
    },    

  "finding.$.itemCodeableConcept" : {
    optional: true,
    type: Array
    },
  "finding.$.itemCodeableConcept.$" : {
    optional: true,
    type: CodeableConceptSchema
    },
  
  "finding.$.itemReference" : {
    optional: true,
    type: Array
    },
  "finding.$.itemReference.$" : {
    optional: true,
    type: ReferenceSchema 
    },
  

  "finding.$.basis" : {
    optional: true,
    type: String
    },

  "prognosisCodeableConcept" : {
    optional: true,
    type: Array
    },
  "prognosisCodeableConcept.$" : {
    optional: true,
    type: CodeableConceptSchema 
    },
  
  "prognosisReference" : {
    optional: true,
    type: Array
    },
  "prognosisReference.$" : {
    optional: true,
    type: ReferenceSchema 
    },
  
  "action" : {
    optional: true,
    type: Array
    },
  "action.$" : {
    optional: true,
    type: ReferenceSchema 
    },

  "note" : {
    optional: true,
    type: Array
    },
  "note.$" : {
    optional: true,
    type: Annotation
    }
});

BaseSchema.extend(ClinicalImpressionSchema);
DomainResourceSchema.extend(ClinicalImpressionSchema);
ClinicalImpressions.attachSchema(ClinicalImpressionSchema);

export default { ClinicalImpression, ClinicalImpressions, ClinicalImpressionSchema };