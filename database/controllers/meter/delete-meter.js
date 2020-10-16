var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var meter_delete = require('../../services/meter/delete')
const apikey = process.env.API_TOKEN;

// Delete User
router.delete('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    meter_delete.id({
      meter_id:req.body.meter_id
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem deleting the meter");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
