//-------------------------------------------------
//                 Global Values
//-------------------------------------------------
var password = $('#signupPassInput');
var username = $('#signupUsernameInput');
var mobileNumber = $('#mobilePassInput');
var VEmail = $('#signupEmailInput');
var firstName = $('#signupFirstNameInput');
var lastName = $('#signupLastNameInput');
//----------------------------------------

//         Freelancer Or Client

//-----------------------------------------


var readyFunc = function(client , freelancer){
    $("#btn_sign_up_freelancer").click(function(){
        //If he was freelancer
      	localStorage.setItem('registertype' , 'freelancer' )
		window.location.href = "signup-user-pass.html";


	});
};


$(document).ready(readyFunc);
$(document).ready(function(client , freelancer){
	$('#btn_sign_up_client').click(function(){
    //If he was client
	localStorage.setItem('registertype' , 'client' )
		window.location.href = "signup-user-pass.html" ;
	});
});




//---------------------------------------

// Go to the next page = signup-form.html

//---------------------------------------




var form = $('#signup-form');


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
	// else if (passText.search(/\d/) == -1) {
 	// 	return "پسورد شما باید حداقل شامل یک عدد باشد";
	// }
	// else if (passText.search(/[A-Z]/) == -1) {
     //    return "پسورد شما باید حداقل شامل یک حرف انگلیسی بزرگ باشد";
    //
    // }
	else if (passText.search(/[!\@\#\$\%\^\&\*\(\)\_\+]/) != -1) {
         return "پسورد شما دارای نماد های نامعتبر است";
    }
    if(passText.search(/[\u0600-\u06FF]/) != -1) {
        return "لطفا پسورد خود را انگلیسی وارد نمایید!";
    }
	else return "okpass";
}

password.on('input' ,function(){
	var passStatus = checkPassword(this.value);
	if (passStatus === "okpass")
	{

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
var checkUserName = function (userText){
    console.log(userText);
    if (userText.search(/[!\@\#\$\%\^\&\*\(\)\+\;\']/) != -1)
        return "نام کاربری شما دارای نماد های نامعتبر است";
    if(userText.length > 50){
      return "نام کاربری شما باید حداکثر شامل ۵۰ حرف باشد"
    }
    if(userText === ""){
        return "لطفا نام کاربری خود را وارد کنید."
    }
    if(userText.match(/^[0-9a-zA-Z]/)){
        return "okusername";
      }
    else
        return " نام کاربری شما دارای نماد های نامعتبر است(نام کاربری باید تنها شامل حروف انگلیسی باشد";

}

$(function() {
    $('#signupUsernameInput').on('keypress', function(e) {
        if (e.which == 32)
            return false;
    });
});


username.on('input' ,function (){
	if(this.value !== undefined) {
        var UserNameX = checkUserName(this.value)

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
function firstNameValidation(strr){

    if(strr.match(/^[\u0600-\u06FF]/)) {
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

function lastNameValidation(strr){

    if(strr.match(/^[\u0600-\u06FF]/)) {
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

function isValidMobileNumber(str) {
    var numStr = persianToEnglish(str);
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




function isStrContainsJustDigit(str){
    for(var i=0; i < str.length ; i++){
        var ch = str.charCodeAt(i)
        if(48 > ch || ch > 57)
            return false;
    }
    return true;
}

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

})




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
        console.log( 'X',validityPass , validityUser , CheckBox)
    }

    if(validityPass === "okpass" && validityUser ==="okusername" && CheckBox.checked === true){
      //  window.location.href = "signup-form.html";
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





//-----------------------------------------------------------------
                    // AJAX For SignUp/In Wish-Work
//-----------------------------------------------------------------





//
// $('#submit-signup-btn').click(function(){
//     console.log("SUBMITTTT");
//     gotonext();
// });

// function sendForm1DataToServer() {
//     var signUpDataPage1 = {
//         username: $('#signupUsernameInput').val(),
//         password: $('#signupPassInput').val(),
//     }
//     $.ajax({
//         type:  "POST",
//         url: 'http://rest.learncode.academy/api/learncode/amirh',
//         dataType:'json',
//         data : signUpDataPage1,
//         success : function (data) {
//             console.log('mersi!', data);
//           //  window.location.href = "signup-form.html";
//
//         },
//         error : function (data) {
//             console.log('erorr');
//         }
//     });
// }

// $("#submit-signup-btn2").click(function () {
//     gotonext2();
// });


function sendForm2DataToServer() {
  var mobileNumberForSendToServer = sendMobileNumberToServer(mobileNumber.val());
  console.log(mobileNumberForSendToServer);
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
    console.log(signUpDataPage2and1);
    $.ajax({
        type:  "POST",
        url: 'api/v1/profiles/',
        dataType:'json',
        data : signUpDataPage2and1,
        success : function (data) {
            console.log('mersii!' );
            window.location.href = "signup-verification-msg.html";

        },
        error : function (data) {
            console.log('erorr' ,data);

            if(data.username === "This field may not be blank."){
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
            else if(data.username === "Enter a valid username. This value may contain only letters, numbers, and @/./+/-/_ characters."){
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
            if(data.password === "This field may not be blank."){
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
            else if(data.password === "Ensure this field has at least 8 characters."){
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
            if(data.first_name === "This field may not be blank."){

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
            else if(data.first_name === 'Name must have only persian characters.'){
              console.log('persianError');
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
            if(data.last_name === "This field may not be blank."){
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
              $('#signUpForm').append(errorBox)
            }
            else if(data.last_name === 'Name must have only persian characters.'){
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
              $('#signUpForm').append(errorBox)
            }

            if(data.phone_number === "This field may not be blank."){
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
            else if(data.phone_number === 'Phone number must be in this format : +989xxxxxxxxx'){
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
            if(data.email === "This field may not be blank."){
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
            else if(data.email === 'Enter a valid email address.'){
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
            else if(data.email === 'user with this email address already exists.'){
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

        }
    });
}


function checkUserNameAndPasswordValidation() {
    var validationURL = 'api/v1/profiles/userexists/' + $('#signupUsernameInput').val();
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
             window.location.href = "signup-form.html";


    },
        error : function(err) {
            console.log('User Exists:', err);


        }
    });
}
