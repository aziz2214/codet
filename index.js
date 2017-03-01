var express = require('express')
var handlebars = require('express-handlebars'); 
var MongoClient = require('mongodb').MongoClient; 
var bodyParser = require('body-parser'); 
var app = express(); 

var server = require('http').Server(app);
var io = require('socket.io')(server);
server.listen(process.env.PORT || 3000);







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
    server.listen(process.env.PORT || 3000); 
}); 



io.on('connection', function(client) {    // SOCKET.IO // 
  client.on('message', function(data) {
    console.log('message recieved', data);
    client.broadcast.emit('message', data);
  });

});

// --> Begin EXPRESS --------
app.get('/', function(req, res) { 
    db.collection("notes").find().toArray(function(err, results) {
        res.render('home', {results: results}); 
        //console.log(results); 
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

app.get('/live', function(req, res) { 
    res.render('live'); 
}); 

app.post('/live', function(req, res) { 
    console.log(req.body.username); 
    socket.emit('message', req.body.username); 
})

