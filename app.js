// FIRST ITERATION =
// 1. display all data snippets and map
// 2. No search capability

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
    if(data.wind.speed){var windSpeed = data.wind.speed + " MPH";}
    // console.log(windSpeed);
    if(data.main.temp){var currentTemp = ((data.main.temp) * (9/5) - 459.67).toFixed(0) + " F";}
    var weatherCond = data.weather[0].description;
    // console.log(currentTemp);
    // console.log(weatherCond);
  });
};

function makeMarkers(lat, lng){
    console.log("markers");
    new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      title: 'Hello World!'
  })
}

function getBaseData() {
  $.getJSON( "https://firebasestorage.googleapis.com/v0/b/fishfly-53334.appspot.com/o/spots.json?alt=media&token=a8f6c4b7-2c78-410b-aeaa-70732c2122d2", function(data){
    for(var i = 0; i<data.length; i++){
      // console.log("****************");
      // console.log(data[i].name);
      getCFS(data[i].stationid);
      getWeather(data[i].lat, data[i].lng);
      makeMarkers(data[i].lat, data[i].lng)
    }
  })
};


var map;
function initMap(){
  var userInput = $("#destination").val();
  var geocoder = new google.maps.Geocoder();
  var userLat = [];
  var userLng = [];
  geocoder.geocode({ 'address' : userInput }, function(results, status) {
      var userLat = [];
      var userLng = [];
  if(status == "ZERO_RESULTS") {
    //Indicate to user no location has been found
    console.log("nope!");
  } else {
  userLat.push(results[0].geometry.location.lat());
  userLng.push(results[0].geometry.location.lng());
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: userLat[0], lng: userLng[0]},
    zoom: 9
  });
}
})
getBaseData(  );
// Why don't the markers load when first loading page? They load when submitting page 2 form.
};

$( "#target" ).submit(function( event ) {
  event.preventDefault();
  var userLat = [];
  var userLng = [];
  var userInput = $("#destination").val();
  var geocoder = new google.maps.Geocoder();
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
        zoom: 8
      });
    }
  })
  getBaseData(  );
});
