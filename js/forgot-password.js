$('#forgetPassword').click(function(){
  emailCheckValidation();
})

function emailCheckValidation(){
  var emailInput{
    email :  $('#forgotPasswordEmailInput').val();
  }
  $.ajax({
    type: "GET",
    url : "",
    dataType : "json",
    data : emailInput,
    success : function(result){

    }
    error : function(result){
      
    }
  })
}
