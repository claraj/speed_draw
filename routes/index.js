var express = require('express');
var router = express.Router();


var line_history = [];

/* GET home page. */
router.get('/', function(req, res, next) {
  res.io.emit('functionName', 'some data');
  //res.send('hellooooo')
  res.render('index', { title: 'Drawing Program' });
});

module.exports = router;
