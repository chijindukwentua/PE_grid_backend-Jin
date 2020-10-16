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
var app_list = cloudant.db.use('appliance_list')

const AppList = {

  appliance_list_id: function(data, callback){

    let response = {}

    app_list.find({
      "selector":{
        "appliance_list_id":{
          "$eq":Number(data.appliance_list_id)
        }
      },
      "fields":[
        "appliance_list_id",
        "meter_id",
        "user_id",
        "appliance_list",
        "created_at"
      ],
      "sort":[
        {
          "appliance_list_id":"asc"
        }
      ]
    }, function(err, result){
      if(!err){
        if (result.docs.length > 0) {
          var appListData = result.docs[0]
          response['status'] = 'success';
          response['data'] = appListData;
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

module.exports = AppList;
