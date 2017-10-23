Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}



//-------------------------------------------------
//                 Global Values
//-------------------------------------------------
var mobileNumber = $('#mobilePassInput');
var VEmail = $('#signupEmailInput');
var firstName = $('#signupFirstNameInput');
var lastName = $('#signupLastNameInput');
//--------------------------------------------------------

//         validation of characters of first name

//--------------------------------------------------------
function firstNameValidation(strr){

    if(strr.match(/^[\u0600-\u06FF\s]+$/)) {
        return "ok";
    }
    if(strr ===""){
        return "لطفا نام خود را وارد کنید.";
    }
    else
        return 'لطفا نام خود را فارسی وارد کنید.';
}
firstName.on('input' ,function () {
    var checkFirstName = this.value;
    if(firstNameValidation(checkFirstName) !== "ok" ) {
        $('#nameError').show();
        $('#fname').addClass('has-danger');
        $('#fNameTextError').text(firstNameValidation(checkFirstName));
    }
    else {
        $('#nameError').hide();
        $('#fname').removeClass('has-danger');
    }
});

//--------------------------------------------------------

//         validation of characters of last name

//--------------------------------------------------------

function lastNameValidation(strr){

    if(strr.match(/^[\u0600-\u06FF\s]+$/)) {
        return "ok";
    }
    if (strr ===""){
        return "لطفا نام خانوادگی خود را وارد کنید.";
    }
    else {
        return 'لطفا نام خانوادگی خود را فارسی وارد کنید.';
    }
}


lastName.on('input' ,function () {
    var checkLastName = this.value;
    if(lastNameValidation(checkLastName) !== "ok" ) {
        $('#LnameError').show();
        $('#lname').addClass('has-danger');
        $('#lNameTextError').text(lastNameValidation(checkLastName));
    }
    else {
        $('#LnameError').hide();
        $('#lname').removeClass('has-danger');
    }
});

VEmail.on('input' , function(){
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

//--------------------------------------------------------

//                validation  of Email

//--------------------------------------------------------
//valid char of Email
function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
VEmail.on('input' , function(){
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



//--------------------------------------------------------

//                validation of phone number

//--------------------------------------------------------
// validation of numbers
function isValidMobileNumber(str) {
    var numStr = persianToEnglish(str); // if persian change it to english number
    if(!isStrContainsJustDigit(numStr)){
        return "لطفا شماره ی خود را صحیح وارد کنید.";
    }
    if(numStr[0] != '0' && numStr[0] != '9'){
        return "لطفا شماره ی خود را صحیح وارد کنید.";
    }
    else if(numStr[0] === '0' && numStr.length !== 11){
        return "لطفا شماره ی خود را صحیح وارد کنید.";
    }
    else if(numStr[0] === '9' && numStr.length !== 10){
        return "لطفا شماره ی خود را صحیح وارد کنید.";
    }
    else if(numStr[0] === '+' && numStr.length !== 13 ){
      return "لطفا شماره ی خود را صحیح وارد کنید.";
    }
    return "ok";
}
//just contain digit for mobile number :
function isStrContainsJustDigit(str){
    for(var i=0; i < str.length ; i++){
        var ch = str.charCodeAt(i)
        if(48 > ch || ch > 57)
            return false;
    }
    return true;
}
//validation of number (again!)
var checkmobile = function(signUpForm) {

	var checkMobileSignUpForm = persianToEnglish(signUpForm);

    if(!isStrContainsJustDigit(checkMobileSignUpForm)){
        return 'لطفا شماره تماس را صحیح وارد نمایید.';
    }
    if(checkMobileSignUpForm[0] !== '0' && checkMobileSignUpForm[0] !== '9'){
        return 'لطفا شماره تماس را صحیح وارد نمایید.';
    }
    else if(checkMobileSignUpForm[0] === '0' && checkMobileSignUpForm.length !== 11){
        return 'لطفا شماره تماس را صحیح وارد نمایید.';
    }
    else if(checkMobileSignUpForm[0] === '9' && checkMobileSignUpForm.length !== 10){
        return 'لطفا شماره تماس را صحیح وارد نمایید.';
    }
    return 'ok';
}


mobileNumber.on('input',function(){
	var mobile = checkmobile(this.value)
	if(mobile !== 'ok'){

		$('#mobileError').show()
        $('#mobilenmbr').addClass('has-danger');
		$('#errorTextMobile').text(mobile)
	}
	else{
		$('#mobileError').hide();
        $('#mobilenmbr').removeClass('has-danger');
	}
});

//send mobilenumber to server with +98 at first
function sendMobileNumberToServer(strr){
    var numStr = persianToEnglish(strr);
    if (numStr.charAt(0) === '0'){
      numStr = numStr.substr(1);
      numStr = '+98' + numStr;
    }
    if(numStr.charAt(0) === '9'){
      numStr = '+98' + numStr ;
    }
    return numStr ;
}

//send mob number to server
function sendMobileNumberToServer(strr){
    var numStr = persianToEnglish(strr);
    if (numStr.charAt(0) === '0'){
      numStr = numStr.substr(1);
      numStr = '+98' + numStr;
    }
    if(numStr.charAt(0) === '9'){
      numStr = '+98' + numStr ;
    }
    return numStr ;
}

//----------------------------------------------------------------------------------------
									//Persian To English Numbers
//----------------------------------------------------------------------------------------
function persianToEnglish(value) {
  var newValue = "";
  for (var i = 0; i < value.length; i++) {
    var ch = value.charCodeAt(i);
    if (ch >= 1776 && ch <= 1785) // For Persian digits.
    {
      var newChar = ch - 1728;
      newValue = newValue + String.fromCharCode(newChar);
    } else if (ch >= 1632 && ch <= 1641) // For Arabic & Unix digits.
    {
      var newChar = ch - 1584;
      newValue = newValue + String.fromCharCode(newChar);
    } else
      newValue = newValue + String.fromCharCode(ch);
  }
  return newValue;
}


//--------------------------------------------------------------------------------------------------------------

// Go to the next page 2 = for freelancer singup-freelancer-skills.html/ for client signup-verification-msg.html

//---------------------------------------------------------------------------------------------------------------

function gotonext2(){
    var checkingMobile = isValidMobileNumber(mobileNumber.val());
    var checkingName = $('#signupFirstNameInput').val();
    var EMail = $('#signupEmailInput').val();
    var checkingLastName = $('#signupLastNameInput').val();
    var Name = checkingName + " " + checkingLastName;
    var sendMobileNumberForServer = sendMobileNumberToServer(mobileNumber.val())
  //  console.log( "SSS",Name);
    //storage Email of client for signup-verification-msg.html
    localStorage.setItem('EmailVerification' , EMail );
    localStorage.setItem("userFirstAndLastName" , Name);

    if(lastNameValidation(checkingLastName) === "ok" && firstNameValidation(checkingName)==="ok" && checkingLastName!=="" && checkingMobile === 'ok' && checkingName !== "" && EMail !=="" && validateEmail(EMail) === true){

        sendForm2DataToServer();
      //  window.location.href ='signup-freelancer-skills.html';
    }

    else if (checkingMobile !== 'ok' || checkingName==="" || EMail==="" || checkingLastName ===""){
        if(checkingName === "") {
            $('#nameError').show();
            $('#fname').addClass('has-danger');
            $('#fNameTextError').text(firstNameValidation(checkingName));
        }
        if(EMail ===""){
            $('#EmailError').show();
            $('#eml').addClass('has-danger');
            $('#emailTextError').text('لطفا ایمیل خود را وارد کنید.')
        }
        if(validateEmail(EMail) === false && EMail !== ""){
            $('#EmailError').show();
            $('#eml').addClass('has-danger');
            $('#emailTextError').text('ایمیل شما نامعتبر است.')
        }
        if(checkingMobile !== 'ok'){
            $('#mobileError').show()
            $('#mobilenmbr').addClass('has-danger');
            $('#mobileTextError').text(checkingMobile);
        }
        if(checkingLastName ===""){

            $('#LnameError').show();
            $('#lname').addClass('has-danger');
            $('#lNameTextError').text(lastNameValidation(checkingLastName));
        }
        $("#ErrorMessage").show();
    }
}

//------------------------------------------------------------------------------

//          Ajax to server to post all info of freelancer or client

//------------------------------------------------------------------------------

function sendForm2DataToServer() {
  var mobileNumberForSendToServer = sendMobileNumberToServer(mobileNumber.val());
  //console.log(mobileNumberForSendToServer);
    var username  = localStorage.getItem('username');
    var password = localStorage.getItem('password');
    var signUpDataPage2and1 = {
        username :username,
        password :  password,
        first_name : $('#signupFirstNameInput').val() ,
        last_name : $('#signupLastNameInput').val(),
        email: $('#signupEmailInput').val() ,
        phone_number : mobileNumberForSendToServer,
        is_freelancer : false ,
    }
    if (localStorage.getItem('registertype') === 'freelancer') {
        signUpDataPage2and1.is_freelancer = true;
    }
    else{
        signUpDataPage2and1.is_freelancer = false;
    }
  //  console.log(signUpDataPage2and1);
    $.ajax({
        type:  "POST",
        url: 'api/v1/profiles/',
        dataType:'json',
        data : signUpDataPage2and1,
        success : function (data) {
          //  console.log('mersii!' );
            window.location.href = "signup-verification-msg.html";

        },
        error : function (data) {
          $('.error-msg').remove();
          //  console.log('erorr' ,data);
          //  console.log('data.responseJSON',data.responseJSON);
            if(data.responseJSON.username && data.responseJSON.username.contains("This field may not be blank.")){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
          //    errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا نام کاربری خود را وارد کنید'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signUpForm').append(errorBox)
            }
            if(data.responseJSON.username && data.responseJSON.username.contains("Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters.")){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
          //    errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا نام کاربری خود را صحیح وارد کنید';
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signUpForm').append(errorBox);
            }
            if(data.responseJSON.password && data.responseJSON.password.contains("This field may not be blank.")){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
          //    errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا پسورد خود را صحیح وارد کنید'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signUpForm').append(errorBox)
            }
            if(data.responseJSON.password && data.responseJSON.password.contains("Ensure this field has at least 8 characters.")){
              $('.error-msg').remove();
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
          //    errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: پسورد شما باید حداقل شامل ۸ کاراکتر باشد'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signUpForm').append(errorBox);
            }
            if(data.responseJSON.first_name && data.responseJSON.first_name.contains("This field may not be blank.")){

              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
            //  errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا نام خود را وارد کنید';
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signUpForm').append(errorBox)
            }
              if(data.responseJSON.first_name && data.responseJSON.first_name.contains('Name must have only persian characters.')){
            //  console.log('persianError');
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
            //  errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا نام خود را صحیح وارد کنید'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signUpForm').append(errorBox)
            }
            if(data.responseJSON.last_name && data.responseJSON.last_name.contains("This field may not be blank.")){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
              //errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا نام خانوادگی خود را وارد کنید'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signUpForm').append(errorBox);
            }
            if(data.responseJSON.last_name && data.responseJSON.last_name.contains('Name must have only persian characters.')){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
            //  errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا نام خانوادگی خود را صحیح وارد کنید';
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signUpForm').append(errorBox);
            }

            if(data.responseJSON.phone_number && data.responseJSON.phone_number.contains("This field may not be blank.")){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
            //  errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا شماره تلفن همراه خود را وارد کنید';
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signUpForm').append(errorBox)
            }
            if(data.responseJSON.phone_number && data.responseJSON.phone_number.contains('Phone number must be in this format : +989xxxxxxxxx')){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
            //  errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: لطفا شماره تلفن همراه خود را به صورت صحیح وارد کنید'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signUpForm').append(errorBox)
            }
            if(data.responseJSON.email && data.responseJSON.email.contains("This field may not be blank.")){
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
              $('#signUpForm').append(errorBox)
            }
            if(data.responseJSON.email && data.responseJSON.email.contains('Enter a valid email address.')){
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
              $('#signUpForm').append(errorBox)
            }
            if(data.responseJSON.email && data.responseJSON.email.contains('user with this email address already exists.')){
              $('.error-msg').remove();
              var errorCross = document.createElement('i');
              errorCross.setAttribute('class', 'fa fa-times-circle');
              errorCross.setAttribute('aria-hidden', 'true');
              var errorBox = document.createElement('span');
            //  errorBox.id = 'errorBox';
              errorBox.setAttribute('class' , 'error-msg');
              errorBox.appendChild(errorCross);
              var errorMessage = document.createElement('span');
              errorMessage.innerHTML = 'خطا: اکانت با این ایمیل موجود است'
              errorBox.appendChild(errorMessage);
              $(errorMessage).prepend(errorCross);
              $('#signup-form').append(errorBox);
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
              $('#signup-form').append(errorBox);
            }

        }
    });
}
