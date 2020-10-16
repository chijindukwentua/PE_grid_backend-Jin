let first_doc = {
  "address_id": 0,
  "address": "14, Adeniran Ogunseye street",
  "lga": "Yaba",
  "city": "Lagos",
  "state": "Lagos",
  "no_of_occupants": 5,
  "lat": 31,
  "long": 18,
  "created_at": Date.now()
}

let address_index = {
  "index": {
    "fields": [
      "address_id"
    ]
  },
  "name": "address-index",
  "type": "json"
}

let date_index = {
  "index": {
    "fields": [
       "created_at"
    ]
  },
  "name": "date-index",
  "type": "json"
}
var url = "https://5d1defc6-7eab-43a5-a5aa-50e4fa6f33fa-bluemix:aceb9d10b345b03cdbfff719136c8cc1a905558071efb692fbc56b4a21fb199a@5d1defc6-7eab-43a5-a5aa-50e4fa6f33fa-bluemix.cloudantnosqldb.appdomain.cloud"


//setup database connection
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant(url);

cloudant.db.create('address', function() {
  var addy = cloudant.db.use('address')
  addy.insert(first_doc, function(err, body, header){
    if (err) {
      return console.log('db_creation', err.message);
    }
  addy.index(address_index, function(err, response) {
    if (err){
      throw err;
      }
    });
  addy.index(date_index, function(err, response) {
    if (err){
      throw err;
      }
    });

    console.log('successfully created')
  })
})
