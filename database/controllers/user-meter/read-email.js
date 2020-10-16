var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var user_read = require('../../services/user/read')
const apikey = process.env.API_TOKEN;

// Read User
router.get('/', function (req, res) {
  // security
  if (req.headers.token == apikey) {
    user_read.email({
      email:req.headers.email
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem finding the user");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
