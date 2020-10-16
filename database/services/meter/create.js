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

  create: function(data, callback){

    let response  = {}

    meters.find({
      "selector":{
        "created_at":{
          "$lt":Date.now()
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
          "created_at":"desc"
        }
      ]
    }, function(err, result){
      if(!err){
        var meterSize = Number(result.docs[0].meter_id)

        const newMeter = {
          "meter_id": meterSize + 1,
          "meter_no": data.meter_no,
          "address_id": data.address_id,
          "disco_id": data.disco_id,
          "status": data.status,
          "energy_balance": data.energy_balance,
          "created_at": Date.now()
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
      else{
        response['status'] = 'Failed!, no recent data';
        response['data'] = data;
        callback(null, response)
      }
    });


  }
}

module.exports = Meter;
