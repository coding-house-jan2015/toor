$(document).ready(init);

function init(){
  $('.itinerary').click(clickDate);
  $('.add-suggestion').click(addSuggestion);
  $('#save').click(save);
}

function clickDate(){
  $('.itinerary').css('background-color', 'white').removeClass('selected');
  $(this).css('background-color', 'grey').addClass('selected');

  $.ajax({
    url: '/trips/' + $('#trip-id').data('trip-id') + '/fetch?tripDate=' + $(this).text(),
    type:'get',
    dataType: 'json',
    success: function(response){
      var activities = response.schedule || [];
      $('#schedule').empty();

      activities.forEach(function(a){
        $('#schedule').append('<div class="schedule"><div class="name">'+a.name+'</div><div class="time">'+a.time+'</div></div>');  
      });
    }
  });
}

function addSuggestion(){
  var name = $(this).siblings('h6').text();
  var time = $(this).siblings('input').val();
  $('#schedule').append('<div class="schedule"><div class="name">'+name+'</div><div class="time">'+time+'</div></div>');
}

function save(){
  var date = $('.selected').text();
  var schedule = $('.schedule').toArray().map(function(s){
    var name = $(s).find('.name').text();
    var time = $(s).find('.time').text();
    return {name:name, time:time};
  });

  $.ajax({
    url: '/trips/' + $('#trip-id').data('trip-id') + '/calendar',
    type:'post',
    dataType: 'json',
    contentType: 'application/json; charset=utf-8',
    data: JSON.stringify({date:date, schedule:schedule}),
    success: function(response){
    }
  });
}
