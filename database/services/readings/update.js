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
var read= cloudant.db.use('readings')

const Readings = {

  current: function(data, callback){

    let response = {}

    read.find({
      "selector":{
        "readings_id":{
          "$eq":Number(data.readings_id)
        }
      },
      "fields":[
        "_id",
        "_rev",
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
        if(result.docs.length > 0){
          var readData = result.docs[0]
          read.destroy(result.docs[0]._id, result.docs[0]._rev, function(err, result) {
            if (!err) {
              const newReading = {
                "readings_id": readData.readings_id,
                "meter_id": readData.meter_id,
                "current": data.value,
                "voltage": readData.voltage,
                "created_at": readData.created_at,
                "updated_at": Date.now()
              }
              read.insert(newReading, function(){
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
        response['status'] = 'noReadingFound';
        response['data'] = data;
        callback(null, response);
      }
    });
  }

}

module.exports = Readings;
