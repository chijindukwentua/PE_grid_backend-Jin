var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var disco_create = require('../../services/disco/create')
const apikey = process.env.API_TOKEN;

// Create User
router.post('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    disco_create.create({
      disco_name: req.body.disco_name,
      polygon_coord: req.body.polygon_coord,
      office_address: req.body.office_address,
      contact_person: req.body.contact_person,
      email: req.body.email,
      phone: req.body.phone,
      image: req.body.image
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem creating the disco");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
