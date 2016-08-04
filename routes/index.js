var express = require('express');
var router = express.Router();
var https = require('https');
var apiKey = require('./apiKey.js').google;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/playlist', function(req, res, next) {
  var outRes = res;
  var playlist = req.query.playlist;
  var query = "https://www.googleapis.com/youtube/v3/playlistItems?" +
    "part=snippet&key=" + apiKey + "&maxResults=24" +
    "&playlistId=" + playlist;

  https.get(query, function(res) {
    res.setEncoding('utf8');
    var responseData = "";
    res.on('data', function (data) {
      responseData += data;
    });

    res.on('error', function () {
      console.log('error');
      outRes.json([]);
    });

    res.on('end', function () {
      var results = JSON.parse(responseData).items;
      outRes.json(results);
    });
  }).end();

});

module.exports = router;
