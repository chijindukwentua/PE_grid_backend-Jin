let first_doc = {
  "appliance_id": 0,
  "appliance_list_id":0,
  "name": "Freezer",
  "manufacturer": "LG",
  "model": "LG-01342",
  "power_consumption": 50,
  "created_at": Date.now()
}

let appl_index = {
  "index": {
    "fields": [
      "appliance_id"
    ]
  },
  "name": "appliance-index",
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

cloudant.db.create('appliance', function() {
  var appl = cloudant.db.use('appliance')
  appl.insert(first_doc, function(err, body, header){
    if (err) {
      return console.log('db_creation', err.message);
    }
  appl.index(appl_index, function(err, response) {
    if (err){
      throw err;
      }
    });
  appl.index(date_index, function(err, response) {
    if (err){
      throw err;
      }
    });
  console.log('successfully created')
  })
})
