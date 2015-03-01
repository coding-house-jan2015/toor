'use strict';

var Trip = require('../../models/trip');
var moment = require('moment');

module.exports = {
  handler: function(request, reply) {
    Trip.find({userId:request.auth.credentials._id}, function(err, trips){
      console.log(trips[0]);
      trips.map(function(trip) {
        trip.departureDate = moment(trip.departureDate).format('LL');
        trip.returnDate = moment(trip.returnDate).format('LL');
      });
      reply.view('templates/trips/index', {trips:trips});
    });
  }
};
