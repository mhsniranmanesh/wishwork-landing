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
        window.location.href = '../login/'
      }
    });
  }
  else {
    console.log('LOGIN FAILED: No token');
    window.location.href = '../login/'
  }
}

(function($) {
  "use strict"; // Start of use strict
  checkUserLogin();
  $('#myModal').modal('show');
  // Configure tooltips for collapsed side navigation
  $('.navbar-sidenav [data-toggle="tooltip"]').tooltip({
    template: '<div class="tooltip navbar-sidenav-tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner"></div></div>'
  })

  // Toggle the side navigation
  $("#sidenavToggler").click(function(e) {
    e.preventDefault();
    $("body").toggleClass("sidenav-toggled");
    $(".navbar-sidenav .nav-link-collapse").addClass("collapsed");
    $(".navbar-sidenav .sidenav-second-level, .navbar-sidenav .sidenav-third-level").removeClass("show");
  });

  // Force the toggled class to be removed when a collapsible nav link is clicked
  $(".navbar-sidenav .nav-link-collapse").click(function(e) {
    e.preventDefault();
    $("body").removeClass("sidenav-toggled");
  });

  // Prevent the content wrapper from scrolling when the fixed side navigation hovered over
  $('body.fixed-nav .navbar-sidenav, body.fixed-nav .sidenav-toggler, body.fixed-nav .navbar-collapse').on('mousewheel DOMMouseScroll', function(e) {
    var e0 = e.originalEvent,
      delta = e0.wheelDelta || -e0.detail;
    this.scrollTop += (delta < 0 ? 1 : -1) * 30;
    e.preventDefault();
  });

  // Scroll to top button appear
  $(document).scroll(function() {
    var scrollDistance = $(this).scrollTop();
    if (scrollDistance > 100) {
      $('.scroll-to-top').fadeIn();
    } else {
      $('.scroll-to-top').fadeOut();
    }
  });

  // Configure tooltips globally
  $('[data-toggle="tooltip"]').tooltip()

  // Smooth scrolling using jQuery easing
  $(document).on('click', 'a.scroll-to-top', function(event) {
    var $anchor = $(this);
    $('html, body').stop().animate({
      scrollTop: ($($anchor.attr('href')).offset().top)
    }, 1000, 'easeInOutExpo');
    event.preventDefault();
  });

})(jQuery); // End of use strict
