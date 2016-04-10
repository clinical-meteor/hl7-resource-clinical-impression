describe('clinical:hl7-resource-clinical-impressions', function () {
  var server = meteor();
  var client = browser(server);

  it('ClinicalImpressions should exist on the client', function () {
    return client.execute(function () {
      expect(ClinicalImpressions).to.exist;
    });
  });

  it('ClinicalImpressions should exist on the server', function () {
    return server.execute(function () {
      expect(ClinicalImpressions).to.exist;
    });
  });
});
