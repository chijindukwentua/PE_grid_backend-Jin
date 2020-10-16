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
var app_list= cloudant.db.use('appliance_list')

const App_list = {

  create: function(data, callback){

    let response  = {}

    app_list.find({
      "selector":{
        "created_at":{
          "$lt":Date.now()
        }
      },
      "fields":[
        "appliance_list_id",
        "meter_id",
        "manufacturer",
        "user_id",
        "appliance_list",
        "created_at"
      ],
      "sort":[
        {
          "created_at":"desc"
        }
      ]
    }, function(err, result){
      if(!err){
        var appListSize = Number(result.docs[0].appliance_list_id)

        const newAppList = {
          "appliance_list_id": appListSize + 1,
          "meter_id": data.meter_id,
          "user_id": data.user_id,
          "appliance_list": data.appliance_list,
          "created_at": Date.now()
        }
        app_list.insert(newAppList, function(){
          if (!err) {
            response['status'] = 'success';
            response['data'] = newAppList;
            callback(null, response);
          }
          else {
            response['status'] = 'errorDB';
            response['data'] = newAppList;
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

module.exports = App_list;
