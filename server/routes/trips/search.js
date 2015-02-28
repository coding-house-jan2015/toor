'use strict';

var Trip = require('../../models/trip');

module.exports = {
  handler: function(request, reply) {
    Trip.search(function(data){
      console.log(data);
      reply();
    });
  }
};
