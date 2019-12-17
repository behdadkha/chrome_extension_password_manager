
chrome.storage.sync.get(['username', 'URL','web_username','web_password'], (result) => {
    document.getElementById("username").innerHTML = result.username;
    
});

chrome.tabs.query({'active': true, 'lastFocusedWindow': true}, function (tabs) {
    document.getElementById("website").value = (tabs[0].url).substring(0,40);
    /*if(web_url == tabs[0].url){
        document.getElementById("username_field").value = a;
        document.getElementById("password").value = b;
    }*/
    
});

document.getElementById("save_btn").onclick = (e)=>{
    e.preventDefault();

    const website = document.getElementById("website");
    const username = document.getElementById("username_field");
    const password = document.getElementById("password");

    
    fetch('http://localhost:5000/AddUser', {
		method: 'post',
        body: JSON.stringify({website:website.value.substring(0,40),
                             username: username.value, 
							password: password.value}),
		headers : {
			"Content-Type" : "application/json; charset=utf-8"
		}

	}).then((res) => {
		return res.json();
	}).then((data) => {
		if(data == "False"){
			alert("not successful")
		}
		else if(data == "True"){
			alert("saved");
		}
	});

};
