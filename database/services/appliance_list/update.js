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
var appList = cloudant.db.use('appliance_list')

const AppList = {

  appliance_list: function(data, callback){

    let response = {}

    appList.find({
      "selector":{
        "appliance_list_id":{
          "$eq":Number(data.appliance_list_id)
        }
      },
      "fields":[
        "_id",
        "_rev",
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
        if(result.docs.length > 0){
          var appListData = result.docs[0]
          appList.destroy(result.docs[0]._id, result.docs[0]._rev, function(err, result) {
            if (!err) {
              const newAppList = {
                "appliance_list_id": appListData.appliance_list_id,
                "meter_id": appListData.meter_id,
                "user_id": appListData.user_id,
                "appliance_list": data.value,
                "created_at": appListData.created_at
              }
              appList.insert(newAppList, function(){
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
        response['status'] = 'noAppListFound';
        response['data'] = data;
        callback(null, response);
      }
    });
  }

}

module.exports = AppList;
