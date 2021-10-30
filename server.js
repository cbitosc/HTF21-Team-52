var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const { readlink } = require('fs');
//var routs = require('./server11');
// const { Router } = require('@angular/router');
// var route =require('route')
const port = 3178;
var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'saitejacp@123',
	database : 'hackathon'

});
connection.connect(function(err){
	console.log("connecteddddddd");
	console.log('port number is',port)
});

var app = express();
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));

app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

app.get('/', function(request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
});


app.get('/register1', function(request, response) {
	response.sendFile(path.join(__dirname + '/register.html'));
});

app.get('/staff', function(request, response) {
	response.sendFile(path.join(__dirname + '/staffLogin.html'));
});

app.get('/admin', function(request, response) {
	response.sendFile(path.join(__dirname + '/staffLogin.html'));
});


app.get('/home', function(request, response) {
	response.sendFile(path.join(__dirname + '/home.html'));
});


app.post('/register', function(request, response) {
//console.log(request.body.sid);

	var names = request.body.names;
	var sid = request.body.sid;
	var email =request.body.email;
    var phone = request.body.phone;
	var passwords = request.body.passwords;  
  
	   console.log(names,sid,email,phone,passwords)
  
  
  
		if (names&&sid&&email&&phone&&passwords) {
			console.log("hiii");
		   
		   connection.query("INSERT INTO staff (name,staffid,emailid,password,mobileno) VALUES ( '"+names+"','"+sid+"','"+email+"','"+passwords+"','"+phone+"')",function(err, results){
  
				if (err){
					throw err
				}
				else {
				  response.redirect('/home');
		  
				} 
			});
																																																		
		   }
		   else {
			console.log(err);
  
	   }
  });
  
  
app.post('/register', function(request, response) {
	//console.log(request.body.sid);
	
		var names = request.body.names;
		var sid = request.body.sid;
		var email =request.body.email;
		var phone = request.body.phone;
		var passwords = request.body.passwords;  
	  
		   console.log(names,sid,email,phone,passwords)
	  
	  
	  
			if (names&&sid&&email&&phone&&passwords) {
				console.log("hiii");
			   
			   connection.query("INSERT INTO staff (name,staffid,emailid,password,mobileno) VALUES ( '"+names+"','"+sid+"','"+email+"','"+passwords+"','"+phone+"')",function(err, results){
	  
					if (err){
						throw err
					}
					else {
					  response.redirect('/staff');
			  
					} 
				});
																																																			
			   }
			   else {
				console.log(err);
	  
		   }
	  });

	  app.post('/staffLog', function(request, response) {
		//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
		//var password = request.body.password;                      |         |
		//var username = request.body.username;                      |---------|
		//var attachmentid = request.body.attachmentid;           
		//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
		var sid = request.body.sid;
		var passwords = request.body.passwords;
		var sql ="select staffid from staff  where staffid ='"+sid+"' and password='"+passwords+"'";
		connection.query(sql,function(err,results){
			if (err) {
				throw err;
			}
			  else if (Object.values(results[0])==sid) { 
			  response.redirect('/home');
	
			 }
	
			 
	
		})
	
	
	});
	

	// app.post('/adminLog', function(request, response) {
	// 	//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	// 	//var password = request.body.password;                      |         |
	// 	//var username = request.body.username;                      |---------|
	// 	//var attachmentid = request.body.attachmentid;           
	// 	//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
	
	// 	var sid = request.body.sid;
	// 	var passwords = request.body.passwords;
	// 	var sql ="select password from admin  where userid ='"+sid+"' and password='"+passwords+"'";
	// 	connection.query(sql,function(err,results){
	// 		if (err) {
	// 			throw err;
	// 		}
	// 		  else if (Object.values(results[0])==sid) { 
	// 		  response.redirect('/home');
	
	// 		 }
	
			 
	
	// 	})
	
	
	// });




	app.post('/sd',function(request,response){
		connection.query("select * from staff  ", function(err,data,fields){
			if(err){
				throw err;
																																												
			}
			 else{
				response.send(data);
				console.log(response.send(data));
			 }
		})  
	})
   
   


app.listen(port);
console.log('done!!!!');
