var socket = io.connect();

function getarray()
{
	socket.emit('get local chat array',{});
}
socket.on('send local chat array', function(data){
	console.log(data)
	loadChat(data);
});

function send_message(user , text)
{
	if(facebook_user && text!="")
	{
		var temp={
			user: user,
			text: text
		}
		socket.emit('send local chat message',temp);
	}else if(!facebook_user){
		alert('Must Login to make comments');
	}else{
		alert('Textfield is empty');
	}
}
socket.on('new local chat message', function(data){
	console.log(data)
	addChatDiv(data)
});

function loadChat(data)
{
	for(var i=0; i<data.length;i++)
	{
		addChatDiv(data[i]);
	}
}
function addChatDiv(data)
{
	$( "#local_chat_area" ).append( "<div class='row' style='height:30px;'><div class='col-1' style='width:20px;'><img  style='width: 30px;height: 30px;border-radius:50%; ' src="+data.user.picture+ "></div> <div class='col-2' style='color:white;'><b>"+data.user.first_name+"</b></div></div>");

	//$( "#local_chat_area" ).append( "<img id='profile' class='c' style='min-height: 30px;border-radius:50%; min-width: 30px;height: 5vh; width: 5vh;' src='/img/test_logo_1.png' > ");

	$( "#local_chat_area" ).append( "<p class='speech' style=' display:block; overflow:auto; '>"+data.text+"</p>" );

}