let first_doc = {
  "meter_id": 0,
  "meter_no": 135366,
  "address_id": 0,
  "disco_id": 0,
  "status": "on",
  "energy_balance": 8500,
  "created_at": Date.now()
}

let meter_index = {
  "index": {
    "fields": [
      "meter_id"
    ]
  },
  "name": "meter-index",
  "type": "json"
}

var url = "https://5d1defc6-7eab-43a5-a5aa-50e4fa6f33fa-bluemix:aceb9d10b345b03cdbfff719136c8cc1a905558071efb692fbc56b4a21fb199a@5d1defc6-7eab-43a5-a5aa-50e4fa6f33fa-bluemix.cloudantnosqldb.appdomain.cloud"


//setup database connection
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant(url);

cloudant.db.create('meter', function() {
  var meters = cloudant.db.use('meter')
  meters.insert(first_doc, function(err, body, header){
    if (err) {
      return console.log('db_creation', err.message);
    }
  meters.index(meter_index, function(err, response) {
    if (err){
      throw err;
      }
    });
    console.log('successfully created')
  })
})
