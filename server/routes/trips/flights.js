'use strict';

var Trip = require('../../models/trip');

module.exports = {
  handler: function(request, reply) {
    Trip.flights(request.payload, function(data){
      reply(data);
    });
  }
};
