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
const util = require('../util')
const bcrypt = require('bcrypt');
const saltRounds = 10;

//setup database connection
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant({account:username, password:password})
var pay= cloudant.db.use('payment')

const Payment = {

  status: function(data, callback){

    let response = {}

    pay.find({
      "selector":{
        "payment_id":{
          "$eq":Number(data.payment_id)
        }
      },
      "fields":[
        "_id",
        "_rev",
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
          "payment_id":"asc"
        }
      ]
    }, function(err, result){
      if(!err){
        if(result.docs.length > 0){
          var payData = result.docs[0]
          pay.destroy(result.docs[0]._id, result.docs[0]._rev, function(err, result) {
            if (!err) {
              const newPay = {
                "payment_id": payData.payment_id,
                "user_id": payData.user_id,
                "meter_id": payData.meter_id,
                "disco_id": payData.disco_id,
                "transaction_no": payData.transaction_no,
                "bank": payData.bank,
                "amount": payData.amount,
                "payment_type": payData.payment_type,
                "payment_status": data.value,
                "bank_acct_no": payData.bank_acct_no,
                "created_at": payData.created_at,
                "updated_at": Date.now()
              }
              pay.insert(newPay, function(){
                if (!err) {
                  response['status'] = 'success';
                  response['data'] = newPay;
                  callback(null, response);
                }
                else {
                  response['status'] = 'errorDB';
                  response['data'] = newPay;
                  callback(null, response);
                }
              });
            }
            else {
              response['status'] = 'errorDB';
              response['data'] = data;
              callback(null, response);
            }
          });
        }
        else {
          response['status'] = 'errorData';
          response['data'] = data;
          callback(null, response);
        }
      }
      else {
        response['status'] = 'noPaymentFound';
        response['data'] = data;
        callback(null, response);
      }
    });
  }

}

module.exports = Payment;
