var facebook_user={
	id:"",
	first_name:"",
	last_name:"",
	picture:""
};
var facebook_friends=[];
facebook_user=JSON.parse(sessionStorage.getItem("facebook_user"));
// initialize and setup facebook js sdk
window.fbAsyncInit = function() {
    FB.init({
      appId      : '877090675763434',
      xfbml      : true,
      version    : 'v2.5'
    });
	if(JSON.parse(sessionStorage.getItem("facebook_user")))
	{
		document.getElementById('login').style.display = 'none';
		document.getElementById('logout').style.display = 'inline';
        console.log('FB info stored');
        $('#profile').attr('src', facebook_user.picture);
        $('#name').text(facebook_user.last_name+", "+facebook_user.first_name);
	}
    // FB.getLoginStatus(function(response) {
    // 	if (response.status === 'connected') {
    // 		document.getElementById('status').innerHTML = 'We are connected.';
    // 		document.getElementById('login').style.display = 'none';
    // 		document.getElementById('logout').style.display = 'inline';
    // 	} else if (response.status === 'not_authorized') {
    // 		document.getElementById('status').innerHTML = 'We are not logged in.'
    // 	} else {
    // 		document.getElementById('status').innerHTML = 'You are not logged into Facebook.';
    // 	}
    // });
};
(function(d, s, id){
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {return;}
    js = d.createElement(s); js.id = id;
    js.src = "//connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// login with facebook with extra permissions
function login() {
	FB.login(function(response) {
		if (response.status === 'connected') {
            document.getElementById('login').style.display = 'none';
    		document.getElementById('logout').style.display = 'inline';

            getInfo();
            getfriends();

            console.log('We are logged in.');
            FB.logout(function(response) {
            });

    	} else if (response.status === 'not_authorized') {
    	   console.log('We are not logged in.');
 
    	} else {
    		console.log('You are not logged into Facebook.');
    	}
	}, {scope: 'email,user_friends'});
}
function logout()
{
    $('#profile').attr('src', '/img/test_logo_1.png');
    $('#name').text("");
	sessionStorage.removeItem('facebook_user');
	document.getElementById('login').style.display = 'inline';
	document.getElementById('logout').style.display = 'none';
	facebook_user=null;
}				
// getting basic user info
function getInfo() {
	FB.api('/me', 'GET', {fields: 'first_name,last_name,name,id,picture{url}'}, function(response) {
		//console.log(response)
		//document.getElementById('status').innerHTML = response.id;
		facebook_user={
			id:response.id,
			first_name:response.first_name,
			last_name:response.last_name,
			picture:response.picture.data.url
		}
        $('#profile').attr('src', facebook_user.picture);
        $('#name').text(facebook_user.last_name+", "+facebook_user.first_name);
	
		sessionStorage.setItem("facebook_user", JSON.stringify(facebook_user) );
	});
}

function getfriends() {
    FB.api('/me/friends', function(response){
        facebook_friends=response;
        console.log(response);
    }, {scope: 'user_friends'});

}
function loadinfo(){
    if(JSON.parse(sessionStorage.getItem("facebook_user")))
    {
        $('#profile').attr('src', facebook_user.picture);
        $('#name').text(facebook_user.last_name+", "+facebook_user.first_name);

    }
}