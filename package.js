Package.describe({
  name: 'clinical:hl7-resource-clinical-impression',
  version: '2.0.2',
  summary: 'HL7 FHIR Resource - Clinical Impression',
  git: 'https://github.com/clinical-meteor/hl7-resource-clinical-impression',
  documentation: 'README.md'
});

Package.onUse(function (api) {
  api.versionsFrom('1.1.0.3');

  api.use('meteor-platform');
  api.use('mongo');
  api.use('ecmascript@0.9.0');

  api.use('clinical:glass-ui@2.2.7');

  api.use('aldeed:collection2@3.0.0');
  api.use('clinical:hl7-resource-datatypes@4.0.0');
  api.use('clinical:hl7-resource-bundle@1.4.0');

  api.use('simple:json-routes@2.1.0');
  api.use('prime8consulting:meteor-oauth2-server@0.0.2');

  api.use('clinical:base-model@1.4.0');

  api.addFiles('lib/hl7-resource-clinical-impression.js');
  api.addFiles('server/rest.js', 'server');
  api.addFiles('server/initialize.js', 'server');

  api.export('ClinicalImpression');
  api.export('ClinicalImpressions');
  api.export('ClinicalImpressionSchema');

  api.mainModule('index.jsx', 'client');
});


Npm.depends({
  "simpl-schema": "1.5.3",
  "moment": "2.22.2",
  "lodash": "4.17.4"
})