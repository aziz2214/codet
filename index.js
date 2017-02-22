var express = require('express')
var handlebars = require('express-handlebars'); 

var MongoClient = require('mongodb').MongoClient; 
var bodyParser = require('body-parser'); 

var app = express(); 


app.engine('handlebars', handlebars( { 
        defaultLayout: 'main'
})); 

app.set('view engine', 'handlebars'); 

var db; 

MongoClient.connect('mongodb://admin:admin123@ds013966.mlab.com:13966/codet-db',  function(err, database){ 
    if (err) return console.log(err); 
    
    db = database; 
    app.listen(process.env.PORT || 3000); 
}); 



app.get('/', function(req, res) { 
    console.log("Whatsup!"); 
})

