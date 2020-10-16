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
var users= cloudant.db.use('user')

const User = {

  password: function(data, callback){

    let response = {}

    users.find({
      "selector":{
        "user_id":{
          "$eq":Number(data.user_id)
        }
      },
      "fields":[
        "_id",
        "_rev",
        "user_id",
        "address_id",
        "account_no",
        "phone",
        "dob",
        "email",
        "first_name",
        "last_name",
        "password",
        "created_at",
        "updated_at"
      ],

      "sort":[
        {
          "user_id":"asc"
        }
      ]
    }, function(err, result){
      if(!err){
        if(result.docs.length > 0){
          var userData = result.docs[0]
          users.destroy(result.docs[0]._id, result.docs[0]._rev, function(err, result) {
            if (!err) {
              const newUser = {
                "user_id": userData.user_id,
                "address_id": userData.address_id,
                "account_no": userData.account_no,
                "phone": userData.phone,
                "dob": userData.dob,
                "email": userData.email,
                "first_name": userData.first_name,
                "last_name": userData.last_name,
                "password": data.value,
                "created_at": data.created_at,
                "updated_at": Date.now()
              }
              users.insert(newUser, function(){
                if (!err) {
                  response['status'] = 'success';
                  response['data'] = newUser;
                  callback(null, response);
                }
                else {
                  response['status'] = 'errorDB';
                  response['data'] = newUser;
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
        response['status'] = 'noUserFound';
        response['data'] = data;
        callback(null, response);
      }
    });
  }

}

module.exports = User;
