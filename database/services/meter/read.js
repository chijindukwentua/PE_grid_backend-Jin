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
var meters= cloudant.db.use('meter')

const Meter = {

  meter_id: function(data, callback){

    let response = {}

    meters.find({
      "selector":{
        "meter_id":{
          "$eq":Number(data.meter_id)
        }
      },
      "fields":[
        "meter_id",
        "meter_no",
        "address_id",
        "disco_id",
        "status",
        "energy_balance",
        "created_at"
      ],
      "sort":[
        {
          "meter_id":"asc"
        }
      ]
    }, function(err, result){
      if(!err){
        if (result.docs.length > 0) {
          var meterData = result.docs[0]
          response['status'] = 'success';
          response['data'] = meterData;
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

module.exports = Meter;
