// npm install express from command line in folder for the application.
var express = require('express');
var app = express(); // can now use functions in express module in server.js file.
var mongojs = require('mongojs');
var db = mongojs('contactlist', ['contactlist']);
var bodyParser = require('body-parser');

// check that server is listening.
// app.get('/', function(req, res) {
//   res.send('Hello World from server.js');
// });

app.use(express.static(__dirname + '/public')); //look for static html, image, etc files.

// so our server can parse the body of the input it receives.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());﻿

// check that server is listening.
app.get('/contactlist', function(req, res) {
  console.log('I received a GET request!');

  // // make contacts - if they're here they are returned by the server
  // person1 = {
  //   name: 'Sarah',
  //   email: 'sarah@email1.com',
  //   number: '(111) 111-1111'
  // };
  //
  // person2 = {
  //   name: 'Emily',
  //   email: 'emily@email2.com',
  //   number: '(222) 222-2222'
  // };
  //
  // person3 = {
  //   name: 'Lucas',
  //   email: 'lucas@email3.com',
  //   number: '(333) 333-3333'
  // };
  //
  // // make array.
  // var contactlist = [person1, person2, person3];
  // res.json(contactlist); // json format is how the response is sent back.

db.contactlist.find(function(err, docs) { // error or docs(which is contents from the database)
  console.log(docs); // make sure we receive the data from the database.
  res.json(docs); // response res.json sends the data back to the controller.
});

});

app.post('/contactlist', function(req, res) { // app.post request listens to the app request from the controller.
  console.log(req.body); // prints the data received on the command prompt. Need to parse the body of the input. We need to npm install body-parser to teach the server how to parse the body of the input.(DEPRECATE FUNCTION?!)

  // now insert the data the user input into the mongodb database.
  db.contactlist.insert(req.body, function(err, doc) {
    res.json(doc); // send this data back to the controller.
  });
});

app.delete('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id: mongojs.ObjectId(id)}, function(err, doc) {
    res.json(doc);
  });
});

app.get('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id: mongojs.ObjectId(id)}, function(err, doc) { // findOne gets the id that we want
    res.json(doc); // sends back all the data for the contact we requested.
  });
});

app.put('/contactlist/:id', function (req, res) {
  var id = req.params.id;
  console.log(req.body.name);
  // findAndModify updates the id we want. new: true means the new update is TRUE (?)
  db.contactlist.findAndModify({query: {_id: mongojs.ObjectId(id)},
    update: {$set: {name: req.body.name, email: req.body.email, number: req.body.number}},
    new: true}, function (err, doc) {
      res.json(doc);
    });
});

app.listen(3000);

console.log('Server running on port 3000');
