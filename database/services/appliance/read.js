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
var appliances= cloudant.db.use('appliance')

const Appliance = {

  appliance_id: function(data, callback){

    let response = {}

    appliances.find({
      "selector":{
        "appliance_id":{
          "$eq":Number(data.appliance_id)
        }
      },
      "fields":[
        "appliance_id",
        "appliance_list_id",
        "name",
        "manufacturer",
        "model",
        "power_consumption",
        "created_at"
      ],
      "sort":[
        {
          "appliance_id":"asc"
        }
      ]
    }, function(err, result){
      if(!err){
        if (result.docs.length > 0) {
          var applianceData = result.docs[0]
          response['status'] = 'success';
          response['data'] = applianceData;
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

module.exports = Appliance;
