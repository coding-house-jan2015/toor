'use strict';

$(document).ready(init);

function init(){
  $('#get-destinations').click(getDestinations);
}

function getDestinations(e){
  $.ajax({
    url: $('#destination').attr('action'),
    type:'post',
    dataType: 'json',
    data: $('#destination').serialize(),
    success: function(response){
      response.Destinations.forEach(function(d){
        var country = d.Destination.CountryName;
        var city = d.Destination.MetropolitanAreaName || d.Destination.CityName;
        $('#city').append('<option>' + city + ', ' + country + '</option>');
      });
    }
  });

  e.preventDefault();
}
