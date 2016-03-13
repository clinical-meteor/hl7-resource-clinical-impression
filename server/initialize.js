// if the database is empty on server start, create some sample data.
Meteor.startup(function () {
  if (process.env.INITIALIZE) {
    console.log('INITIALZING');
    if (ClinicalImpression.find().count() === 0) {
      console.log('No ClinicalImpressions found.  Creating some...');


      var impressionId = ClinicalImpression.insert();
      console.log('impressionId', impressionId);
    }
  }
});
