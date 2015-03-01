'use strict';

var Trip = require('../../models/trip');

module.exports = {
  handler: function(request, reply) {
    Trip.findById(request.params.tripId, function(err, trip){
      var schedule = trip.getSchedule(request.query.tripDate);
      reply(schedule);
    });
  }
};
