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

  readings_id: function(data, callback){

    let response = {}

    reading.find({
      "selector":{
        "readings_id":{
          "$eq":Number(data.readings_id)
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
          "readings_id":"asc"
        }
      ]
    }, function(err, result){
      if(!err){
        if (result.docs.length > 0) {
          var readingsData = result.docs[0]
          response['status'] = 'success';
          response['data'] = readingsData;
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

module.exports = Read;
