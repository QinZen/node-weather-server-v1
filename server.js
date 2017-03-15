const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
var app = express();

app.set('view engine','hbs');


hbs.registerPartials(__dirname + '/views/partials');

hbs.registerHelper('currentYear',()=>{
  return new Date().getFullYear() + ' year';
});

hbs.registerHelper('scream',(text)=>{
  return text.toUpperCase();
});

app.use((req,res,next)=>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname + '/public'));

app.use((req,res,next)=>{
  var now = new Date().toString();
  var url = req.url;
  var method = req.method;
  console.log(`now: ${now} ,method: ${method}, url: ${url}`);
  fs.appendFile('log.txt',`now: ${now} ,method: ${method}, url: ${url}` + '\n',(err)=>{
    if(err){
      console.log("something wrong");
    }
  });
  next();
});

app.get('/',(req,res)=>{
  res.render('home.hbs',{
    pageTitle: "Home page",
    welcomeMessage :"Hi this is welcome message",
  });
})

app.get('/about',(req,res)=>{
  res.send('<h1>Hi! This is about page</hi>');
})

app.listen(3000);
