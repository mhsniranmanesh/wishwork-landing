(function($) {

  // Collapse the navbar when page is scrolled
  $(window).scroll(function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-shrink");
    } else {
      $("#mainNav").removeClass("navbar-shrink");
    }
  });

})(jQuery); // End of use strict


$('#ctaStart').click(function () {
    window.location.href = 'signup.html';
})

$('#ctaStart2').click(function(){
  window.location.href = 'signup.html';
})
$('#navBarButtonRegister').click(function () {
  window.location.href = "signup.html";
})