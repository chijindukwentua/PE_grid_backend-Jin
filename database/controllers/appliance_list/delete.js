var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup appliance list CRUD service
var appListDelete = require('../../services/appliance_list/delete')
const apikey = process.env.API_TOKEN;

// Delete appliance list
router.delete('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    appListDelete.appliance_list_id({
      appliance_list_id:req.body.appliance_list_id
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem deleting the appliance list");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
