//-------------------------------------------------
//                 Global Values
//-------------------------------------------------
var username = $('#signupUsernameInput');
var password = $('#signupPassInput');

//----------------------------------------------------------------------------

//         do not permission to space between characters in username

//----------------------------------------------------------------------------


$(function() {
    $('#signupUsernameInput').on('keypress', function(e) {
        if (e.which == 32)
            return false;
    });
});
//------------------------------------------------------

//         validation of characters of username

//------------------------------------------------------
var checkUserName = function (userText){
  if(userText.match(/^[0-9a-zA-Z-_]+$/)) {
      return "okusername";
    }
    if (userText.search(/[!\@\#\$\%\^\&\*\(\)\+\;\']/) != -1)
        return "نام کاربری شما دارای نماد های نامعتبر است";
    if(userText.length > 50){
      return "نام کاربری شما باید حداکثر شامل ۵۰ حرف باشد"
    }
    if(userText === ""){
        return "لطفا نام کاربری خود را وارد کنید."
    }
    else{
        return " نام کاربری شما دارای نماد های نامعتبر است(نام کاربری باید تنها شامل حروف انگلیسی باشد";
      }
}

// username on keypress error
username.on('input' ,function (){
  var usnm = this.value;
	if(this.value !== undefined) {
        var UserNameX = checkUserName(usnm);

        if (UserNameX !== "okusername") {
            $('#form-control-feedback-username').show()
            $('#userNameTextError').text(UserNameX);
            $('#usn').addClass('has-danger');
        }
        else {
            $("#form-control-feedback-username").hide();
            $('#usn').removeClass('has-danger');
        }
    }
});


//------------------------------------------------------

//         validation of characters of password

//------------------------------------------------------

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
  else if (passText.search(/[!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
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
  	if (passStatus === "okpass")
  	{
      // if it was ok remove danger !

  		$('#form-control-feedback-pass').hide();
          $('#pas').removeClass('has-danger');

      }
  	else if(passStatus === "لطفا پسورد خود را انگلیسی وارد نمایید!")
  	{

  		$('#form-control-feedback-pass').show();
      $('#passwordTextError').text(passStatus);
  		$('#pas').addClass('has-danger');

      }
      else if(passStatus === "پسورد شما دارای نماد های نامعتبر است"){
          $('#passwordTextError').text(passStatus);
          $('#form-control-feedback-pass').show();
          $('#pas').addClass('has-danger');
      }
      else{
          $('#passwordTextError').text(passStatus);
          $('#form-control-feedback-pass').show();
          $('#pas').addClass('has-danger');
      }


  });

  //------------------------------------------------------------------------------

  //             go to next : from signup-user-pass To signup-form

  //------------------------------------------------------------------------------

  function gotonext(){
      var validityPass = checkPassword(password.val());
      var validityUser = checkUserName(username.val());
      var CheckBox = document.getElementById("checkBox");
      localStorage.setItem('username' , username.val());
      localStorage.setItem('password' , password.val());
      if(username.val() ===""){
          validityUser = "EmptyUsername";
          //console.log( 'X',validityPass , validityUser , CheckBox)
      }

      if(validityPass === "okpass" && validityUser ==="okusername" && CheckBox.checked === true){
          checkUserNameAndPasswordValidation();
        }
      else {
          if(CheckBox.checked !== true && validityPass !== "okpass" && validityUser ==="okusername"){
              $('#error-msg').show();
              $('#pas').addClass('has-danger');
              $('#passwordTextError').text(validityPass);
              $('#error-msg-text').text('لطفا پسورد خود را صحیح وارد کنید و قوانین را تایید کنید.');
            }
          if (CheckBox.checked !== true && validityUser ==="okusername" && validityPass === "okpass"){
              $('#error-msg').show();
              $('#error-msg-text').text('لطفا قوانین را تایید کنید.').css('display' , 'block');
            }
          if(CheckBox.checked !== true && validityUser !=="okusername" && validityPass === "okpass"){
              $('#error-msg').show()
              $('#error-msg-text').text('لطفا نام کاربری را صحیح وارد کنید و قوانین را تایید کنید.').css('display' , 'block');
              $('#usn').addClass('has-danger');
            }
          if (CheckBox.checked === true && validityUser !=="okusername" && validityPass !== "okpass"){
              $('#error-msg').show()
              $('#error-msg-text').text('لطفا نام کاربری و پسورد خود را صحیح وارد کنید.').css('display' , 'block');
              $('#pas').addClass('has-danger');
              $('#usn').addClass('has-danger');
            }
          if(CheckBox.checked === true && validityUser ==="okusername" && validityPass !== "okpass"){
              $('#error-msg').show();
              $('#error-msg-text').text('لطفا پسورد خود را صحیح وارد کنید.');
              $('#pas').addClass('has-danger');
            }
          if (CheckBox.checked !== true && validityUser !=="okusername" && validityPass !== "okpass"){
              $('#error-msg').show();
              $('#error-msg-text').text('انتخاب نام کاربری و رمز عبور مناسب و همچنین تایید قوانین الزامی است!').css('display' , 'block');
              $('#pas').addClass('has-danger');
              $('#usn').addClass('has-danger');
            }
          if(CheckBox.checked === true && validityUser !=="okusername" && validityPass === "okpass"){
              $('#error-msg').show();
              $('#error-msg-text').text('لطفا نام کاربری را صحیح وارد کنید.');
              $('#usn').addClass('has-danger');
          }
      }
  }

  //------------------------------------------------------------------------------

  //          Ajax to server to get validation or existance of user info

  //------------------------------------------------------------------------------

function checkUserNameAndPasswordValidation() {
      $('#loader').show();
      var validationURL = '/api/v1/profiles/userexists/' + $('#signupUsernameInput').val();
      $('#errorBox').remove();
      var signUpDataPage2and1 = {
          username: $('#signupUsernameInput').val(),
          password: $('#signupPassInput').val(),
      }
      $.ajax({
          type : "GET",
          url : validationURL,
          data: signUpDataPage2and1,
          success : function (result) {
            $('#errorBoxx').remove();
            $('#loader').hide();
            if(result.username === "A user with that username already exists."){
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
              errorBox.setAttribute('id' ,'errorBoxx');
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: این نام کاربری قبلا ثبت شده است'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signup-form').append(errorBox)
            }
            else
               window.location.href = "/signup/form/";


      },
          error : function(err) {
              $('#loader').hide();
            //  console.log('User Exists:', err);
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
              errorBox.setAttribute('id' ,'errorBoxx');
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا در اتصال به سرور ، لطفا مجدد تلاش کنید.'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signup-form').append(errorBox)

          }
      });
  }
