function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, " "));
}

$(function() {
  var uid = getParameterByName('u');
  var token = getParameterByName('t');
  $.ajax({
    type: "POST",
    url: '/api/v1/auth/verify-email/' + uid + '/' + token + '/',
    data: {},
    success: function(result) {
      console.log('SUCCESS: ', result)
      $("#body3").fadeOut(500, function() {
        $("#body1").fadeIn(500, function() {});
      });
      localStorage.setItem('current_login_username', result.username)
      localStorage.setItem('current_login_token', result.token)
      localStorage.setItem('is_freelancer', result.is_freelancer)
      localStorage.setItem('current_login_first_name', result.first_name)
      localStorage.setItem('current_login_last_name', result.last_name)
      window.setTimeout(function() {
        if (result.is_freelancer)
          window.location.href = "signup-freelancer-skills.html";
        else
          window.location.href = "dashboard.html";
      }, 1000);
    },

    error: function(err) {
      console.log('Error: ', err);
      $("#body3").fadeOut(500, function() {
        $("#body2").fadeIn(500, function() {});
      });
    }
  });
});
