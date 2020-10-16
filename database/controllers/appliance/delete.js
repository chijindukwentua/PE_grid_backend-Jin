var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup appliance CRUD service
var appliance_delete = require('../../services/appliance/delete')
const apikey = process.env.API_TOKEN;

// Delete Appliance
router.delete('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    appliance_delete.id({
      appliance_id:req.body.appliance_id
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem deleting the appliance");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
