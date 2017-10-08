var skills = [];
var fatherTag = document.getElementById('skillType');
Element.prototype.remove = function() {
    this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
    for(var i = this.length - 1; i >= 0; i--) {
        if(this[i] && this[i].parentElement) {
            this[i].parentElement.removeChild(this[i]);
        }
    }
}

function add_translation_tags(){

var skillsbox = document.getElementById("skills-container");
//-----------------------------------------------------------------------------------------------

var translatefrom = document.getElementById('skillLangsFrom');
var translateto = document.getElementById('skillLangsTo');
var TF = translatefrom.options[translatefrom.selectedIndex].text;
var TT = translateto.options[translateto.selectedIndex].text;
var TFvalue =  translatefrom.options[translatefrom.selectedIndex].value;
var TTvalue = translateto.options[translateto.selectedIndex].value;

var skill = {};
skill.from = TF;
skill.to = TT;
skill.text =  ' از ' + skill.from + ' به ' + skill.to ;
	var counter = 1;
	if(translatefrom.selectedIndex === 0 || translateto.selectedIndex === 0){
		$('#ErrorMessage').show();
		$('#errorText').text('لطفا زبان خود را انتخاب کنید!');
		counter++
	}
	if (TT == TF){
		$('#ErrorMessage').show();
		$('#errorText').text('لطفا زبان مبدا و مقصد خود را متفاوت انتخاب کنید!');
	}
if(!is_skill_present(skill) && translatefrom.selectedIndex != 0 && translateto.selectedIndex != 0 && TT != TF){
	 $('#ErrorMessage').hide();
	skills.push(skill);
	var child = document.createElement('div');
	skill.htmlElement = child;
    var childInnerText = document.createElement('input');
	childInnerText.readOnly = true;
	child.className = "col-sm-6";
	childInnerText.placeholder = skill.text;
    childInnerText.dir = "rtl";
	childInnerText.className="form-control";
    childInnerText.style.display = "inline";
    childInnerText.style.fontsize = "5px";
    child.appendChild(childInnerText);
	skillsbox.appendChild(child);
	var removeButton = document.createElement('span');
	removeButton.innerHTML = 'X';
	child.appendChild(removeButton);
	removeButton.onclick = function(){
		remove_tag(skill);
	}
}

}

function is_skill_present(skill) {
  for (var i = 0; i < skills.length; i++) {

	  if (skills[i].from === skill.from && skills[i].to === skill.to) {
      return true;
    }
  }
  return false;
}
function remove_tag(skill){
	for (var i = 0 ; i<skills.length; i++){
		if(skills[i].from === skill.from && skills[i].to === skill.to){
			skills[i].htmlElement.remove();
			skills.splice(i,1);

		}
	}
}
function gotonext(){
	if( 0 < skills.length && fatherTag.selectedIndex != -1){
		window.location.href="signup-freelancer-infos.html";
	}
	else if ( skills.length != 0 && fatherTag.selectedIndex === -1){
		$('#ErrorMessage').show();
		$('#errorText').text('لطفا زمینه(ها)ی تخصصی خود را وارد کنید');
	}
	else if (skills.length === 0)
				$('#ErrorMessage').show();
				$('#errorText').text('لطفا حداقل یک مهارت را وارد کنید');
}
$('#submitButton').click(function(){
	window.location.href = "signup-verification-msg.html";
})
// var Name = localStorage.getItem('userFirstAndLastName');
// document.getElementById('userlogin').innerHTML = Name;
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
    var imageValidation ;
    var tmppath = URL.createObjectURL(event.target.files[0]);
    // Checking Size ;)
    if(event.target.files[0].size > 1000000){
        imageValidation = false
    }
    if(event.target.files[0].size <= 1000000){
        imageValidation = true
    }
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
}

$(".uploader").change(function(){
  readURL(this);

});

if (imageValidation === true) {
  
}

//-------------------------------------------------
//                  Ajax
//-------------------------------------------------
// function sendInfoAndSkillsOfFreelancerDataToServer(){
//   var signUpDataInfoAndSkills ={
//     var FreelancerSkills = skills,
//   //  var IMG?
//     var freelancerJob = $('#job'),
//     var freelancerDegree = $('#degree'),
//   }
//   $.ajax({
//     type : "POST",
//     url  :
//     dataType : 'json',
//     data : signUpDataInfoAndSkills,
//     success : function(data){
//       console.log('mersi !');
//     }
//     error : function(data){
//       console.log('Error');
//     }
//   })
// }
var Email = localStorage.getItem('EmailVerification');
document.getElementById('EmailofClientOrFreelancer').innerHTML = Email;
