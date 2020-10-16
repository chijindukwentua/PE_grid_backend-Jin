var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup user CRUD service
var payment_read = require('../../services/payment/read')
const apikey = process.env.API_TOKEN;

// Read User
router.get('/', function (req, res) {
  // security
  if (req.headers.token == apikey) {
    payment_read.payment_id({
      payment_id:req.headers.payment_id
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem finding the payment");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
