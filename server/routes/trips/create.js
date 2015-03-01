'use strict';

var Trip = require('../../models/trip');

module.exports = {
  handler: function(request, reply) {
    request.payload.originAirport = request.payload.originAirport.toUpperCase();
    request.payload.userId = request.auth.credentials._id;
    var trip = new Trip(request.payload);
    trip.save(function(){
      reply({url:'/trips/' + trip._id + '/itinerary'});
    });
  }
};
