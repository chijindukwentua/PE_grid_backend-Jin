let first_doc = {
  "user_id": 0,
  "address_id": 0,
  "account_no": 1234,
  "phone": "07060951036",
  "dob": "17/12/1990",
  "email": "johnnybravo@josla.com.ng",
  "first_name": "Johnny",
  "last_name": "Bravo",
  "password": "notacoward295",
  "created_at": Date.now()
}

let user_index = {
  "index": {
    "fields": [
      "user_id"
    ]
  },
  "name": "user-index",
  "type": "json"
}

let meter_index = {
  "index": {
    "fields": [
      "user_id",
      "meter_id"
    ]
  },
  "name": "user-meter-index",
  "type": "json"
}

let account_index = {
  "index": {
    "fields": [
      "user_id",
      "account_no"
    ]
  },
  "name": "user-account-index",
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

cloudant.db.create('user', function() {
  var users = cloudant.db.use('user')
  users.insert(first_doc, function(err, body, header){
    if (err) {
      return console.log('db_creation', err.message);
    }
    users.index(user_index, function(err, response) {
      if (err){
        throw err;
      }
    })
    users.index(meter_index , function(err, response) {
      if (err){
        throw err;
      }
    })
    users.index(account_index, function(err, response) {
      if (err){
        throw err;
      }
    })
    users.index(date_index, function(err, response) {
      if (err){
        throw err;
      }
    })
    console.log('successfully created')
  })
})
