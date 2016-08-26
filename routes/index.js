var express = require('express');
var router = express.Router();
var https = require('https');
var apiKey = process.env.API_KEY || require('./apiKey.js').google;

// GET home page
router.get('/', function(req, res, next) {
  res.render('index', { title: 'MusicTiger' });
});

// GET playlist
router.get('/api/playlist', function(req, res, next) {
  var outRes = res;
  var playlist = req.query.playlist;
  var query = "https://www.googleapis.com/youtube/v3/playlistItems?" +
    "part=snippet&key=" + apiKey +
    "&maxResults=24" +
    "&playlistId=" + playlist;

  var request = https.get(query, function(res) {
    res.setEncoding('utf8');
    var responseData = "";
    res.on('data', function (data) {
      responseData += data;
    });

    res.on('end', function () {
      var results = JSON.parse(responseData).items;
      outRes.json(results);
    });
  });

  request.on('error', function (e) {
    console.error(e);
  });

  request.end();

});

// GET video stats
router.get('/api/videostats', function(req, res, next) {
  var outRes = res;
  var id = req.query.videoId;
  var query = "https://www.googleapis.com/youtube/v3/videos?" +
    "part=statistics,snippet&key=" + apiKey + "&id=" + id;

  https.get(query, function(res) {
    res.setEncoding('utf8');
    var responseData = "";
    res.on('data', function (data) {
      responseData += data;
    });

    res.on('end', function () {
      var results = JSON.parse(responseData).items[0];
      outRes.json(results);
    });
  }).end();

});

// GET video search
router.get('/api/search', function(req, res, next) {
  var outRes = res;
  var q = req.query.query;
  var query = "https://www.googleapis.com/youtube/v3/search?" +
    "part=snippet&maxResults=24&type=video&videoCategoryId=10" +
    "&key=" + apiKey + "&q=" + q;

  https.get(query, function(res) {
    res.setEncoding('utf8');
    var responseData = "";
    res.on('data', function (data) {
      responseData += data;
    });

    res.on('end', function () {
      var results = JSON.parse(responseData);
      outRes.json(results);
    });
  }).end();

});


module.exports = router;
