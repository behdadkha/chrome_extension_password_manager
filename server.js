var mysql = require('mysql');
const http = require('http');
const express = require('express');
const bodyParser = require('body-parser');

const crypto = require('crypto');



const app = express();
app.use(bodyParser.json());

//database connection
var con = mysql.createConnection({
	host: "localhost",
	user: "root",
    password: "password",
    database: "password_manager"
});

con.connect((err) => {
	if(err) throw err;
	console.log("connected");
});

function check_password(username, password){
    con.query(`SELECT password FROM user WHERE username = '${username}'`, (err,result,field) => {
        //if(err) throw err;
        const encrypted_pass = crypto.createHash('sha256').update(password).digest('hex');
        if(encrypted_pass == result[0].password){
            return "true";
        }else{
            return "false";
        }
    });
}

var username = "";
var password = "";
app.post('/check', (req,res) => {
    const input = req.body;
    username = input.username;
    password = input.password;
    con.query(`SELECT password FROM user WHERE username = '${input.username}'`, (err,result,field) => {
       if(err) throw err;
        const encrypted_pass = crypto.createHash('sha256').update(input.password).digest('hex');
        if(encrypted_pass == result[0].password){
            res.json("True");
        }else{
            res.json("False");
        }
    });
    
    
});



app.post('/getAccount', (req,res) => {
    const url = req.body;
    //check the password first
   
    if(username != ""){
        con.query(`SELECT password FROM user WHERE username = '${username}'`, (err,result,field) => {
            if(err) throw err;
            const encrypted_pass = crypto.createHash('sha256').update(password).digest('hex');
            
            if(encrypted_pass == result[0].password){
                con.query(`SELECT * FROM website WHERE username = '${username}'`, (err,result,field) => {
                    var i;
                    for(i = 0; i < result.length; i++){
                        if((url.url).toLowerCase().includes(result[i].URL.toLowerCase()) || (result[i].URL.toLowerCase()).includes((url.url).toLowerCase())){
                            res.json(result[i]);
                        }
                    }
                    
                });

            }else{
                console.log("incorrect password ");
            }
        });
    }
    
});

app.post('/AddUser', (req,res) => {
    const data = req.body;
    //check the password first
   
    if(username != ""){
        con.query(`SELECT password FROM user WHERE username = '${username}'`, (err,result,field) => {
            if(err) throw err;
            const encrypted_pass = crypto.createHash('sha256').update(password).digest('hex');
            
            if(encrypted_pass == result[0].password){
                var query = `INSERT into website(username, URL, web_username, web_password) 
                            VALUES ('${username}', '${data.website}', '${data.username}', '${data.password}');`
                con.query(query, (err,result) => {
                    console.log(err);
                });

            }else{
                console.log("incorrect password ");
            }
        });
    }
    
});

app.listen(5000, () => {
    console.log('server is running');
});