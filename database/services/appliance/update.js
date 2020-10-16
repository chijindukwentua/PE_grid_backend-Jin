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
var appliances = cloudant.db.use('appliance')

const Appliance = {

  name: function(data, callback){

    let response = {}

    appliances.find({
      "selector":{
        "appliance_id":{
          "$eq":Number(data.appliance_id)
        }
      },
      "fields":[
        "_id",
        "_rev",
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
        if(result.docs.length > 0){
          var applData = result.docs[0]
          appliances.destroy(result.docs[0]._id, result.docs[0]._rev, function(err, result) {
            if (!err) {
              const newAppl = {
                "appliance_id": applData.appliance_id,
                "appliance_list_id": applData.appliance_list_id,
                "name": data.value,
                "manufacturer": applData.manufacturer,
                "model": applData.model,
                "power_consumption": applData.power_consumption,
                "created_at": applData.created_at,
                "updated_at": Date.now()
              }
              appliances.insert(newAppl, function(){
                if (!err) {
                  response['status'] = 'success';
                  response['data'] = newAppl;
                  callback(null, response);
                }
                else {
                  response['status'] = 'errorDB';
                  response['data'] = newAppl;
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
        response['status'] = 'noApplianceFound';
        response['data'] = data;
        callback(null, response);
      }
    });
  }

}

module.exports = Appliance;
