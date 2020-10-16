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
var appList= cloudant.db.use('appliance_list')

const AppList = {

  appliance_list_id: function(data, callback) {

    let response = {}

    appList.find({
      "selector": {
        "appliance_list_id": {
          "$eq": Number(data.appliance_list_id)
        }
      },
      "fields": [
        "_id",
        "_rev"
      ],
      "sort": [
        {
          "appliance_list_id": "asc"
        }
      ]
    }, function(err, result) {
      if (!err) {
        if (result.docs.length > 0) {
          appList.destroy(result.docs[0]._id, result.docs[0]._rev, function(err, result) {
            if (!err) {
              response['status'] = 'success';
              response['data'] = result.ok;
              callback(null, response);
            }
            else {
              response['status'] = 'errorData';
              response['data'] = data;
              callback(null, response);
            }
          });
        }
        else {
          response['status'] = 'noApplianceListFound';
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
