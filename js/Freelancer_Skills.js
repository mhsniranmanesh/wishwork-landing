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
    var childInnerText = document.createElement('label');
    childInnerText.innerHTML = skill.text;
    childInnerText.id = "tag";
//    childInnerText.readOnly = true;
  	child.className = "col-sm-6";
    childInnerText.setAttribute('style' , 'font-family:FontAwesome;')
	  //childInnerText =   skill.text;
    childInnerText.dir = "rtl";
	  childInnerText.className="form-control tag";
    childInnerText.style.display = "inline";
    child.setAttribute("style", "display: inline;white-space:nowrap;");
    childInnerText.style.fontsize = "5px";
    child.appendChild(childInnerText);
	  skillsbox.appendChild(child);
    $('.tag').prepend('<i id="removeTagButton" class="fa fa-times-circle" aria-hidden="true"></i>');
	// var removeButton = document.createElement('span');
	// removeButton.innerHTML = 'X';


  $('#removeTagButton').click( function(){
    remove_tag(skill);
  })
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

// var Name = localStorage.getItem('userFirstAndLastName');
// document.getElementById('userlogin').innerHTML = Name;


//-------------------------------------------------
//                  Ajax
//-------------------------------------------------
// function sendInfoAndSkillsOfFreelancerDataToServer(){
//   var signUpDataInfoAndSkills ={
//     var FreelancerSkills = skills,
//   //  var IMG?
//     var freelancerJob = $('#job'),
//     var freelancerDegree = $('#degree'),
//     var freelancerAbout = $('#aboutFreelancer'),
//     var freelancerCareer = $('#Career')
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
