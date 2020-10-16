// app.js

var express = require('express');
var app = express();
var cors = require('cors');

// Allow CORS
app.use(cors());
app.options('*', cors());
app.use(function(request, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use('/', express.static('public'));

// User
var userCreateController = require('./controllers/user/create');
app.use('/user/create', userCreateController);

var userReadIDController = require('./controllers/user/read-id');
app.use('/user/read/id', userReadIDController);

var userReadEmailController = require('./controllers/user/read-email');
app.use('/user/read/email', userReadEmailController);

// var userReadMeterController = require('./controllers/user/read-meter');
// app.use('/user/read/meter_id', userReadMeterController);

var userReadAccountController = require('./controllers/user/read-account');
app.use('/user/read/account_no', userReadAccountController);

var userUpdatePasswordController = require('./controllers/user/update');
app.use('/user/update/password', userUpdatePasswordController);

var userDeleteIDController = require('./controllers/user/delete-id');
app.use('/user/delete/id', userDeleteIDController);

// Meter
var meterCreateController = require('./controllers/meter/create');
app.use('/meter/create', meterCreateController);

var meterReadMeterController = require('./controllers/meter/read-meter');
app.use('/meter/read/id', meterReadMeterController);

var meterUpdateEnergyBalanceController = require('./controllers/meter/update-energy_balance');
app.use('/meter/update/energy_balance', meterUpdateEnergyBalanceController);

var meterDeleteIDController = require('./controllers/meter/delete-meter');
app.use('/meter/delete/id', meterDeleteIDController);

// Payment
var paymentCreateController = require('./controllers/payment/create');
app.use('/payment/create', paymentCreateController);

var paymentReadController = require('./controllers/payment/read');
app.use('/payment/read', paymentReadController);

var paymentUpdateController = require('./controllers/payment/update');
app.use('/payment/update', paymentUpdateController);

var paymentDeleteController = require('./controllers/payment/delete');
app.use('/payment/delete', paymentDeleteController);

// Readings
var readingsCreateController = require('./controllers/readings/create');
app.use('/readings/create', readingsCreateController);

var readingsReadController = require('./controllers/readings/read');
app.use('/readings/read', readingsReadController);

var readingsUpdateController = require('./controllers/readings/update');
app.use('/readings/update', readingsUpdateController);

var readingsDeleteController = require('./controllers/readings/delete');
app.use('/readings/delete', readingsDeleteController);

// Address
var addressCreateController = require('./controllers/address/create');
app.use('/address/create', addressCreateController);

var addressReadController = require('./controllers/address/read');
app.use('/address/read', addressReadController);

var addressUpdateController = require('./controllers/address/update');
app.use('/address/update', addressUpdateController);

var addressDeleteController = require('./controllers/address/delete');
app.use('/address/delete', addressDeleteController);

// appliance_list
var applianceListCreateController = require('./controllers/appliance_list/create');
app.use('/appliance_list/create', applianceListCreateController);

var applianceListReadController = require('./controllers/appliance_list/read');
app.use('/appliance_list/read', applianceListReadController);

var applianceListUpdateController = require('./controllers/appliance_list/update');
app.use('/appliance_list/update', applianceListUpdateController);

var applianceListDeleteController = require('./controllers/appliance_list/delete');
app.use('/appliance_list/delete', applianceListDeleteController);


// appliance
var applianceCreateController = require('./controllers/appliance/create');
app.use('/appliance/create', applianceCreateController);

var applianceReadController = require('./controllers/appliance/read');
app.use('/appliance/read', applianceReadController);

var applianceDeleteController = require('./controllers/appliance/delete');
app.use('/appliance/delete', applianceDeleteController);

var applianceUpdateController = require('./controllers/appliance/update');
app.use('/appliance/update', applianceUpdateController);


// disco
var discoCreateController = require('./controllers/disco/create');
app.use('/disco/create', discoCreateController);

var discoReadController = require('./controllers/disco/read');
app.use('/disco/read', discoReadController);

var discoDeleteController = require('./controllers/disco/delete');
app.use('/disco/delete', discoDeleteController);

var discoUpdateController = require('./controllers/disco/update');
app.use('/disco/update', discoUpdateController);

module.exports = app;
