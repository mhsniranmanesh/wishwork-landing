var Email = $('#emailInput');

// $('#forgetPassword').click(function(){
//   emailCheckValidation();
// })
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

Email.on('input' , function(){
	var checkMail = this.value;
	if(!validateEmail(checkMail)){
		$('#EmailError').show();
        $('#eml').addClass('has-danger');
        $('#emailTextError').text('ایمیل شما نامعتبر می باشد.');
	}
	else{
		$('#EmailError').css('display' , 'none');
        $('#eml').removeClass('has-danger');
	}
});

function forgetPasswordSubmit(){
  $('.error-msg').remove();
  $('#errorBoxx').remove();
    var emailText = Email.val();
    if(emailText !=="" && validateEmail(emailText) === true){
        sendFormDataToServer();
    }

    else {
        if(emailText ===""){
            $('#EmailError').show();
            $('#eml').addClass('has-danger');
            $('#emailTextError').text('لطفا ایمیل خود را وارد کنید.')
        }
        if(validateEmail(emailText) === false && emailText !== ""){
            $('#EmailError').show();
            $('#eml').addClass('has-danger');
            $('#emailTextError').text('ایمیل شما نامعتبر است.')
        }
        $("#ErrorMessage").show();
    }
}

function sendFormDataToServer() {
  $('#loader').show();
    var data = {
        email: Email.val() ,
    }
    $.ajax({
        type:  "POST",
        url: '/api/v1/auth/forgot-password/',
        dataType:'json',
        data : data,
        success : function (data) {
            $('#loader').hide();
            $('#EmailofClientOrFreelancer').append(Email.val());
            $("#email-section").fadeOut(500, function() {
              $("#success-section").fadeIn(500, function() {});
            });
        },
        error : function (data) {
          console.log('ERRORORR:', data);
          $('#loader').hide();
          if(data.responseJSON.message){
            var err = data.responseJSON.message;
            if(err === "This field may not be blank."){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
          //    errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا ایمیل خود را وارد کنید'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#forgetPasswordForm').append(errorBox)
            }
            else if(err === 'Enter a valid email address.'){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
            //  errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا ایمیل خود را صحیح وارد کنید'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#forgetPasswordForm').append(errorBox)
            }
            else if(err === 'User does not exist'){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
            //  errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: متاسفانه اکانتی با ایمیل مورد نظر موجود نیست'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#forgetPasswordForm').append(errorBox);
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
              $('#forgetPasswordForm').append(errorBox);
            }

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
              $('#forgetPasswordForm').append(errorBox);
            }

        }
    });
}
