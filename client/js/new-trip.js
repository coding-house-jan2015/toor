
$(document).ready(init);

function init(){
  $('#get-flights').click(getFlights);
  $('.flights').on('click', '.packages', createTrip);
}

function getFlights(e){
  $.ajax({
    url: $('#flights').attr('action'),
    type:'post',
    dataType: 'json',
    data: $('#flights').serialize(),
    success: function(response){
      $('.flights').empty();
      response.results.forEach(function(f){
        var html = '<div class="col-sm-4"><div class="row"><div class="col-sm-offset-1 col-sm-10 col-xs-offset-2 col-xs-8 packages"><p class="fare">'+f.LowestFare.toFixed(0)+'</p><p class="airport">'+f.DestinationLocation+'</p><p class="city">'+f.DestinationCity+'</p></div></div></div>';
        $('.flights').append(html);
        $('.loader').css({"visibility": "hidden"});
      });
    }
  });
  $('.loader').css("visibility", "visible");
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
