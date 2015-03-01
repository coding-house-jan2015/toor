$(document).ready(init);

function init(){
  $('.itinerary').click(clickDate);
  $('.add-suggestion').click(addSuggestion);
  $('#save').click(save);
  $('#complete').click(complete);
}

function complete(){
  $.ajax({
    url: '/trips/' + $('#trip-id').data('trip-id') + '/complete',
    type:'post',
    dataType: 'json',
    success: function(response){
    }
  });
}

function clickDate(){
  $('.itinerary').css('background-color', 'rgba(199, 199, 199, 0.3)').removeClass('selected');
  $(this).css('background-color', 'rgba(93, 93, 93, 0.3)').addClass('selected');

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
  var name = $(this).parent().parent().parent().find('.suggestion').text()
  var time = $(this).parent().find('input').val()
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
