let email_index = {
  "index": {
    "fields": [
      "email"
    ]
  },
  "name": "email-index",
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

// var users = cloudant.db.use('user')
// var meters = cloudant.db.use('meter')
var appliances = cloudant.db.use('appliance')

// users.index(user_index, function(err, response) {
//   if (err){
//     throw err;
//   }
// })

appliances.index(date_index, function(err, response) {
  if (err){
    throw err;
  }
})
