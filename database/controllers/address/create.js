var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var address_create = require('../../services/address/create')
const apikey = process.env.API_TOKEN;

// Create User
router.post('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    address_create.create({
      address_id: req.body.address_id,
      address: req.body.address,
      lga: req.body.lga,
      city: req.body.city,
      state: req.body.state,
      no_of_occupants: req.body.no_of_occupants,
      lat: req.body.lat,
      long: req.body.long
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem creating the address");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
