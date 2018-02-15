function checkUserLogin(){
  var username = localStorage.getItem('current_login_username')
  var token = localStorage.getItem('current_login_token')
  var firstName = localStorage.getItem('current_login_first_name')
  var lastName = localStorage.getItem('current_login_last_name')
  if(firstName && lastName)
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
        window.location.href = '/login'
      }
    });
  }
  else {
    console.log('LOGIN FAILED: No token');
    window.location.href = '/login'
  }
}

$(function() {
  checkUserLogin();
});

var skills = [];
var skillsServer = [];
var isMedical = false;
var isTechnical = false;
var isLegal = false;
var isGeneral = false;
var fatherTag = document.getElementById('skillType');
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
}
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
}

function add_translation_tags() {

  var skillsbox = document.getElementById("skills-container");
  //-----------------------------------------------------------------------------------------------

  var translatefrom = document.getElementById('skillLangsFrom');
  var translateto = document.getElementById('skillLangsTo');
  var TF = translatefrom.options[translatefrom.selectedIndex].text;
  var TT = translateto.options[translateto.selectedIndex].text;
  var TFvalue = translatefrom.options[translatefrom.selectedIndex].value;
  var TTvalue = translateto.options[translateto.selectedIndex].value;
  var skillServer = {};
  var skill = {};
  skill.from_language = TF;
  skill.to_language = TT;
  skillServer.from_language = TF;
  skillServer.to_language = TT;

  skill.text = ' از ' + skill.from_language + ' به ' + skill.to_language;
  if (translatefrom.selectedIndex === 0 || translateto.selectedIndex === 0) {
    $('#ErrorMessage').show();
    $('#errorText').text('لطفا زبان خود را انتخاب کنید!');
  }
  if (TT == TF) {
    $('#ErrorMessage').show();
    $('#errorText').text('لطفا زبان مبدا و مقصد خود را متفاوت انتخاب کنید!');
  }
  var counter = 0;

  if (!is_skill_present(skill) && translatefrom.selectedIndex != 0 && translateto.selectedIndex != 0 && TT != TF) {
    if(skillServer.from_language === 'فارسی'){
      skillServer.from_language = 1;
    }
    if(skillServer.from_language=== 'انگلیسی'){
      skillServer.from_language = 2;
    }
    if(skillServer.from_language === 'فرانسوی'){
      skillServer.from_language = 3;
    }
    if(skillServer.from_language ==='عربی'){
      skillServer.from_language = 4;
    }
    if(skillServer.from_language ==='اسپانیایی'){
      skillServer.from_language = 5;
    }
    if(skillServer.from_language==='آلمانی'){
      skillServer.from_language = 6;
    }
    if(skillServer.to_language === 'فارسی'){
      skillServer.to_language = 1;
    }
    if(skillServer.to_language=== 'انگلیسی'){
      skillServer.to_language = 2;
    }
    if(skillServer.to_language === 'فرانسوی'){
      skillServer.to_language = 3;
    }
    if(skillServer.to_language ==='عربی'){
      skillServer.to_language = 4;
    }
    if(skillServer.to_language ==='اسپانیایی'){
      skillServer.to_language = 5;
    }
    if(skillServer.to_language==='آلمانی'){
      skillServer.to_language = 6;
    }

    //console.log(TF);
    $('#ErrorMessage').hide();
    skills.push(skill);
    skillsServer.push(skillServer);
    var child = document.createElement('div');
    skill.htmlElement = child;
    var childInnerText = document.createElement('div');
    childInnerText.innerHTML = skill.text;
    childInnerText.id = skill.text;
    //    childInnerText.readOnly = true;
    var removeButton = document.createElement('i');
    removeButton.id = counter;
    removeButton.setAttribute('class', 'fa fa-times-circle');
    removeButton.setAttribute('aria-hidden', 'true');
    child.className = "col-sm-6";
    childInnerText.setAttribute('style', 'font-family:FontAwesome;');
    //childInnerText =   skill.text;
    childInnerText.dir = "rtl";
    childInnerText.className = "form-control tag";
    childInnerText.setAttribute("style", "background-color: #EBEBEB;");
    //    childInnerText.style.color="#FFFFFF"
    childInnerText.style.display = "inline";
    child.setAttribute("style", "display: inline;white-space:nowrap;");
    childInnerText.style.fontsize = "5px";
    child.appendChild(childInnerText);
    skillsbox.appendChild(child);
    $(childInnerText).prepend(removeButton);
    // var removeButton = document.createElement('span');
    // removeButton.innerHTML = 'X';



    $(removeButton).click(function() {
      remove_tag(skill);
      remove_tag_server(skillServer);
    });
    counter++;
  }


}

function is_skill_present(skill) {
  for (var i = 0; i < skills.length; i++) {

    if (skills[i].from_language === skill.from_language &&
      skills[i].to_language === skill.to_language) {
      return true;
    }
  }
  return false;
}

function is_skillServer_present(skill) {
  for (var i = 0; i < skillsServer.length; i++) {

    if (skillsServer[i].from_language === skillServer.from_language &&
      skillsServer[i].to_language === skillServer.to_language) {
      return true;
    }
  }
  return false;
}

function remove_tag(skill) {
  for (var i = 0; i < skills.length; i++) {
    if (skills[i].from_language === skill.from_language &&
      skills[i].to_language === skill.to_language) {
      skills[i].htmlElement.remove();
      skills.splice(i, 1);
    }
  }
}

function remove_tag_server(skillServer) {
  for (var i = 0; i < skillsServer.length; i++) {
    if (skillsServer[i].from_language === skillServer.from_language &&
      skillsServer[i].to_language === skillServer.to_language) {
      skillsServer.splice(i, 1);
    }
  }
}

function gotonext() {
  if (0 < skills.length && fatherTag.selectedIndex != -1) {
    // console.log(fatherTag.options);
    //window.location.href = "/signup/infos";
    sendSkillsToServer();

  } else if (skills.length != 0 && fatherTag.selectedIndex === -1) {
    $('#ErrorMessage').show();
    $('#errorText').text('لطفا زمینه(ها)ی تخصصی خود را وارد کنید');
  } else if (skills.length === 0)
    $('#ErrorMessage').show();
  $('#errorText').text('لطفا حداقل یک مهارت را وارد کنید');
}

// var Name = localStorage.getItem('userFirstAndLastName');
// document.getElementById('userlogin').innerHTML = Name;



//-------------------------------------------------
//                  Ajax
//-------------------------------------------------

function sendSkillsToServer() {
  $('#loader').show();
  var selectedFatherTag;
  //console.log(skills);
  //console.log(skillsServer);
  var arrayOfFatherTags = [];
  for (selectedFatherTag = 0; selectedFatherTag < 4; selectedFatherTag++) {
    if (fatherTag.options[selectedFatherTag].selected === true) {
      //console.log(selectedFatherTag);
      arrayOfFatherTags.push(selectedFatherTag);
    //  console.log(arrayOfFatherTags);gi

    }
  }
  if (arrayOfFatherTags.indexOf(0) !== -1) {
    isMedical = true;
  }
  if (arrayOfFatherTags.indexOf(1) !== -1) {
    isTechnical = true;
  }
  if (arrayOfFatherTags.indexOf(2) !== -1) {
    isLegal = true;
  }
  if (arrayOfFatherTags.indexOf(3) !== -1) {
    isGeneral = true;
  }


  //console.log(isMedical, isTechnical, isLegal, isGeneral);
  // var i = 0;
  // for(i ; i<)
  var freelancersSkills = {
    is_general: isGeneral,
    is_legal: isLegal,
    is_medical: isMedical,
    is_technical: isTechnical,
    language_set: skillsServer,
  };
  console.log(freelancersSkills);
  $.ajax({
    type: "POST",
    url: '/api/v1/skills/add/translation/',
    dataType: 'json',
    headers: {"Authorization": "JWT " + localStorage.getItem('current_login_token')},
    contentType: "application/json",
    data: JSON.stringify(freelancersSkills),
    success: function(result) {
      window.location.href = "/signup/infos";
      // console.log("RESULT:", result);
    },
    error: function(err) {
      $("#loader").hide();
      console.log("Error Adding Skill: ", err);
    },
  });
}
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
