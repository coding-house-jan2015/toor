'use strict';

module.exports = function validate(form) {
  var e = form.elements;

  if(e['password'].value !== e['confirmPass'].value) {
    alert('Your Passwords do not match. Please try again.');
    return false;
  }
  return true;
};
