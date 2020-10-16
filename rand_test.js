// users.find({
//   "selector":{
//     "created_at":{
//       "$lt":Date.now()
//     }
//   },
//   "fields":[
//     "user_id",
//     "address_id",
//     "account_no",
//     "phone",
//     "dob",
//     "email",
//     "first_name",
//     "last_name",
//     "password",
//     "created_at"
//   ],
//   "sort":[
//     {
//       "created_at":"desc"
//     }
//   ]
// }, function(err, result){
//   if(!err){
//     var userSize = Number(result.docs[0].user_id)
//
//     const newUser = {
//       "user_id": userSize + 1,
//       "address_id": data.address_id,
//       "account_no": data.account_no,
//       "phone": data.phone,
//       "dob": data.dob,
//       "email": data.email,
//       "first_name": data.first_name,
//       "last_name": data.last_name,
//       "password": data.password,
//       "created_at": Date.now()
//     }
//     users.insert(newUser, function(){
//       if (!err) {
//         response['status'] = 'success';
//         response['data'] = newUser;
//         callback(null, response);
//       }
//       else {
//         response['status'] = 'errorDB';
//         response['data'] = newUser;
//         callback(null, response);
//       }
//     });
//   }
//   else{
//     response['status'] = 'Failed!, no recent data';
//     response['data'] = data;
//     callback(null, response)
//   }
// })

var url = "https://5d1defc6-7eab-43a5-a5aa-50e4fa6f33fa-bluemix:aceb9d10b345b03cdbfff719136c8cc1a905558071efb692fbc56b4a21fb199a@5d1defc6-7eab-43a5-a5aa-50e4fa6f33fa-bluemix.cloudantnosqldb.appdomain.cloud"


//setup database connection
var Cloudant = require('@cloudant/cloudant');
var cloudant = Cloudant(url);

var appliances = cloudant.db.use('appliance');
appliances.find({
      "selector":{
        "appliance_id":{
          "$eq":1
        }
      },
      "fields":[
        "_id",
        "_rev",
        "appliance_id",
        "appliance_list_id",
        "name",
        "manufacturer",
        "model",
        "power_consumption",
        "created_at"
      ],

      "sort":[
        {
          "appliance_id":"asc"
        }
      ]
    }, function(err, result){
      console.log(result)
    })
