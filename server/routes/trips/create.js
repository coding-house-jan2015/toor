'use strict';

var Trip = require('../../models/trip');
var _ = require('lodash');

module.exports = {
  handler: function(request, reply) {
    request.payload.originAirport = request.payload.originAirport.toUpperCase();
    request.payload.userId = request.auth.credentials._id;
    request.payload.hashtag = _.snakeCase(request.payload.title);
    var trip = new Trip(request.payload);
    trip.save(function(){
      reply({url:'/trips/' + trip._id + '/itinerary'});
    });
  }
};
