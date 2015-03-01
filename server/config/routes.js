'use strict';

module.exports = [
  {method: 'get', path: '/{param*}', config: require('../routes/general/static')},
  {method: 'get', path: '/', config: require('../routes/general/home')},
  {method: 'get', path: '/register', config: require('../routes/users/register')},
  {method: 'post', path: '/users', config: require('../routes/users/create')},
  {method: 'get', path: '/login', config: require('../routes/users/login')},
  {method: 'post', path: '/users/authenticate', config: require('../routes/users/authenticate')},
  {method: 'post', path: '/logout', config: require('../routes/users/logout')},

  {method: 'get', path: '/trips/new', config: require('../routes/trips/new')},
  {method: 'post', path: '/trips/flights', config: require('../routes/trips/flights')},
  {method: 'post', path: '/trips', config: require('../routes/trips/create')},
  {method: 'get', path: '/trips/{tripId}/itinerary', config: require('../routes/trips/show')},
  {method: 'get', path: '/trips', config: require('../routes/trips/index')},
  {method: 'post', path: '/trips/{tripId}/calendar', config: require('../routes/trips/calendar')},
  {method: 'get', path: '/trips/{tripId}/fetch', config: require('../routes/trips/fetch')},
  {method: 'post', path: '/trips/{tripId}/complete', config: require('../routes/trips/complete')}
];
