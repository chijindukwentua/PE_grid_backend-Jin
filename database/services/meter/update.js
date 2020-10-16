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
var meters= cloudant.db.use('meter')

const Meter = {

  energy_balance: function(data, callback){

    let response = {}

    meters.find({
      "selector":{
        "meter_id":{
          "$eq":Number(data.meter_id)
        }
      },
      "fields":[
        "_id",
        "_rev",
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
        if(result.docs.length > 0){
          var meterData = result.docs[0]
          meters.destroy(result.docs[0]._id, result.docs[0]._rev, function(err, result) {
            if (!err) {
              const newMeter = {
                "meter_id": meterData.meter_id,
                "meter_no": meterData.meter_no,
                "address_id": meterData.address_id,
                "disco_id": meterData.disco_id,
                "status": meterData.status,
                "energy_balance": data.value,
                "created_at": meterData.created_at,
                "updated_at": Date.now()
              }
              meters.insert(newMeter, function(){
                if (!err) {
                  response['status'] = 'success';
                  response['data'] = newMeter;
                  callback(null, response);
                }
                else {
                  response['status'] = 'errorDB';
                  response['data'] = newMeter;
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
        response['status'] = 'noMeterFound';
        response['data'] = data;
        callback(null, response);
      }
    });
  }

}

module.exports = Meter;
