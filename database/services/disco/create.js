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

  create: function(data, callback){

    let response  = {}

    discos.find({
      "selector":{
        "created_at":{
          "$lt":Date.now()
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
          "created_at":"desc"
        }
      ]
    }, function(err, result){
      if(!err){
        var discoSize = Number(result.docs[0].disco_id)

        const newDisco = {
          "disco_id": discoSize + 1,
          "disco_name": data.disco_name,
          "polygon_coord": data.polygon_coord,
          "office_address": data.office_address,
          "contact_person": data.contact_person,
          "email": data.email,
          "phone": data.phone,
          "image": data.image,
          "created_at": Date.now()
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
      else{
        response['status'] = 'Failed!, no recent data';
        response['data'] = data;
        callback(null, response)
      }
    });
  }
}

module.exports = Disco;
