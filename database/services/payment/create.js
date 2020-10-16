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

  create: function(data, callback){

    let response  = {}

    pay.find({
      "selector":{
        "created_at":{
          "$lt":Date.now()
        }
      },
      "fields":[
        "payment_id",
        "user_id",
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
          "created_at":"desc"
        }
      ]
    }, function(err, result){
      if(!err){
        var paySize = Number(result.docs[0].payment_id)

        const newPayment = {
          "payment_id": paySize + 1,
          "user_id": data.user_id,
          "meter_id": data.meter_id,
          "disco_id": data.disco_id,
          "transaction_no": data.transaction_no,
          "bank": data.bank,
          "amount": data.amount,
          "payment_type": data.payment_type,
          "payment_status": data.payment_status,
          "bank_acct_no": data.bank_acct_no,
          "created_at": Date.now()
        }
        pay.insert(newPayment, function(){
          if (!err) {
            response['status'] = 'success';
            response['data'] = newPayment;
            callback(null, response);
          }
          else {
            response['status'] = 'errorDB';
            response['data'] = newPayment;
            callback(null, response);
          }
        });
      }
      else{
        response['status'] = 'Failed!, no recent data';
        response['data'] = data;
        callback(null, response)
      }
    });

  }
}

module.exports = Payment;
