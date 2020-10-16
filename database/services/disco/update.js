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
var discos = cloudant.db.use('disco')

const Disco = {

  contact_person: function(data, callback){

    let response = {}

    discos.find({
      "selector":{
        "disco_id":{
          "$eq":Number(data.disco_id)
        }
      },
      "fields":[
        "_id",
        "_rev",
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
        if(result.docs.length > 0){
          var discoData = result.docs[0]
          discos.destroy(result.docs[0]._id, result.docs[0]._rev, function(err, result) {
            if (!err) {
              const newDisco = {
                "disco_id": discoData.disco_id,
                "disco_name": discoData.disco_name,
                "polygon_coord": discoData.polygon_coord,
                "office_address": discoData.office_address,
                "contact_person": data.value,
                "email": discoData.email,
                "phone": discoData.phone,
                "image": discoData.image,
                "created_at": discoData.created_at
              }
              discos.insert(newDisco, function(){
                if (!err) {
                  response['status'] = 'success';
                  response['data'] = newDisco;
                  callback(null, response);
                }
                else {
                  response['status'] = 'errorDB';
                  response['data'] = newDisco;
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
        response['status'] = 'noDiscoFound';
        response['data'] = data;
        callback(null, response);
      }
    });
  }

}

module.exports = Disco;
