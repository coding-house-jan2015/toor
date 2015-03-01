'use strict';

var Trip = require('../../models/trip');
var Message = require('../../models/message');
var User = require('../../models/user');

module.exports = {
  handler: function(request, reply) {
    request.payload.originAirport = request.payload.originAirport.toUpperCase();
    request.payload.userId = request.auth.credentials._id;
    var trip = new Trip(request.payload);
    trip.save(function(){
      User.findById(request.payload.userId, function(err, user) {
        Message.trip(user.email, trip, function(e, result) {
          console.log('*******USEREMAIL: ', user.email);
          console.log('*******TRIP: ', trip);
          console.log('*******RESULT: ', result);
          reply({url:'/trips/' + trip._id + '/itinerary'});
        });
      });
    });
  }
};
