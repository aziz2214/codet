var express = require('express')
var handlebars = require('express-handlebars'); 
var MongoClient = require('mongodb').MongoClient; 
var bodyParser = require('body-parser'); 

var app = express(); 

app.use(bodyParser.urlencoded({extended:true})); 
app.use(express.static('public')); 

app.engine('handlebars', handlebars( { 
        defaultLayout: 'main'
})); 
app.set('view engine', 'handlebars'); 


var db; 

MongoClient.connect('mongodb://admin:admin123@ds013206.mlab.com:13206/codet-db',  function(err, database){ 
    if (err) return console.log(err); 
    db = database; 
    app.listen(process.env.PORT || 3000); 
}); 

//
//app.get('/', function(req, res) { 
//    res.render('home'); 
//})


app.get('/', function(req, res) { 
    db.collection("notes").find({}).toArray(function(err, results) { 
        res.render('home', {notes: results}); 
        console.log(results); 
    }); 

}); 


app.get('/new', function(req, res) { 
    res.render('new'); 
})

app.post('/new', function(req, res) { 
    var new_note = { 
        subject: req.body.subject.trim(), 
        note: req.body.note
    }; 
    if(new_note.subject != '' && new_note.note != '') { 
        db.collection('notes').insert(new_note, function(err, result) {
            res.redirect('/');         
        }); 
    }     
}); 



