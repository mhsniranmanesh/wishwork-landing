//------------------------------------------------------------

//         Freelancer Or Client for signup.html

//------------------------------------------------------------


var readyFunc = function(client , freelancer){
    $("#btn_sign_up_freelancer").click(function(){
        //If he was freelancer
      	localStorage.setItem('registertype' , 'freelancer' )
		window.location.href = "/signup/username";


	});
};


$(document).ready(readyFunc);
$(document).ready(function(client , freelancer){
	$('#btn_sign_up_client').click(function(){
    //If he was client
	localStorage.setItem('registertype' , 'client' )
		window.location.href = "/signup/username" ;
	});
});
