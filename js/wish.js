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
	if (passText.length < 6 && passText.search(/\dd/) == -1 && passText.search(/[A-Z]/) == -1){
		return "پسورد شما باید شامل ۶ حرف انگلیسی باشد";
	}
	else if (passText.length < 6)
	{
		 return "پسورد شما باید حداقل شامل ۶ حرف انگلیسی باشد";
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
    else if(passText.search(/[\u0600-\u06FF]/) != -1) {
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

        $('#errorText').text(passStatus);
		$('#form-control-feedback-pass').show();
		$('#pas').addClass('has-danger');

    }
    else if(passStatus === "پسورد شما دارای نماد های نامعتبر است"){
        $('#errorText').text(passStatus);
        $('#form-control-feedback-pass').show();
        $('#pas').addClass('has-danger');
    }
    else{
        $('#errorText').text(passStatus);
        $('#form-control-feedback-pass').show();
        $('#pas').addClass('has-danger');
    }


});
var checkUserName = function (userText){
    console.log(userText);
    if (userText.search(/[!\@\#\$\%\^\&\*\(\)\+\;\']/) != -1)
        return "نام کاربری شما دارای نماد های نامعتبر است";
    if(userText === ""){
        return "لطفا نام کاربری خود را وارد کنید."
    }
    if(userText.match(/^[0-9a-zA-Z]/))
        return "okusername";
    if(userText.length < 4 )
        return "نام کاربری شما باید حداقل شامل ۴ کاراکتر باشد";

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
        console.log("KU", this.value);
        console.log("this", this);

        if (UserNameX !== "okusername") {

            $('#form-control-feedback-username').css('display' , 'block');
            $('#usn').addClass('has-danger');




        }
        else {
            $("#form-control-feedback-username").css('display', 'none');
            $('#usn').removeClass('has-danger');
        }
    }
});
function firstNameValidation(strr){

    if(strr.match(/^[\u0600-\u06FF]/)) {
        return "ok";
    }
        else
        return 'لطفا نام خود را فارسی وارد کنید.';
}
firstName.on('input' ,function () {
    var checkFirstName = this.value;
    if(firstNameValidation(checkFirstName) !== "ok" ) {
        $('#nameError').show();
        $('#fname').addClass('has-danger');
        $('#errorTextFirstName').text(firstNameValidation(checkFirstName));
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
    else if (strr ===""){
        return "لطفا نام خانوادگی خود را وارد کنید.";
    }
    else
        return 'لطفا نام خود را فارسی وارد کنید.';
}
lastName.on('input' ,function () {
    var checkLastName = this.value;
    if(lastNameValidation(checkLastName) !== "ok" ) {
        $('#LnameError').show();
        $('#lname').addClass('has-danger');
        $('#errorTextLastName').text(lastNameValidation(checkLastName));
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
    else if(numStr[0] == '0' && numStr.length !== 11){
        return "لطفا شماره ی خود را صحیح وارد کنید.";
    }
    else if(numStr[0] == '9' && numStr.length !== 10){
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
        $('#errorTextEmail').text('ایمیل شما نامعتبر می باشد')
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


//------------------------------------------------------------------------------

//             go to next : from signup-user-pass To signup-form

//------------------------------------------------------------------------------
function gotonext(){
    var validityPass = checkPassword(password.val());
    var validityUser = checkUserName(username.val());
    var CheckBox = document.getElementById("checkBox");
    if(username.val() ===""){
        validityUser = "EmptyUsername";
    }

    if(validityPass === "okpass" && validityUser ==="okusername" && CheckBox.checked === true){
        console.log('salam asal');
        window.location.href = "signup-form.html";
        //checkUserNameAndPasswordValidation();
    }
    else {
        if(CheckBox.checked != true && validityPass != "okpass" && validityUser ==="okusername"){
            $('#error-msg').text('لطفا پسورد خود را صحیح وارد کنید و قوانین را تایید کنید.').css('display' , 'block');
            $('#pas').addClass('has-danger');
          }
        if (CheckBox.checked != true && validityUser ==="okusername" && validityPass === "okpass"){
            $('#error-msg').text('لطفا قوانین را تایید کنید.').css('display' , 'block');
          }
        if(CheckBox.checked != true && validityUser !="okusername" && validityPass === "okpass"){
            $('#error-msg').text('لطفا نام کاربری را صحیح وارد کنید و قوانین را تایید کنید.').css('display' , 'block');
            $('#usn').addClass('has-danger');
          }
        if (CheckBox.checked === true && validityUser !="okusername" && validityPass != "okpass"){
            $('#error-msg').text('لطفا نام کاربری و پسورد خود را صحیح وارد کنید.').css('display' , 'block');
            $('#pas').addClass('has-danger');
            $('#usn').addClass('has-danger');
          }
        if(CheckBox.checked === true && validityUser ==="okusername" && validityPass != "okpass"){
            $('#error-msg').text('لطفا پسورد خود را صحیح وارد کنید.').css('display' , 'block');
            $('#pas').addClass('has-danger');
          }
        if (CheckBox.checked != true && validityUser !="okusername" && validityPass != "okpass"){
            $('#error-msg').text('انتخاب نام کاربری و رمز عبور مناسب و همچنین تایید قوانین الزامی است!').css('display' , 'block');
            $('#pas').addClass('has-danger');
            $('#usn').addClass('has-danger');
          }
        if(CheckBox.checked === true && validityUser !="okusername" && validityPass === "okpass"){
              $('#error-msg').text('لطفا نام کاربری را صحیح وارد کنید.').css('display' , 'block');
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
    console.log( "SSS",Name);
    //storage Email of client for signup-verification-msg.html
    localStorage.setItem('EmailVerification' , EMail );
    localStorage.setItem("userFirstAndLastName" , Name);

    if(lastNameValidation(checkingLastName) === "ok" && firstNameValidation(checkingName)==="ok" && checkingLastName!=="" && checkingMobile === 'ok' && checkingName !== "" && EMail !=="" && validateEmail(EMail) === true){
        //sendForm2DataToServer();
        window.location.href ='signup-freelancer-skills.html';
    }

    else if (checkingMobile !== 'ok' || checkingName==="" || EMail==="" || checkingLastName ===""){
        if(checkingName === "") {
            $('#nameError').show();
            $('#fname').addClass('has-danger');
            $('#errorTextFirstName').text(firstNameValidation(checkingName));
        }
        if(EMail ===""){
            $('#EmailError').show();
            $('#eml').addClass('has-danger');
            $('#errorTextEmail').text('لطفا ایمیل خود را وارد کنید.')
        }
        if(validateEmail(EMail) === false && EMail !== ""){
            $('#EmailError').show();
            $('#eml').addClass('has-danger');
            $('#errorTextEmail').text('ایمیل شما نامعتبر است.')
        }
        if(checkingMobile !== 'ok'){
            $('#mobileError').show()
            $('#mobilenmbr').addClass('has-danger');
            $('#errorTextMobile').text(checkingMobile);
        }
        if(checkingLastName ===""){

            $('#LnameError').show();
            $('#lname').addClass('has-danger');
            $('#errorTextLastName').text(lastNameValidation(checkingLastName));
        }
        $("#ErrorMessage").show();
    }
}





//-----------------------------------------------------------------
                    // AJAX For SignUp/In Wish-Work
//-----------------------------------------------------------------






$('#submit-signup-btn').click(function(){
    console.log("SUBMITTTT");
    gotonext();
});

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

$("#submit-signup-btn2").click(function () {
    gotonext2();
});

// function sendForm2DataToServer() {
//     var signUpDataPage2and1 = {
//         username :$('#signupUsernameInput').val(),
//         password :  $('#signupPassInput').val(),
//         first_name : $('#signupFirstNameInput').val() ,
//         last_name : $('#signupLastNameInput').val(),
//         email: $('#signupEmailInput').val() ,
//         phone_number : $('#mobilePassInput').val(),
//         type : "",
//     }
//     if (localStorage.getItem('registertype') === 'freelancer') {
//         signUpDataPage2and1.type = "freelancer";
//     }
//     else
//         signUpDataPage2and1.type = "client";
//
//     $.ajax({
//         type:  "POST",
//         url: 'http://rest.learncode.academy/api/learncode/amirh',
//         dataType:'json',
//         data : signUpDataPage2and1,
//         success : function (data) {
//             console.log('mersii!' );
//             window.location.href = "signup-verification-msg.html";
//
//         },
//         error : function (data) {
//             console.log('erorr');
//         }
//     });
// }
//
//
// function checkUserNameAndPasswordValidation() {
//     var signUpDataPage2and1 = {
//         username: $('#signupUsernameInput').val(),
//         password: $('#signupPassInput').val(),
//     }
//     $.ajax({
//         type : "GET",
//         url : '/api/v1/auth/check_user_pass/',
//         data: signUpDataPage2and1,
//         success : function (result) {
//             window.location.href = "signup-form.html";
//
//     },
//         error : function(err) {
//             if(err.username !== "This field is required."){
//
//             }
//             if(err.password === "This field is required."){
//
//             }
//
//         }
//     });
// }


// $.AJAX({
//   type:     "GET",
//                     url: 'http://172.25.0.195:8000/bucketlists/3/',
//                     contentType: "application/json",
//                     data : 'SignUpDataPage2',
//                     success: function(results){
//                         console.log("Friend added!", data)
//                     },
//                     error: function(error){
//
//                     }
// });
