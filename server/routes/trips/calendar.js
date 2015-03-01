'use strict';

var Trip = require('../../models/trip');

module.exports = {
  handler: function(request, reply) {
    Trip.findById(request.params.tripId, function(err, trip){
      trip.schedule(request.payload);
      trip.save(function(){
        reply(trip);
      });
    });
  }
};
