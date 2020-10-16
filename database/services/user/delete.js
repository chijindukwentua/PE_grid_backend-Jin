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
var users= cloudant.db.use('user')

const User = {

  id: function(data, callback) {

    let response = {}

    users.find({
      "selector": {
        "user_id": {
          "$eq": Number(data.user_id)
        }
      },
      "fields": [
        "_id",
        "_rev"
      ],
      "sort": [
        {
          "user_id": "asc"
        }
      ]
    }, function(err, result) {
      if (!err) {
        if (result.docs.length > 0) {
          users.destroy(result.docs[0]._id, result.docs[0]._rev, function(err, result) {
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
          response['status'] = 'noUserFound';
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

module.exports = User;
