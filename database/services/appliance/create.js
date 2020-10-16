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

  create: function(data, callback){

    let response  = {}

    appliances.find({
      "selector":{
        "created_at":{
          "$lt":Date.now()
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
          "created_at":"desc"
        }
      ]
    }, function(err, result){
      if(!err){
        var applSize = Number(result.docs[0].appliance_id)

        const newAppliance = {
          "appliance_id": applSize + 1,
          "appliance_list_id": data.appliance_list_id,
          "name": data.name,
          "manufacturer": data.manufacturer,
          "model": data.model,
          "power_consumption": data.power_consumption,
          "created_at": Date.now()
        }
        appliances.insert(newAppliance, function(){
          if (!err) {
            response['status'] = 'success';
            response['data'] = newAppliance;
            callback(null, response);
          }
          else {
            response['status'] = 'errorDB';
            response['data'] = newAppliance;
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

module.exports = Appliance;
