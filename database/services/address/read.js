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
var addy= cloudant.db.use('address')

const Address = {

  address_id: function(data, callback){

    let response = {}

    addy.find({
      "selector":{
        "address_id":{
          "$eq":Number(data.address_id)
        }
      },
      "fields":[
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
        if (result.docs.length > 0) {
          var addyData = result.docs[0]
          response['status'] = 'success';
          response['data'] = addyData;
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

module.exports = Address;
