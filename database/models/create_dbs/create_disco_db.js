let first_doc = {
  "disco_id": 0,
  "disco_name": "IKEDC",
  "polygon_coord": 21,
  "office_address": "Fortune towers, VI, Lagos",
  "contact_person": "Some_guy",
  "email": "someguy@ikedc.com",
  "phone": "08192073029",
  "image": "rand_image",
  "created_at": Date.now()
}

let disco_index = {
  "index": {
    "fields": [
      "disco_id"
    ]
  },
  "name": "disco-index",
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

cloudant.db.create('disco', function() {
  var disc = cloudant.db.use('disco')
  disc.insert(first_doc, function(err, body, header){
    if (err) {
      return console.log('db_creation', err.message);
    }
  disc.index(disco_index, function(err, response) {
    if (err){
      throw err;
      }
    });
  disc.index(date_index, function(err, response) {
    if (err){
      throw err;
      }
    });
  console.log('successfully created')
  })
})
