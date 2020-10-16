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
var reading= cloudant.db.use('readings')

const Read = {

  create: function(data, callback){

    let response  = {}

    reading.find({
      "selector":{
        "created_at":{
          "$lt":Date.now()
        }
      },
      "fields":[
        "readings_id",
        "meter_id",
        "current",
        "voltage",
        "created_at"
      ],
      "sort":[
        {
          "created_at":"desc"
        }
      ]
    }, function(err, result){
      if(!err){
        var readSize = Number(result.docs[0].readings_id)

        const newReading = {
          "readings_id": readSize + 1,
          "meter_id": data.meter_id,
          "current": data.current,
          "voltage": data.voltage,
          "created_at": Date.now()
        }
        reading.insert(newReading, function(){
          if (!err) {
            response['status'] = 'success';
            response['data'] = newReading;
            callback(null, response);
          }
          else {
            response['status'] = 'errorDB';
            response['data'] = newReading;
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

module.exports = Read;
