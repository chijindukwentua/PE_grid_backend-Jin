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

  id: function(data, callback){

    let response = {}

    users.find({
      "selector":{
        "user_id":{
          "$eq":Number(data.user_id)
        }
      },
      "fields":[
        "user_id",
        "address_id",
        "account_no",
        "phone",
        "dob",
        "email",
        "first_name",
        "last_name",
        "password",
        "created_at"
      ],
      "sort":[
        {
          "user_id":"asc"
        }
      ]
    }, function(err, result){
      if(!err){
        if (result.docs.length > 0) {
          var userData = result.docs[0]
          response['status'] = 'success';
          response['data'] = userData;
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
  },

  email: function(data, callback){

  let response = {}

  console.log(data)

  users.find({
    "selector":{
      "email":{
        "$eq":data.email
      }
    },
    "fields":[
      "user_id",
      "address_id",
      "account_no",
      "phone",
      "dob",
      "email",
      "first_name",
      "last_name",
      "password",
      "created_at"
    ],
    "sort":[
      {
        "user_id":"asc"
      }
    ]
  }, function(err, result){
    if(!err){
      if (result.docs.length > 0) {
        var userData = result.docs[0]
        response['status'] = 'success';
        response['data'] = userData;
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
},

  // meter_id: function(data, callback){
  //
  //   let response = {}
  //
  //   users.find({
  //     "selector":{
  //       "meter_id":{
  //         "$eq":data.meter_id
  //       }
  //     },
  //     "fields":[
  //       "user_id",
  //       "meter_id",
  //       "address_id",
  //       "account_no",
  //       "phone",
  //       "dob",
  //       "email",
  //       "first_name",
  //       "last_name",
  //       "password",
  //       "created_at"
  //     ],
  //     "sort":[
  //       {
  //         "user_id":"asc" //return to this please
  //       }
  //     ]
  //   }, function(err, result){
  //     if(!err){
  //       if (result.docs.length > 0) {
  //         var userData = result.docs[0]
  //         response['status'] = 'success';
  //         response['data'] = userData;
  //         callback(null, response);
  //       }
  //       else {
  //         response['status'] = 'errorData';
  //         response['data'] = result.docs;
  //         callback(null, response);
  //       }
  //     }
  //     else {
  //       response['status'] = 'errorDB';
  //       response['data'] = data;
  //       callback(null, response);
  //     }
  //   });
  // },

  account_no: function(data, callback){

    let response = {}

    users.find({
      "selector":{
        "account_no":{
          "$eq":data.account_no
        }
      },
      "fields":[
        "user_id",
        "address_id",
        "account_no",
        "phone",
        "dob",
        "email",
        "first_name",
        "last_name",
        "password",
        "created_at"
      ],
      "sort":[
        {
          "user_id":"asc"  //return to this too
        }
      ]
    }, function(err, result){
      if(!err){
        if (result.docs.length > 0) {
          var userData = result.docs[0]
          response['status'] = 'success';
          response['data'] = userData;
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

module.exports = User;
