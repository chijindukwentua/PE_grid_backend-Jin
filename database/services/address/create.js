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

  create: function(data, callback){

    let response  = {}

    addy.find({
      "selector":{
        "created_at":{
          "$lt":Date.now()
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
          "created_at":"desc"
        }
      ]
    }, function(err, result){
      if(!err){
        var addySize = Number(result.docs[0].address_id)

        const newAddress = {
          "address_id": addySize + 1,
          "address": data.address,
          "lga": data.lga,
          "city": data.city,
          "state": data.state,
          "no_of_occupants": data.no_of_occupants,
          "lat": data.lat,
          "long": data.long,
          "created_at": Date.now()
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
      else{
        response['status'] = 'Failed!, no recent data';
        response['data'] = data;
        callback(null, response)
      }
    });
  }
}

module.exports = Address;
