var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var readings_delete = require('../../services/readings/delete')
const apikey = process.env.API_TOKEN;

// Delete User
router.delete('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    readings_delete.readings_id({
      readings_id:req.body.readings_id
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem deleting the reading");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
