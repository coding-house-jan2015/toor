$(document).ready(init);

function init(){
  $('#get-flights').click(getFlights);
  $('.flights').on('click', '.flight', createTrip);
}

function getFlights(e){
  $.ajax({
    url: $('#flights').attr('action'),
    type:'post',
    dataType: 'json',
    data: $('#flights').serialize(),
    success: function(response){
      response.results.forEach(function(f){
        var html = '<div class="flight"><p class="fare">'+f.LowestFare+'</p><p class="airport">'+f.DestinationLocation+'</p><p class="city">'+f.DestinationCity+'</p></div>';
        $('.flights').append(html);
      });
    }
  });

  e.preventDefault();
}

function createTrip(){
 var data = $('#flights').serialize();
 var fare = $(this).find('.fare').text();
 var airport = $(this).find('.airport').text();
 var city = $(this).find('.city').text();
 data += '&fare=' + fare + '&destinationAirport=' + airport + '&destinationCity=' + city;

 $.ajax({
   url: '/trips',
   type:'post',
   dataType: 'json',
   data: data,
   success: function(response){
     window.location = response.url;
   }
 });
}
