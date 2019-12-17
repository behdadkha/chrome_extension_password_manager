console.log("back is running");
var user = false;
chrome.runtime.onMessage.addListener((request, sender, sendres) =>{
    user = (request == "True");
});
var url = ""; //to prevent multiple fire of onUpdated listener=
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    
    //chrome.runtime.onConnect.addListener(function(port){
        if(user && changeInfo.status == "complete"){
        
            
            url = tab.url;
            console.log(url);
            fetch('http://localhost:5000/getAccount', {
                method: 'post',
                body: JSON.stringify({url: `${url}`}),
                headers : {
                    "Content-Type" : "application/json; charset=utf-8"
                }

            }).then((res) => {
                return res.json();
            }).then((data) => {
                
                var msg = {url: url, username : data.web_username, password: data.web_password};
                chrome.tabs.sendMessage(tab.id, msg);  
                
                //port.postMessage({url: url, username : data.web_username, password: data.web_password});
                //send_data(data.web_username, data.web_password);
                //port.postMessage({greeting: "hello", url: tabs.url, username : username, password: password});
            });
        
        }
    
    //});
});
