var aboutFreelancer = $('#aboutFreelancer').val();
var job = $('#job').val();
var degree = $('#degree').val();
var university = $('#university').val();

var SITE = SITE || {};
SITE.fileInputs = function (){
  var $this = $(this),
     $val = $this.val(),
     valArray = $val.split("\\"),
     newVal = valArray[valArray.length - 1],
     $button = $this.siblings("#imageButton"),
     $fakeFile = $this.siblings(".file-holder");
      if(newVal !== '') {
    $button.text('تغییر عکس');
    if($fakeFile.length === 0) {
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
    var imageSizeValidation ;
    var imageTypeValidation ;
    var tmppath = URL.createObjectURL(event.target.files[0]);
    // Checking Size ;)
    console.log(event.target.files[0]);
    if(event.target.files[0].size > 1000000){
        imageSizeValidation = false
    }
    if(event.target.files[0].size <= 1000000){
        imageSizeValidation = true
    }
    if(event.target.files[0].type.includes("image") === true){
        imageTypeValidation = true
    }
    if(event.target.files[0].type.includes("image") === false){
        imageTypeValidation = false
    }

    if(imageSizeValidation === true && imageTypeValidation === true){
      $('.fa-check-circle').remove();
      $('#imageAlertPart').prepend('<i class="fa fa-check-circle" aria-hidden="true"></i>').css('color' , 'green');
      $('.fa-level-up').remove();
      $('.fa-times').remove();
      $('#imageAlert').text('اندازه ی فایل شما مناسب می باشد').css('color' , 'green');

    }
    else if(imageSizeValidation === false && imageTypeValidation === true){
      $('.fa-times').remove();
      $('#imageAlert').text('اندازه ی فایل شما مناسب نمی باشد').css('color' , 'red');
      $('.fa-level-up').remove();
      $('.fa-check-circle').remove()
      $('#imageAlertPart').prepend('<i class="fa fa-times" aria-hidden="true"></i>').css('color' , 'red');
    }
    if(imageTypeValidation === false){
      $('.fa-times').remove();
      $('#imageAlert').text('لطفا فایل خود را عکس وارد کنید!').css('color' , 'red');
      $('.fa-level-up').remove();
      $('.fa-check-circle').remove()
      $('#imageAlertPart').prepend('<i class="fa fa-times" aria-hidden="true"></i>').css('color' , 'red');
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

    reader.onload = function (e) {
      $('#freelancer-Img').attr('src', e.target.result);
      $('#freelancer-Img').attr('height', '100px');
      $('#freelancer-Img').attr('width', '100px');

    //  $('#img-Path').val(tmppath);

    }

    reader.readAsDataURL(input.files[0]);
  }


$(".uploader").change(function(){
  readURL(this);

});
$('#submitButton').click(function(){
	//window.location.href = "signup-verification-msg.html";
})
var Email = localStorage.getItem('EmailVerification');
document.getElementById('EmailofClientOrFreelancer').innerHTML = Email;

function sendInfoFreelancerToSever(){
  $.ajax({
    type: "POST",
    url: 'http://rest.learncode.academy/api/learncode/amirh',
    dataType:'json',
    data : signUpDataPage2and1,
    success : function (data) {
        //console.log('mersii!' );
        //window.location.href = "signup-verification-msg.html";

    }
    error : function(result){

    }
  })
}
