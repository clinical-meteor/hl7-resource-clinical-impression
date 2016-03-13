
JsonRoutes.Middleware.use(
    '/api/*',
    oAuth2Server.oauthserver.authorise()   // OAUTH FLOW - A7.1
);



JsonRoutes.add("get", "/clinicalImpression/:id", function (req, res, next) {
  console.log('GET /clinicalImpression/' + req.params.id);
  //console.log('res', res);

  var accessTokenStr = (req.params && req.params.access_token) || (req.query && req.query.access_token);
  var accessToken = oAuth2Server.collections.accessToken.findOne({accessToken: accessTokenStr});

  if (accessToken) {
    console.log('accessToken', accessToken);
    console.log('accessToken.userId', accessToken.userId);

    var id = req.params.id;
    console.log('ClinicalImpressions.findOne(id)', ClinicalImpressions.findOne(id));

    JsonRoutes.sendResult(res, {
      code: 200,
      data: ClinicalImpressions.findOne(id)
    });
  } else {
    JsonRoutes.sendResult(res, {
      code: 401
    });
  }
});
