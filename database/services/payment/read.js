/*
  We create ORM like functions that Creates Reads Update and Delete
  users data from the NoSQL Cloudant Database
*/

'use strict';

require('dotenv').config({
  silent: true
});

// setup utilities
var secretkey = process.env.SECRETKEY;
var username = process.env.CLOUDANT_USERNAME;
var password = process.env.CLOUDANT_PASSWORD;

//setup database connection
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant({account:username, password:password})
var pay= cloudant.db.use('payment')

const Payment = {

  payment_id: function(data, callback){

    let response = {}

    pay.find({
      "selector":{
        "payment_id":{
          "$eq":Number(data.payment_id)
        }
      },
      "fields":[
        "payment_id",
        "transaction_no",
        "meter_id",
        "disco_id",
        "transaction_no",
        "bank",
        "amount",
        "payment_type",
        "payment_status",
        "bank_acct_no",
        "created_at"
      ],
      "sort":[
        {
          "payment_id":"asc" //return to this please
        }
      ]
    }, function(err, result){
      if(!err){
        if (result.docs.length > 0) {
          var paymentData = result.docs[0]
          response['status'] = 'success';
          response['data'] = paymentData;
          callback(null, response);
        }
        else {
          response['status'] = 'errorData';
          response['data'] = result.docs;
          callback(null, response);
        }
      }
      else {
        response['status'] = 'errorDB';
        response['data'] = data;
        callback(null, response);
      }
    });
  }


}

module.exports = Payment;
