var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var meter_create = require('../../services/meter/create')
const apikey = process.env.API_TOKEN;

// Create User
router.post('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    meter_create.create({
      meter_no: req.body.meter_no,
      address_id: req.body.address_id,
      disco_id: req.body.disco_id,
      status: req.body.status,
      energy_balance: req.body.energy_balance
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem creating the meter");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
