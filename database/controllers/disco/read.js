var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var disco_read = require('../../services/disco/read')
const apikey = process.env.API_TOKEN;

// Read User
router.get('/', function (req, res) {
  // security
  if (req.headers.token == apikey) {
    disco_read.disco_id({
      disco_id:req.headers.disco_id
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem finding the disco");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
