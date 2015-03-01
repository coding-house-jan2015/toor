'use strict';

var Trip = require('../../models/trip');

module.exports = {
  handler: function(request, reply) {
    Trip.findById(request.params.tripId, function(err, trip){
      trip.isComplete = true;
      trip.save(function(){
        reply(trip);
      })
    });
  }
};
