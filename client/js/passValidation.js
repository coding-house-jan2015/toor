$(document).ready(init);

function init(){
  $('#password').change( validatePassword );
  $('#confirmPass').keyup( validatePassword );
}

var password = document.getElementById("password");
var confirm_password = document.getElementById("confirmPass");

function validatePassword(){
  if(password.value != confirm_password.value) {
    console.log('SHIT IS NOT RIGHT');
    $('#inputError').removeClass('form-group has-success has-feedback');
    $('#inputError').addClass('form-group has-error has-feedback');
    $('#checkIcon').css({"visibility": "hidden"});
    $('#xIcon').css({"visibility": "visible"});
    $('#register').addClass('disabled');
  } else {
    console.log('SHIT IS RIGHT');
    $('#inputError').removeClass('form-group has-error has-feedback');
    $('#inputError').addClass('form-group has-success has-feedback');
    $('#xIcon').css({"visibility": "hidden"});
    $('#checkIcon').css({"visibility": "visible"});
    $('#register').removeClass('disabled');
  }
}
