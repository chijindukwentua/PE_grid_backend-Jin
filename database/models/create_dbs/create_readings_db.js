let first_doc = {
  "readings_id": 0,
  "meter_id": 0,
  "current": 10,
  "voltage": 15,
  "created_at": Date.now()
}

let readings_index = {
  "index": {
    "fields": [
      "readings_id"
    ]
  },
  "name": "readings-index",
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

cloudant.db.create('readings', function() {
  var read = cloudant.db.use('readings')
  read.insert(first_doc, function(err, body, header){
    if (err) {
      return console.log('db_creation', err.message);
    }
  read.index(readings_index, function(err, response) {
    if (err){
      throw err;
      }
    });
    read.index(date_index, function(err, response) {
      if (err){
        throw err;
        }
      });
    console.log('successfully created')
  })
})
