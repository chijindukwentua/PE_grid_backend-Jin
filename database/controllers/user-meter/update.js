var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var user_update = require('../../services/user/update')
const apikey = process.env.API_TOKEN;

// Update User
router.put('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    user_update.password({
      user_id:req.body.user_id,
      key:req.body.key,
      value:req.body.value
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem updating the user");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
