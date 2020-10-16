var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var read_create = require('../../services/readings/create')
const apikey = process.env.API_TOKEN;

// Create User
router.post('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    read_create.create({
      meter_id: req.body.meter_id,
      current: req.body.current,
      voltage: req.body.voltage
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
