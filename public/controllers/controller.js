
var app = angular.module("myApp", []);
app.controller("AppCtrl", function($scope, $http) {

  console.log("Hello from controller");

  // function to refresh page so new record displays.
  var refresh = function() {
    // the route from the server we are going to get.
    $http.get('/contactlist').success(function(response) {
      console.log('I got the data I requested via GET request');
      $scope.contactlist = response;
      $scope.contact = ""; // clears input boxes after refresh called.
    });
  };

  refresh(); // to load data from the database initially.

  // // scope: the glue between application controller and the view (index.html in this case).
  // // The below now lets us use the variable contactList in our index.html file (reminds me of Laravel blade variables)
  $scope.addContact = function() {
    console.log($scope.contact);
    $scope.contact._id=""; // if user clicks Add Contact for an existing record that was loaded with "edit" button into the form,
    // this ensures a new ID record is created.
    $http.post('/contactlist', $scope.contact).success(function(response) {
      // get response from the server as the argument for the function.
      console.log(response); // prints the response received from the server to the console log.
      refresh(); // refresh page to reload the data from the database.
    });
  };

  $scope.remove = function(id) {
    console.log(id);
    $http.delete('/contactlist/' + id).success(function(response) {
      refresh();
    });
  };

  $scope.edit = function(id) {
    console.log(id);
    $http.get('/contactlist/' + id).success(function(response) {
      $scope.contact = response; // put the response into the contact input box fields.
    });
  };

  $scope.update = function(id) {
    console.log($scope.contact._id);
    $http.put('/contactlist/' + $scope.contact._id, $scope.contact).success(function(response) {
      refresh();
    });
  }

  $scope.deselect = function() {
    $scope.contact = "";
  }

  // // make contacts. If they are here they are returned by the javascript file.
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
  //
  // // put data from array into html table.
  //
  // // scope: the glue between application controller and the view (index.html in this case).
  // // The below now lets us use the variable contactList in our index.html file (reminds me of Laravel blade variables)
  // $scope.contactlist = contactList;

});﻿

// OLD CODE taught from tutorial but gives undefined function problem:
// function = AppCtrl() {
//   console.log('Hello from Controller');
// }
