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
        window.location.href = 'signin.html'
      }
    });
  }
  else {
    console.log('LOGIN FAILED: No token');
    window.location.href = 'signin.html'
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
  skill.from = TF;
  skill.to = TT;
  skillServer.from = TF;
  skillServer.to = TT;

  skill.text = ' از ' + skill.from + ' به ' + skill.to;
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
    if(skillServer.from === 'فارسی'){
      skillServer.from = 1;
    }
    if(skillServer.from=== 'انگلیسی'){
      skillServer.from = 2;
    }
    if(skillServer.from === 'فرانسوی'){
      skillServer.from = 3;
    }
    if(skillServer.from ==='عربی'){
      skillServer.from = 4;
    }
    if(skillServer.from ==='اسپانیایی'){
      skillServer.from = 5;
    }
    if(skillServer.from==='آلمانی'){
      skillServer.from = 6;
    }
    if(skillServer.to === 'فارسی'){
      skillServer.to = 1;
    }
    if(skillServer.to=== 'انگلیسی'){
      skillServer.to = 2;
    }
    if(skillServer.to === 'فرانسوی'){
      skillServer.to = 3;
    }
    if(skillServer.to ==='عربی'){
      skillServer.to = 4;
    }
    if(skillServer.to ==='اسپانیایی'){
      skillServer.to = 5;
    }
    if(skillServer.to==='آلمانی'){
      skillServer.to = 6;
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
    childInnerText.setAttribute('style', 'font-family:FontAwesome;')
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
    })
    counter++;
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

function is_skillServer_present(skill) {
  for (var i = 0; i < skillsServer.length; i++) {

    if (skillsServer[i].from === skillServer.from && skillsServer[i].to === skillServer.to) {
      return true;
    }
  }
  return false;
}

function remove_tag(skill) {
  for (var i = 0; i < skills.length; i++) {
    if (skills[i].from === skill.from && skills[i].to === skill.to) {
      skills[i].htmlElement.remove();
      skills.splice(i, 1);
    }
  }
}

function remove_tag_server(skillServer) {
  for (var i = 0; i < skillsServer.length; i++) {
    if (skillsServer[i].from === skillServer.from && skillsServer[i].to === skillServer.to) {
      skillsServer.splice(i, 1);
    }
  }
}

function gotonext() {
  if (0 < skills.length && fatherTag.selectedIndex != -1) {
    // console.log(fatherTag.options);
    //window.location.href = "signup-freelancer-infos.html";
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
    url: 'api/v1/skills/add/translation/',
    dataType: 'json',
    headers: {"Authorization": "JWT " + localStorage.getItem('current_login_token')},
    data: freelancersSkills,
    success: function(result) {
      window.location.href = "signup-freelancer-infos.html";
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
