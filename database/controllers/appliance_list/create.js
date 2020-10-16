var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup appliance list CRUD service
var appListCreate = require('../../services/appliance_list/create')
const apikey = process.env.API_TOKEN;

// Create new appliance list
router.post('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    appListCreate.create({
      appliance_list_id: req.body.appliance_list_id,
      user_id: req.body.user_id,
      appliance_list: req.body.appliance_list
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem creating the appliance list");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
