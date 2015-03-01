'use strict';

var mongoose = require('mongoose');
var request = require('request');
var async = require('async');
var Trip;

var tripSchema = mongoose.Schema({
    title: {type: String, required: true},
    originAirport: {type: String, required: true},
    destinationAirport: {type: String, required: true},
    destinationCity: {type: String, required: true},
    departureDate: {type: Date, required: true},
    returnDate: {type: Date, required: true},
    theme: {type: String, required: true},
    fare: {type: Number, required: true},
    userId: {type: mongoose.Schema.ObjectId, ref: 'User', require: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

tripSchema.statics.flights = function(o, cb) {
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
    var token = JSON.parse(body).access_token;
      var options = {
        method: 'GET',
        url: 'https://api.test.sabre.com/v1/shop/flights/fares?origin=' + o.originAirport + '&departuredate=' + o.departureDate + '&returndate=' + o.returnDate + '&theme=' + o.theme,
        headers: {
          'Authorization': 'Bearer ' + token
        }
      };

      request(options, function(err, response, body){
        body = JSON.parse(body);
        var fares = body.FareInfo || [];

        async.map(fares, function(fare, cb){
          request('http://airportcode.riobard.com/airport/'+fare.DestinationLocation+'?fmt=JSON', function(err, response, body){
            body = JSON.parse(body);
            fare.DestinationCity = body ? body.location : '';
            cb(null, fare);
          });
        }, function(err, results){
          cb({results:results});
        });

        // ***************************
      });
  });
};

Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
