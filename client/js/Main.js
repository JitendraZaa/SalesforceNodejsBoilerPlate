var $apiEle = $("#apiCount"); 

if(!$.cookie("AccToken"))
{ 
    window.location = '/index.html';
}
 
if($.cookie("AccToken") && $.cookie("APIVer") && $.cookie("InstURL"))
{ 
    client.setSessionToken($.cookie("AccToken"), $.cookie("APIVer"), $.cookie("InstURL"));
}

$('#Query-to-execute').keypress(function (e) {
 var key = e.which;
 if(key == 13)  // the enter key code
  { 
	executeQuery();
  }
}); 

 
 function executeQuery() {
    if (!client.sessionId) {
        alert('You are not authenticated. Please login first.');
        return false;
    }
    client.query($("#Query-to-execute").val(),
        function (data) {
            $('#result').html(JSON.stringify(data, undefined, 3));
        },
        function (error) {
            alert("Error: " + JSON.stringify(error));
        });
    return false;
}


function addAPICount()
{
    if(!$apiEle)
    {
        $apiEle = $("#apiCount");
    }
    
    $apiEle.text(parseInt($apiEle.text()) + 1) ; 
}

executeQuery();
