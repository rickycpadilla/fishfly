// COLORADO GOV API


function getInitialData(callback) {
  return $.getJSON( "https://data.colorado.gov/resource/a97x-8zfv.json", function (results) {
    return callback(results);
  });
}

function storeCoordinates(data, callback) {
  var latsLongs = [];
  $.each( data, function( index, val ) {
    if (index < 20){ // remove this to go through all data points
    if("location" in val){
      latsLongs.push([val.location.coordinates[1], val.location.coordinates[0]]);
      var station = (val.station_name + " " + val.amount + " CFS ");
      // WEATHER UNDERGROUND API
    showWeatherData(val.location.coordinates[1], val.location.coordinates[0], station)
    };
    }
  });
  return latsLongs;
}

function showWeatherData(lat, long, station) {
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + long + "&APPID=4756af9614c9971a6c4c4b17ef4630fe", function(data){
    var tempFahr = ((data.main.temp) * (9/5) - 459.67).toFixed(0);
    $("<li>" + station + tempFahr + " degrees</li>").appendTo("#datapage");
  });
}



var map;
function initMap() {
  getInitialData(function( data ) {
    var latsLongs = storeCoordinates(data);
    //GEOCODER NEW CODE
    var userLat = [];
    var userLng = [];
    var geocoder = new google.maps.Geocoder();
    //search is a string, input by user (replace my address with user input)
    geocoder.geocode({ 'address' : "2960 Dahlia St, Denver, CO" }, function(results, status) {
      if(status == "ZERO_RESULTS") {
        //Indicate to user no location has been found
        console.log("nope!");
      } else {
        //Do something with resulting location(s)
        userLat.push(results[0].geometry.location.lat());
        userLng.push(results[0].geometry.location.lng());
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: userLat[0], lng: userLng[0]},
          zoom: 9
        });
        for (var i = 0; i < latsLongs.length; i++) {
          new google.maps.Marker({
            position: {lat: latsLongs[i][0], lng: latsLongs[i][1]},
            map: map,
            title: 'Hello World!'
          });
        }

      }
    })

  });
  $( "#target" ).submit(function( event ) {
    event.preventDefault();
    var userLat = [];
    var userLng = [];
    var userInput = $("#destination").val();
    var geocoder = new google.maps.Geocoder();
    //search is a string, input by user (replace my address with user input)
    geocoder.geocode({ 'address' : userInput }, function(results, status) {
      if(status == "ZERO_RESULTS") {
        //Indicate to user no location has been found
        console.log("nope!");
      } else {
        //Do something with resulting location(s)
        userLat.push(results[0].geometry.location.lat());
        userLng.push(results[0].geometry.location.lng());
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: userLat[0], lng: userLng[0]},
          zoom: 9
        });
        for (var i = 0; i < latsLongs.length; i++) {
          new google.maps.Marker({
            position: {lat: latsLongs[i][0], lng: latsLongs[i][1]},
            map: map,
            title: 'Hello World!'
          });
        }

      }
    })

  });
}

function customizeMap(userInput) {

}

// // GOOGLE MAPS API
// var map;
// function initMap() {
// setTimeout(function(){
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: latsLongs[0][0], lng: latsLongs[0][1]},
//     zoom: 7
//   });
//   for (var i = 0; i < latsLongs.length; i++) {
//     new google.maps.Marker({
//       position: {lat: latsLongs[i][0], lng: latsLongs[i][1]},
//       map: map,
//       title: 'Hello World!'
//     });
//   }
//
// }, 1000);
// }
// //DO NOT EDIT CODE ABOVE THIS LINE/////////////////
