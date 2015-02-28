'use strict';

var mongoose = require('mongoose');
var request = require('request');
var Trip;

var tripSchema = mongoose.Schema({
    title: {type: String, required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

tripSchema.statics.search = function(o, cb) {
  var options = {
    method: 'POST',
    url: 'https://api.test.sabre.com/v1/auth/token',
    headers: {
      'Authorization': 'Basic VmpFNmVuaHJNakF4YTJRMmMyTTJkREF4T0RwRVJWWkRSVTVVUlZJNlJWaFU6VkVJNE5rRjNlSEk9',
      'Content-Type': 'application/x-www-form-urlencoded'
    },
    body: 'grant_type=client_credentials'
  };

  request(options, function(err, response, body){
    console.log('***err***', err);
    console.log('***body***', JSON.parse(body).access_token);
    var token = JSON.parse(body).access_token;

    // *****************************************
      var options = {
        method: 'GET',
        url: 'https://api.test.sabre.com/v1/shop/themes',
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };

      request(options, function(err, response, body){
        console.log('***err***', err);
        console.log('***body***', body);
      });
    // *****************************************
  });
};

Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
