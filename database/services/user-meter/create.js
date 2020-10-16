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

  create: function(data, callback){

    let response  = {}

    users.find({
      "selector":{
        "created_at":{
          "$lt":Date.now()
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
          "created_at":"desc"
        }
      ]
    }, function(err, result){
      if(!err){
        var userSize = Number(result.docs[0].user_id)

        const newUser = {
          "user_id": userSize + 1,
          "address_id": data.address_id,
          "account_no": data.account_no,
          "phone": data.phone,
          "dob": data.dob,
          "email": data.email,
          "first_name": data.first_name,
          "last_name": data.last_name,
          "password": data.password,
          "created_at": Date.now()
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
      else{
        response['status'] = 'Failed!, no recent data';
        response['data'] = data;
        callback(null, response)
      }
    });

  }
}

module.exports = User;
