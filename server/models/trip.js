'use strict';

var mongoose = require('mongoose');
var request = require('request');
var async = require('async');
var Twitter = require('twitter');
var _ = require('lodash');
var moment = require('moment');
var Trip;

var tripSchema = mongoose.Schema({
    title: {type: String, required: true},
    hashtag: {type: String, required: true},
    originAirport: {type: String, required: true},
    destinationAirport: {type: String, required: true},
    destinationCity: {type: String, required: true},
    departureDate: {type: Date, required: true},
    returnDate: {type: Date, required: true},
    itinerary: [mongoose.Schema.Types.Mixed],
    theme: {type: String, required: true},
    fare: {type: Number, required: true},
    userId: {type: mongoose.Schema.ObjectId, ref: 'User', required: true},
    createdAt: {type: Date, default: Date.now, required: true}
});

tripSchema.methods.getSchedule = function(date){
  var self = this;

  var itinerary = _.find(self.itinerary, function(i){
    return i.date === date;
  });

  return itinerary;
};

tripSchema.methods.schedule = function(o){
  var self = this;

  var itinerary = _.find(self.itinerary, function(i){
    return i.date === o.date;
  });

  itinerary.schedule = o.schedule;
  this.markModified('itinerary');
};

tripSchema.methods.suggestions = function(user, cb){
  var self = this;

  var client = new Twitter({
    consumer_key: process.env.TWITTER_CONSUMER_KEY,
    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
    access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
    access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
  });

  client.get('/search/tweets', {q: '@' + user.twitter + ' #' +self.hashtag, count: 100, result_type:'recent'}, function(error, result, response) {
    var tweets = result ? result.statuses : [];
    var words = tweets.map(function(t){
      return t.text.match(/(@[\w]+)|(#[\w]+)/g);
    });

    words = _.flatten(words);

    var histogram = {};
    words.forEach(function(w){
      if((w !== '@' + user.twitter) && (w !== '#' + self.hashtag)){
        histogram[w] = histogram[w] + 1 || 1;
      }
    });

    histogram = _.map(histogram, function(v, k){
      return {suggestion:k, count:v};
    });

    histogram = _.sortBy(histogram, 'count').reverse();
    cb(histogram);
  });
};

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
      });
  });
};

tripSchema.pre('save', function(next){
  if(this.isNew){
    var begin = moment(this.departureDate);
    var end = moment(this.returnDate);
    var days = end.diff(begin, 'day');

    for(var i = 0; i < days; i++){
      this.itinerary.push({date:begin.format('MM-DD-YYYY')});
      begin.add(1, 'day');
    }
  }

  next();
});

Trip = mongoose.model('Trip', tripSchema);
module.exports = Trip;
