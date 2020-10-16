var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var appliance_create = require('../../services/appliance/create')
const apikey = process.env.API_TOKEN;

// Create appliance
router.post('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    appliance_create.create({
      appliance_list_id: req.body.appliance_list_id,
      name: req.body.name,
      manufacturer: req.body.manufacturer,
      model: req.body.model,
      power_consumption: req.body.power_consumption
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem creating the appliance");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
