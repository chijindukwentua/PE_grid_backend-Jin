var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: true }));

require('dotenv').config({
  silent: true
});

// setup payment CRUD service
var payment_create = require('../../services/payment/create')
const apikey = process.env.API_TOKEN;

// Create Pqyment
router.post('/', function (req, res) {
  // security
  if (req.body.token == apikey) {
    payment_create.create({
      user_id: req.body.user_id,
      meter_id: req.body.meter_id,
      disco_id: req.body.disco_id,
      transaction_no: req.body.transaction_no,
      bank: req.body.bank,
      amount: req.body.amount,
      payment_type: req.body.payment_type,
      payment_status: req.body.payment_status,
      bank_acct_no: req.body.bank_acct_no
    }, function (err, Response) {
      if (err) return res.status(500).send("There was a problem creating the payment");
      res.status(200).send(Response);
    });
  }
  else {
    res.status(200).send("You are not authorised to access this API service.");
  }
});

module.exports = router;
