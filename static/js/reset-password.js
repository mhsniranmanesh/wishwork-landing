var password = $('#passwordInput');
var repeatPassword = $('#repeatPasswordInput');
var login_token;

Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function() {
  var uid = getParameterByName('u');
  var token = getParameterByName('t');
  $.ajax({
    type: "POST",
    url: '/api/v1/auth/check-password-token/' + uid + '/' + token + '/',
    data: {},
    success: function(result) {
      $("#processing").fadeOut(500, function() {
        $("#password-form").fadeIn(500, function() {});
      });
      login_token = result.token;
      localStorage.setItem('current_login_token', result.token)
    },
    error: function(err) {
      console.log('Error: ', err);
      $("#processing").fadeOut(500, function() {
        $("#invalid-token").fadeIn(500, function() {});
      });
    }
  });
});


var checkPassword = function(passText){
	if (passText.length < 8 && passText.search(/\dd/) == -1 && passText.search(/[A-Z]/) == -1){
		return "پسورد شما باید حداقل ۸ حرف شامل حروف انگلیسی و اعداد ، علامت های متعارف مانند ( ـ ) باشد ";
	}
	else if (passText.length < 8)
	{
    return "پسورد شما باید حداقل ۸ حرف شامل حروف انگلیسی و اعداد ، علامت های متعارف مانند ( ـ ) باشد ";
    }
	else if (passText.length > 50)
	 {
         return "پسورد شما باید حداکثر شامل ۵۰ حرف باشد";

       }
  else if (passText.search(/[!\#\$\%\^\&\*\(\)\+]/) != -1) {
         return "پسورد شما دارای نماد های نامعتبر است";
    }
    if(passText.search(/[\u0600-\u06FF]/) != -1) {
        return "لطفا پسورد خود را انگلیسی وارد نمایید!";
    }
  else return "okpass";
  }

// on keypress error
  password.on('input' ,function(){
  	var passStatus = checkPassword(this.value);
  	if (passStatus === "okpass"){
  		$('#form-control-feedback-pass').hide();
      $('#password').removeClass('has-danger');
    }
  	else if(passStatus === "لطفا پسورد خود را انگلیسی وارد نمایید!"){
  		$('#form-control-feedback-pass').show();
      $('#passwordTextError').text(passStatus);
  		$('#password').addClass('has-danger');
    }
    else if(passStatus === "پسورد شما دارای نماد های نامعتبر است"){
      $('#passwordTextError').text(passStatus);
      $('#form-control-feedback-pass').show();
      $('#password').addClass('has-danger');
    }
    else{
      $('#passwordTextError').text(passStatus);
      $('#form-control-feedback-pass').show();
      $('#password').addClass('has-danger');
    }
  });

  function PasswordResetSubmit(){
      var validityPass = checkPassword(password.val());
      var validiryRepeatPass = (password.val() === repeatPassword.val())

      if(validityPass === "okpass" && validiryRepeatPass === true){
          sendPasswordToServer();
      }
      else if(validityPass !== "okpass"){
          $('#error-msg').show();
          $('#error-msg-text').text('لطفا پسورد خود را صحیح وارد کنید.');
          $('#password').addClass('has-danger');
      }
      else if(validityPass !== "okpass"){
          $('#error-msg').show();
          $('#error-msg-text').text('لطفا پسورد خود را صحیح وارد کنید.');
          $('#password').addClass('has-danger');
      }
      else if(validiryRepeatPass === false){
          $('#error-msg').show();
          $('#error-msg-text').text('رمز عبور با تکرار آن مطابقت ندارد');
          $('#password').addClass('has-danger');
      }
  }

  //------------------------------------------------------------------------------

  //          Ajax to server to get validation or existance of user info

  //------------------------------------------------------------------------------

function sendPasswordToServer() {
      $('#loader').show();
      $('#errorBox').remove();
      var data = {'password' : password.val()}
      $.ajax({
          type : "POST",
          url : '/api/v1/auth/reset-password/',
          data: data,
          headers: {"Authorization": "JWT " + login_token},
          success : function (result) {
            $('#loader').hide();
            $("#password-form").fadeOut(500, function() {
              $("#success").fadeIn(500, function() {
                window.location.href = "/dashboard/";
              });
            });
          },
          error : function(err) {
              console.log(err)
              $('#loader').hide();
              if(err.responseJSON && err.responseJSON.password && err.responseJSON.password.contains(
                "Ensure this field has at least 8 characters.")){
                  $('#error-msg').show();
                  $('#error-msg-text').text('لطفا پسورد خود را صحیح وارد کنید.');
                  $('#password').addClass('has-danger');
              }
              else {
                  $('#error-msg').show();
                  $('#error-msg-text').text('خطا در اتصال به سرور، لطفا مجدد تلاش کنید');
                  $('#password').addClass('has-danger');
              }
          }
      });
  }
