var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var user_create = require('../../services/user/create')
const apikey = process.env.API_TOKEN;

// Create User
router.post('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    user_create.create({
      address_id: req.body.address_id,
      account_no: req.body.account_no,
      phone: req.body.phone,
      dob: req.body.dob,
      email: req.body.email,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      password: req.body.password,
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem creating the user");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
