// FIRST ITERATION =
// 1. display all data snippets and map
// 2. No search capability

function getBaseData(){
  $.getJSON("https://firebasestorage.googleapis.com/v0/b/fishfly-53334.appspot.com/o/spots.json?alt=media&token=a8f6c4b7-2c78-410b-aeaa-70732c2122d2", function(data){
    return data;
  })
}

function getCFS(stationId){
  $.getJSON("https://data.colorado.gov/resource/a97x-8zfv.json", function( data ){
    for (var i = 0; i < data.length; i++){
      if(data[i].usgs_station_id === stationId.toString()){
        return data[i].amount + " " + data[i].units
      }
    }
  } )
};

function getWeather(lat, lng){
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=4756af9614c9971a6c4c4b17ef4630fe", function(data){
    console.log(data);
    var windSpeed = data.wind.speed + " MPH";
    console.log(windSpeed);
    var currentTemp = ((data.main.temp) * (9/5) - 459.67).toFixed(0) + " F";
    var weatherCond = data.weather[0].description;
    console.log(currentTemp);
    console.log(weatherCond);
  });
};

console.log(getBaseData());


//////

// var map;
// function initMap() {
// setTimeout(function(){
//
//   //GEOCODER NEW CODE
//   var userLat = [];
//   var userLng = [];
//   var geocoder = new google.maps.Geocoder();
//   //search is a string, input by user (replace my address with user input)
//   geocoder.geocode({ 'address' : "2960 Dahlia St, Denver, CO" }, function(results, status) {
//     if(status == "ZERO_RESULTS") {
//       //Indicate to user no location has been found
//       console.log("nope!");
//     } else {
//       //Do something with resulting location(s)
//       userLat.push(results[0].geometry.location.lat());
//       userLng.push(results[0].geometry.location.lng());
//       map = new google.maps.Map(document.getElementById('map'), {
//         center: {lat: userLat[0], lng: userLng[0]},
//         zoom: 9
//       });
//       for (var i = 0; i < latsLongs.length; i++) {
//         new google.maps.Marker({
//           position: {lat: latsLongs[i][0], lng: latsLongs[i][1]},
//           map: map,
//           title: 'Hello World!'
//         });
//       }
//
//     }
//   })
//   $( "#target" ).submit(function( event ) {
//     event.preventDefault();
//     var userLat = [];
//     var userLng = [];
//     var userInput = $("#destination").val();
//     var geocoder = new google.maps.Geocoder();
//     //search is a string, input by user (replace my address with user input)
//     geocoder.geocode({ 'address' : userInput }, function(results, status) {
//       if(status == "ZERO_RESULTS") {
//         //Indicate to user no location has been found
//         console.log("nope!");
//       } else {
//         //Do something with resulting location(s)
//         userLat.push(results[0].geometry.location.lat());
//         userLng.push(results[0].geometry.location.lng());
//         map = new google.maps.Map(document.getElementById('map'), {
//           center: {lat: userLat[0], lng: userLng[0]},
//           zoom: 9
//         });
//         for (var i = 0; i < latsLongs.length; i++) {
//           new google.maps.Marker({
//             position: {lat: latsLongs[i][0], lng: latsLongs[i][1]},
//             map: map,
//             title: 'Hello World!'
//           });
//         }
//
//       }
//     })
//
//   });
//
//
// }, 1000);
// }
