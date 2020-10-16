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
var addy= cloudant.db.use('address')

const Address = {

  address: function(data, callback){

    let response = {}

    addy.find({
      "selector":{
        "address_id":{
          "$eq":Number(data.address_id)
        }
      },
      "fields":[
        "_id",
        "_rev",
        "address_id",
        "address",
        "lga",
        "city",
        "state",
        "no_of_occupants",
        "lat",
        "long",
        "created_at"
      ],

      "sort":[
        {
          "address_id":"asc"
        }
      ]
    }, function(err, result){
      if(!err){
        if(result.docs.length > 0){
          var addyData = result.docs[0]
          addy.destroy(result.docs[0]._id, result.docs[0]._rev, function(err, result) {
            if (!err) {
              const newAddress = {
                "address_id": addyData.address_id,
                "address": data.value,
                "lga": addyData.lga,
                "city": addyData.city,
                "state": addyData.state,
                "no_of_occupants": addyData.no,
                "created_at": addyData.created_at,
                "updated_at": Date.now()
              }
              addy.insert(newAddress, function(){
                if (!err) {
                  response['status'] = 'success';
                  response['data'] = newAddress;
                  callback(null, response);
                }
                else {
                  response['status'] = 'errorDB';
                  response['data'] = newAddress;
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
        response['status'] = 'noAddressFound';
        response['data'] = data;
        callback(null, response);
      }
    });
  }

}

module.exports = Address;
