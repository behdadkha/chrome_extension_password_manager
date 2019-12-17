
//username and password validation
const username = document.getElementById('username');
const password = document.getElementById('password');


document.getElementById("submit_btn").onclick = (e)=>{
	e.preventDefault();	
	fetch('http://localhost:5000/check', {
		method: 'post',
		body: JSON.stringify({username: username.value, 
							password: password.value}),
		headers : {
			"Content-Type" : "application/json; charset=utf-8"
		}

	}).then((res) => {
		return res.json();
	}).then((data) => {
		if(data == "False"){
			alert("incorrect password")
		}
		else if(data == "True"){
			//the password is correct
			document.getElementById("user").style.display = "block";
			document.getElementById("login_form").style.display = "none";
			console.log("correct password")

			chrome.browserAction.setPopup({popup : "user.html"});
			chrome.runtime.sendMessage("True");//notify background that the user is logged in
			send_server_url();//send the server the current url

			//set username in storage
			chrome.storage.sync.set({
				username: username.value
			});
		}
	});
	
};

function send_server_url(){
	let params = {active: true,currentWindow: true}

	chrome.tabs.query(params, (tabs) => {
		var url = (tabs[0].url);
	
		fetch('http://localhost:5000/getAccount', {
			method: 'post',
			body: JSON.stringify({url: `${url}`}),
			headers : {
				"Content-Type" : "application/json; charset=utf-8"
			}

		}).then((res) => {
			return res.json();
		}).then((data) => {
			send_data(data.web_username, data.web_password);
		});
	});
}
function get_url(){
	let params = {
		active: true,
		currentWindow: true
	}
	chrome.tabs.query(params, (tabs) => {
		const url = (tabs[0].url);
		//alert(url);
		return url;
	});
}
function send_data(username, password) {
	let params = {
		active: true,
		currentWindow: true
	}
	chrome.tabs.query(params, (tabs) => {
		let message = {url: tabs[0].url, username : username, password: password};
		chrome.tabs.sendMessage(tabs[0].id, message);
	});
}
/*fetch('http://localhost:5000/check', {method: 'get'}).then((res) => {
			return res.json();
		}).then((data) => {
			console.log(data);
		});*/

/*
{
	"name": "password_manager",
	"version": "1.0",
	"manifest_version": 2,
	"background":{
		"scripts": ["background.js"]
	},
	"background": "background.html",
	"content_scripts": [
		{
			"matches": ["<all_urls>"],
			"js": ["content.js"]
		}
	],
	
	/*"browser_action":{
		"default_popup": "pop.html",
		"default_title": "password_manager"
	},
	"permissions":["http://localhost:5000/*", "tabs", "storage", "activeTab"]
}*/