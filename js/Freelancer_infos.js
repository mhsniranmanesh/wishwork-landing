Array.prototype.contains = function(obj) {
    var i = this.length;
    while (i--) {
        if (this[i] === obj) {
            return true;
        }
    }
    return false;
}

function formToJson(form)
{
 var jsonForm={};
 $("input", $('form')).each(function(index){
   jsonForm[$(this).attr("id")] = this.value;
 })
 return jsonForm;
};

function checkUserLogin() {
  var username = localStorage.getItem('current_login_username')
  var token = localStorage.getItem('current_login_token')
  var firstName = localStorage.getItem('current_login_first_name')
  var lastName = localStorage.getItem('current_login_last_name')
  if (firstName && lastName)
    $("#navbar-user-name").text(firstName + ' ' + lastName);
  else
    $("#navbar-user-name").text("");
  if (token) {
    $.ajax({
      type: "POST",
      url: '/api/v1/auth/token/verify/',
      data: {
        token: token
      },
      success: function(result) {
        console.log('LOGIN SUCCESS: ', result)
      },
      error: function(err) {
        console.log('LOGIN FAILED: ', err)
        window.location.href = 'signin.html'
      }
    });
  } else {
    console.log('LOGIN FAILED: No token');
    window.location.href = 'signin.html'
  }
}

$(function() {
  checkUserLogin();
});

var title = $('#title');
var bio = $('#bio')
var job = $('#job');
var degree = $('#degree');
var university = $('#university');
var freelancerImage = null;
var imageSizeValidation;
var imageTypeValidation;
//var fd = new FormData();
var SITE = SITE || {};
SITE.fileInputs = function() {
  var $this = $(this),
    $val = $this.val(),
    valArray = $val.split("\\"),
    newVal = valArray[valArray.length - 1],
    $button = $this.siblings("#imageButton"),
    $fakeFile = $this.siblings(".file-holder");
  if (newVal !== '') {
    $button.text('تغییر عکس');
    if ($fakeFile.length === 0) {
      $button.after('<span class="file-holder">' + newVal + '</span>');
    } else {
      $fakeFile.text(newVal);
    }
  }
};


$('.file-wrapper input[type=file]').bind('change focus click', SITE.fileInputs);

function readURL(input) {

  if (input.files && input.files[0]) {
    var reader = new FileReader();

    var tmppath = URL.createObjectURL(event.target.files[0]);
    // Checking Size ;)
    console.log(event.target.files[0]);
    if (event.target.files[0].size > 1000000) {
      imageSizeValidation = false
    }
    if (event.target.files[0].size <= 1000000) {
      imageSizeValidation = true
    }
    if (event.target.files[0].type.includes("image") === true) {
      imageTypeValidation = true;

    }
    if (event.target.files[0].type.includes("image") === false) {
      imageTypeValidation = false
    }

    if (imageSizeValidation === true && imageTypeValidation === true) {
      $('.fa-check-circle').remove();
      $('#imageAlertPart').prepend('<i class="fa fa-check-circle" aria-hidden="true"></i>').css('color', 'green');
      $('.fa-level-up').remove();
      $('.fa-times').remove();
      $('#imageAlert').text('اندازه ی فایل شما مناسب می باشد').css('color', 'green');
      freelancerImage = input.files[0];
      //fd.append("profile_picture", freelancerImage);
      console.log(freelancerImage);
      //console.log('fucking fd' ,fd)


    } else if (imageSizeValidation === false && imageTypeValidation === true) {
      $('.fa-times').remove();
      $('#imageAlert').text('اندازه ی فایل شما مناسب نمی باشد').css('color', 'red');
      $('.fa-level-up').remove();
      $('.fa-check-circle').remove()
      $('#imageAlertPart').prepend('<i class="fa fa-times" aria-hidden="true"></i>').css('color', 'red');
      freelancerImage = null;
    }
    if (imageTypeValidation === false) {
      $('.fa-times').remove();
      $('#imageAlert').text('لطفا فایل خود را عکس وارد کنید!').css('color', 'red');
      $('.fa-level-up').remove();
      $('.fa-check-circle').remove()
      $('#imageAlertPart').prepend('<i class="fa fa-times" aria-hidden="true"></i>').css('color', 'red');
      freelancerImage = null;
    }
  }
  //  else if ()
  // if it was canceled!
  // if (event.target.files[0].size === null) {
  //   $('#imageAlert').
  // }
  // console.log(event.target.files[0].name , 'target');
  // console.log(tmppath);
  $(".file-holder").hide();
  $('.fa-camera').hide();

  reader.onload = function(e) {
    $('#freelancer-Img').attr('src', e.target.result);
    $('#freelancer-Img').attr('height', '100px');
    $('#freelancer-Img').attr('width', '100px');

    //  $('#img-Path').val(tmppath);

  }

  reader.readAsDataURL(input.files[0]);
}


$(".uploader").change(function() {
  readURL(this);


});
$('#submitButton').click(function() {
  //window.location.href = "signup-verification-msg.html";

})
function sendInfoFreelancerToSever() {
  $('#loader').show();
  var profile_picture = $('input[id="imgInp"]').get(0).files[0];
  var formData = new FormData();
  if(title.val() !== "")
    formData.append('title', title.val());
  if(bio.val() !== "")
    formData.append('bio', bio.val());
  if(degree.val() !== "")
    formData.append('degree', degree.val());
  if(job.val() !== "")
    formData.append('job', job.val());
  if(university.val() !== "")
    formData.append('university', university.val());
  if(profile_picture !== undefined)
    formData.append('profile_picture', profile_picture);

$.ajax({
  type: "POST",
  url: 'api/v1/profiles/update-infos/',
  data: formData,
  headers: {"Authorization": "JWT " + localStorage.getItem('current_login_token')},
  contentType: false,
  processData: false,
  cache: false,
  success: function(data) {
    console.log("Success:", data);
    window.location.href = 'dashboard.html';
  },
  error : function(data){
            $('#loader').hide();
            console.log('err' , data);
          $('.error-msg').remove();
          $('#errorBoxx').remove();
          if(data.responseJSON.bio && data.responseJSON.bio.contains("Ensure this field has no more than 3000 characters.")){
            $('.error-msg').remove();
            var errorCross = document.createElement('i');
            errorCross.setAttribute('class', 'fa fa-times-circle');
            errorCross.setAttribute('aria-hidden', 'true');
            var errorBox = document.createElement('span');
        //    errorBox.id = 'errorBox';
            errorBox.setAttribute('class' , 'error-msg');
            errorBox.appendChild(errorCross);
            var errorMessage = document.createElement('span');
            errorMessage.innerHTML = 'خطا: خلاصه از فعالیت ها باید حداکثر شامل ۳۰۰۰ کاراکتر باشد.'
            errorBox.appendChild(errorMessage);
            $(errorMessage).prepend(errorCross);
            $('#freelancerInfoForm').append(errorBox);
          }
          if(data.responseJSON.title && data.responseJSON.title.contains("Ensure this field has no more than 150 characters.")){
            $('.error-msg').remove();
            var errorCross = document.createElement('i');
            errorCross.setAttribute('class', 'fa fa-times-circle');
            errorCross.setAttribute('aria-hidden', 'true');
            var errorBox = document.createElement('span');
        //    errorBox.id = 'errorBox';
            errorBox.setAttribute('class' , 'error-msg');
            errorBox.appendChild(errorCross);
            var errorMessage = document.createElement('span');
            errorMessage.innerHTML = 'خطا: عنوان حرفه ای شما باید حداکثر شامل ۱۵۰ کاراکتر باشد.'
            errorBox.appendChild(errorMessage);
            $(errorMessage).prepend(errorCross);
            $('#freelancerInfoForm').append(errorBox);
          }
          if(data.responseJSON.job && data.responseJSON.job.contains( "Ensure this field has no more than 150 characters.")){
            $('.error-msg').remove();
            var errorCross = document.createElement('i');
            errorCross.setAttribute('class', 'fa fa-times-circle');
            errorCross.setAttribute('aria-hidden', 'true');
            var errorBox = document.createElement('span');
        //    errorBox.id = 'errorBox';
            errorBox.setAttribute('class' , 'error-msg');
            errorBox.appendChild(errorCross);
            var errorMessage = document.createElement('span');
            errorMessage.innerHTML =  'خطا: شغل شما باید حداکثر شامل ۱۵۰ کاراکتر باشد.'
            errorBox.appendChild(errorMessage);
            $(errorMessage).prepend(errorCross);
            $('#freelancerInfoForm').append(errorBox);
          }
          if(data.responseJSON.degree && data.responseJSON.degree.contains("Ensure this field has no more than 150 characters.")){
            $('.error-msg').remove();
            var errorCross = document.createElement('i');
            errorCross.setAttribute('class', 'fa fa-times-circle');
            errorCross.setAttribute('aria-hidden', 'true');
            var errorBox = document.createElement('span');
        //    errorBox.id = 'errorBox';
            errorBox.setAttribute('class' , 'error-msg');
            errorBox.appendChild(errorCross);
            var errorMessage = document.createElement('span');
            errorMessage.innerHTML =  'خطا: تحصیلات شما باید حداکثر شامل ۱۵۰ کاراکتر باشد.'
            errorBox.appendChild(errorMessage);
            $(errorMessage).prepend(errorCross);
            $('#freelancerInfoForm').append(errorBox);
          }
          if(data.responseJSON.university && data.responseJSON.university.contains("Ensure this field has no more than 150 characters.")){
            $('.error-msg').remove();
            var errorCross = document.createElement('i');
            errorCross.setAttribute('class', 'fa fa-times-circle');
            errorCross.setAttribute('aria-hidden', 'true');
            var errorBox = document.createElement('span');
        //    errorBox.id = 'errorBox';
        errorBox.setAttribute('class', 'error-msg');
        errorBox.appendChild(errorCross);
        var errorMessage = document.createElement('span');
        errorMessage.innerHTML = 'خطا: دانشگاه شما باید حداکثر شامل ۱۵۰ کاراکتر باشد.'
        errorBox.appendChild(errorMessage);
        $(errorMessage).prepend(errorCross);
        $('#freelancerInfoForm').append(errorBox);
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
        $('#signUpForm').append(errorBox);
      }
    }
  });
}
// function sendInfoFreelancerToSever(){
//
//   console.log('fd',fd);
//
//
//    var freelancerInfo = {
//      //profile_picture: fd,
//      title : title,
//      bio : bio,
//      job : job,
//      degree : degree,
//      university : university,
//    }
//
//    var a = {};
//    var y = 0;
//    var x = 0;
//    for(x ; x<5 ; x++){
//      if(freelancerInfo[x] !== undefined){
//        a[y] = freelancerInfo[x];
//        y++;
//      }
//    }
// //   fd.splice.apply(fd, a);
//
//    console.log('freelancerInfoAndImage' , fd);
//   $.ajax({
//     type: "POST",
//     url: 'api/v1/profiles/update-infos/',
//     processData: false,
//     headers: {"Authorization": "JWT " + localStorage.getItem('current_login_token')},
//     data : fd,
//     contentType: false,
//     success : function (data) {
//         //console.log('mersii!');
//         //window.location.href = "after-signin.html";
//         console.log('success' , data)
//     },
//     error : function(data){
//       console.log('erorr' ,data);
//       $('.error-msg').remove();
//       if(data.bio === "Ensure this field has no more than 3000 characters."){
//         $('.error-msg').remove();
//         var errorCross = document.createElement('i');
//         errorCross.setAttribute('class', 'fa fa-times-circle');
//         errorCross.setAttribute('aria-hidden', 'true');
//         var errorBox = document.createElement('span');
//     //    errorBox.id = 'errorBox';
//         errorBox.setAttribute('class' , 'error-msg');
//         errorBox.appendChild(errorCross);
//         var errorMessage = document.createElement('span');
//         errorMessage.innerHTML = 'خطا: خلاصه از فعالیت ها باید حداکثر شامل ۳۰۰۰ کاراکتر باشد.'
//         errorBox.appendChild(errorMessage);
//         $(errorMessage).prepend(errorCross);
//         $('#freelancerInfoForm').append(errorBox);
//       }
//       if(data.title === "Ensure this field has no more than 150 characters."){
//         $('.error-msg').remove();
//         var errorCross = document.createElement('i');
//         errorCross.setAttribute('class', 'fa fa-times-circle');
//         errorCross.setAttribute('aria-hidden', 'true');
//         var errorBox = document.createElement('span');
//     //    errorBox.id = 'errorBox';
//         errorBox.setAttribute('class' , 'error-msg');
//         errorBox.appendChild(errorCross);
//         var errorMessage = document.createElement('span');
//         errorMessage.innerHTML = 'خطا: عنوان حرفه ای شما باید حداکثر شامل ۱۵۰ کاراکتر باشد.'
//         errorBox.appendChild(errorMessage);
//         $(errorMessage).prepend(errorCross);
//         $('#freelancerInfoForm').append(errorBox);
//       }
//       if(data.job === "Ensure this field has no more than 150 characters."){
//         $('.error-msg').remove();
//         var errorCross = document.createElement('i');
//         errorCross.setAttribute('class', 'fa fa-times-circle');
//         errorCross.setAttribute('aria-hidden', 'true');
//         var errorBox = document.createElement('span');
//     //    errorBox.id = 'errorBox';
//         errorBox.setAttribute('class' , 'error-msg');
//         errorBox.appendChild(errorCross);
//         var errorMessage = document.createElement('span');
//         errorMessage.innerHTML =  'خطا: شغل شما باید حداکثر شامل ۱۵۰ کاراکتر باشد.'
//         errorBox.appendChild(errorMessage);
//         $(errorMessage).prepend(errorCross);
//         $('#freelancerInfoForm').append(errorBox);
//       }
//       if(data.degree === "Ensure this field has no more than 150 characters."){
//         $('.error-msg').remove();
//         var errorCross = document.createElement('i');
//         errorCross.setAttribute('class', 'fa fa-times-circle');
//         errorCross.setAttribute('aria-hidden', 'true');
//         var errorBox = document.createElement('span');
//     //    errorBox.id = 'errorBox';
//         errorBox.setAttribute('class' , 'error-msg');
//         errorBox.appendChild(errorCross);
//         var errorMessage = document.createElement('span');
//         errorMessage.innerHTML =  'خطا: تحصیلات شما باید حداکثر شامل ۱۵۰ کاراکتر باشد.'
//         errorBox.appendChild(errorMessage);
//         $(errorMessage).prepend(errorCross);
//         $('#freelancerInfoForm').append(errorBox);
//       }
//       if(data.university === "Ensure this field has no more than 150 characters."){
//         $('.error-msg').remove();
//         var errorCross = document.createElement('i');
//         errorCross.setAttribute('class', 'fa fa-times-circle');
//         errorCross.setAttribute('aria-hidden', 'true');
//         var errorBox = document.createElement('span');
//     //    errorBox.id = 'errorBox';
//         errorBox.setAttribute('class' , 'error-msg');
//         errorBox.appendChild(errorCross);
//         var errorMessage = document.createElement('span');
//         errorMessage.innerHTML =  'خطا: دانشگاه شما باید حداکثر شامل ۱۵۰ کاراکتر باشد.'
//         errorBox.appendChild(errorMessage);
//         $(errorMessage).prepend(errorCross);
//         $('#freelancerInfoForm').append(errorBox);
//       }
//       else{
//         $('.error-msg').remove();
//         var errorCross = document.createElement('i');
//         errorCross.setAttribute('class', 'fa fa-times-circle');
//         errorCross.setAttribute('aria-hidden', 'true');
//         var errorBox = document.createElement('span');
//     //    errorBox.id = 'errorBox';
//         errorBox.setAttribute('class' , 'error-msg');
//         errorBox.appendChild(errorCross);
//         var errorMessage = document.createElement('span');
//         errorMessage.innerHTML = 'خطا در اتصال به سرور ، لطفا مجددا سعی کنید.'
//         errorBox.appendChild(errorMessage);
//         $(errorMessage).prepend(errorCross);
//         $('#freelancerInfoForm').append(errorBox);
//       }
//     }
//   });
// }
