var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup appliance CRUD service
var appliance_read = require('../../services/appliance/read')
const apikey = process.env.API_TOKEN;

// Read appliance
router.get('/', function (req, res) {
  // security
  if (req.headers.token == apikey) {
    appliance_read.appliance_id({
      appliance_id:req.headers.appliance_id
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem finding the appliance");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
