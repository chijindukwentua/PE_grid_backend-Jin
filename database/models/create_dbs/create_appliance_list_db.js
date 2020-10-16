let first_doc = {
  "appliance_list_id": 0,
  "meter_id": 0,
  "user_id": 0,
  "appliance_list": [0, 1, 2, 3, 6],
  "created_at": Date.now()
}

let app_list_index = {
  "index": {
    "fields": [
      "appliance_list_id"
    ]
  },
  "name": "app-list-index",
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

cloudant.db.create('appliance_list', function() {
  var app_list = cloudant.db.use('appliance_list')
  app_list.insert(first_doc, function(err, body, header){
    if (err) {
      return console.log('db_creation', err.message);
    }
  app_list.index(app_list_index, function(err, response) {
    if (err){
      throw err;
      }
    });
  app_list.index(date_index, function(err, response) {
    if (err){
      throw err;
      }
    });
    console.log('successfully created')
  })
})
