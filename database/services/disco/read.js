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
var discos= cloudant.db.use('disco')

const Disco = {

  disco_id: function(data, callback){

    let response = {}

    discos.find({
      "selector":{
        "disco_id":{
          "$eq":Number(data.disco_id)
        }
      },
      "fields":[
        "disco_id",
        "disco_name",
        "polygon_coord",
        "office_address",
        "contact_person",
        "email",
        "phone",
        "image",
        "created_at"
      ],
      "sort":[
        {
          "disco_id":"asc"
        }
      ]
    }, function(err, result){
      if(!err){
        if (result.docs.length > 0) {
          var discoData = result.docs[0]
          response['status'] = 'success';
          response['data'] = discoData;
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

module.exports = Disco;
