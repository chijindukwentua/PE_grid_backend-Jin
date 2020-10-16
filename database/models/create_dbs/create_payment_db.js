let first_doc = {
  "payment_id": 0,
  "user_id": 0,
  "meter_id": 0,
  "disco_id": 0,
  "transaction_no": 544599562,
  "bank": "Access",
  "amount": 5000,
  "payment_type": "card",
  "payment_status": "pending",
  "bank_acct_no": "0755459145",
  "created_at": Date.now()
}

let pay_index = {
  "index": {
    "fields": [
      "payment_id"
    ]
  },
  "name": "pay-index",
  "type": "json"
}

var url = "https://5d1defc6-7eab-43a5-a5aa-50e4fa6f33fa-bluemix:aceb9d10b345b03cdbfff719136c8cc1a905558071efb692fbc56b4a21fb199a@5d1defc6-7eab-43a5-a5aa-50e4fa6f33fa-bluemix.cloudantnosqldb.appdomain.cloud"


//setup database connection
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant(url);

cloudant.db.create('payment', function() {
  var pay = cloudant.db.use('payment')
  pay.insert(first_doc, function(err, body, header){
    if (err) {
      return console.log('db_creation', err.message);
    }
  pay.index(pay_index, function(err, response) {
    if (err){
      throw err;
      }
    });
    console.log('successfully created')
  })
})
