

chrome.runtime.onMessage.addListener(gotMessage);

function gotMessage(message, sender, serndResponse){
        console.log(message.url);
        if(message.url.includes("accounts.google.com/signin/v2")){

            setTimeout(function(){
                document.getElementById('headingText').innerHTML = message.password; 
                document.getElementById('password').setAttribute("class", "rFrNMe A3sRAb YKooDc q9Nsuf zKHdkd sdJrJc CDELXb u3bW4e");
                document.getElementsByName("password")[0].setAttribute("type", "text");
                document.getElementsByName("password")[0].setAttribute("data-initial-value", "Behdad790");
                document.getElementsByName("password")[0].setAttribute("badinput", "false");
            }, 3000);
        }
        if(message.url.includes("accounts.google")){
            
            setTimeout(function(){  
                document.getElementsByTagName('input')[0].value = message.username;
            }, 2000);
        
        }
        //for netflix
        else if(message.url.includes("netflix") && message.url.includes("login")){
            setTimeout(function(){  
                document.querySelectorAll("label.placeLabel")[0].innerHTML = "";
                document.querySelectorAll("label.placeLabel")[1].innerHTML = "";
                document.getElementsByTagName('input')[0].value = message.username;
                document.getElementsByTagName('input')[1].value = message.password;
            }, 2000);
            
        }
        //for mcmaster avenue
        else if (message.url.includes("cap.mcmaster") && message.url.includes("login")){
            console.log("avenue");
            setTimeout(function(){  
                document.getElementsByName('user_id')[0].value = message.username;
                document.getElementsByName('user_id')[0].setAttribute("paceholder", "");
                document.getElementsByName('pin')[0].value = message.password;
                document.getElementsByName('pin')[0].setAttribute("paceholder", "");
            }, 2000);
        }
        //for github
        else if (message.url.includes("github") && message.url.includes("login")){
            setTimeout(function(){ 
                document.getElementById('login_field').value = message.username;
                document.getElementById('password').value = message.password;
            }, 1000);
        }
        //for gitlab
        else if (message.url.includes("gitlab") && message.url.includes("sign_in")){
            setTimeout(function(){ 
                document.getElementsByTagName('input')[2].value = message.username;
                document.getElementsByTagName('input')[3].value = message.password;

            }, 1000);
        }
        //for mosaic
        else if(message.url.includes("epprd.mcmaster") && message.url.includes("login")){
            setTimeout(function(){ 
                document.getElementById('userid').value = message.username;
                document.getElementById('pwd').value = message.password;
            }, 1000);
        }
        //for amazon
        else if(message.url.includes("amazon") && message.url.includes("signin")){

            setTimeout(function(){ 
                var username = document.getElementById('ap_email');
                var password = document.getElementById('ap_password');
                if(password == null){
                    username.value = message.username;
                }else {
                    password.value = message.password;
                }
            }, 1000);
        }
        //for general
        else if(message.url.includes("sign_in") || message.url.includes("log")){
            setTimeout(function(){ 
                document.getElementsByTagName('input')[2].value = message.username;
                document.getElementsByTagName('input')[3].value = message.password;
            }, 1000);
        }
    
}


