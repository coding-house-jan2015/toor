'use strict';

var User = require('../../models/user');
var Trip = require('../../models/trip');
var Message = require('../../models/message');
var _ = require('lodash');

module.exports = {
  handler: function(request, reply) {
    request.payload.originAirport = request.payload.originAirport.toUpperCase();
    request.payload.userId = request.auth.credentials._id;
    request.payload.hashtag = _.snakeCase(request.payload.title);
    var trip = new Trip(request.payload);
    trip.save(function(){
      User.findById(request.payload.userId, function(err, user) {
        Message.trip(user.email, trip, function(e, result) {
          reply({url:'/trips/' + trip._id + '/itinerary'});
        });
      });
    });
  }
};
