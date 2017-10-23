userName = $('#loginUserNameInput');
pass = $('#loginPassInput');
localStorage.getItem
function LogIn(){
  var data = {
    username : userName,
    password : pass,
  }
  $.ajax({
    type : "GET",
    url: 'api/v1/auth/token/obtain/',
    data: data,
    success : function (result){
      localStorage.setItem('current_login_token' , result.token);
      window.location.href = "after-signin.html";
    },
    error : function (result) {
      if(result.username === "This field is required."){
        $('#errorBox').remove();
        var errorCross = document.createElement('i');
        errorCross.setAttribute('class', 'fa fa-times-circle');
        errorCross.setAttribute('aria-hidden', 'true');
        var errorBox = document.createElement('span');
        errorBox.id = 'errorBox';
        errorBox.setAttribute('class' , 'error-msg');
        errorBox.appendChild(errorCross);
        var errorMessage = document.createElement('span');
        errorMessage.innerHTML = 'خطا: لطفا نام کاربری خود را وارد کنید'
        errorBox.appendChild(errorMessage);
        $(errorMessage).prepend(errorCross);
        $('#signUpForm').append(errorBox);
      }
      if(result.password === "This field is required."){
        $('#errorBox').remove();
        var errorCross = document.createElement('i');
        errorCross.setAttribute('class', 'fa fa-times-circle');
        errorCross.setAttribute('aria-hidden', 'true');
        var errorBox = document.createElement('span');
        errorBox.id = 'errorBox';
        errorBox.setAttribute('class' , 'error-msg');
        errorBox.appendChild(errorCross);
        var errorMessage = document.createElement('span');
        errorMessage.innerHTML = 'خطا: لطفا پسورد خود را وارد کنید'
        errorBox.appendChild(errorMessage);
        $(errorMessage).prepend(errorCross);
        $('#signUpForm').append(errorBox);
      }
      if(result.non_field_errors === "Unable to log in with provided credentials."){
        $('#errorBox').remove();
        var errorCross = document.createElement('i');
        errorCross.setAttribute('class', 'fa fa-times-circle');
        errorCross.setAttribute('aria-hidden', 'true');
        var errorBox = document.createElement('span');
        errorBox.id = 'errorBox';
        errorBox.setAttribute('class' , 'error-msg');
        errorBox.appendChild(errorCross);
        var errorMessage = document.createElement('span');
        errorMessage.innerHTML = 'خطا: رمز عبور و یا نام کاربری شما صحیح نمی باشد.'
        errorBox.appendChild(errorMessage);
        $(errorMessage).prepend(errorCross);
        $('#signUpForm').append(errorBox);
      }
      else {
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
    }
  });
}
