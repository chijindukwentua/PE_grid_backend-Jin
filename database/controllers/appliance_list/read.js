var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup appliance_list CRUD service
var app_list_read = require('../../services/appliance_list/read')
const apikey = process.env.API_TOKEN;

// Read appliance list
router.get('/', function (req, res) {
  // security
  if (req.headers.token == apikey) {
    app_list_read.appliance_list_id({
      appliance_list_id:req.headers.appliance_list_id
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem finding the list of appliances");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
