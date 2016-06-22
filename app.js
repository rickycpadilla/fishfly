// TO DO NEXT (as of Tuesday June 21):
// 1. Sort results based on distance from user input.
// 2. Stylize result list.
// 3. Add specific, additional info for each result - either separate page or lightbox.
// 4. Link markers to additional info as well.
// 5. Finish stylizing home page and results page.

function getCFS(stationId, id){
  $.getJSON("https://data.colorado.gov/resource/a97x-8zfv.json", function( data ){
    for (var i = 0; i < data.length; i++){
      if(data[i].usgs_station_id == stationId){
        $("<span>CFS: " + data[i].amount + " </span>").appendTo("#weath" + id);
      }
    }
  } )
};

function getWeather(lat, lng, id){
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=4756af9614c9971a6c4c4b17ef4630fe", function(data){
    var weatherCond = data.weather[0].description;
    //$("<span>" + weatherCond + " </span>").appendTo("#weath" + id);
    if(data.wind.speed){
      var windSpeed = data.wind.speed + " MPH";
      $("<span>Wind: " + windSpeed + " </span>").appendTo("#weath" + id);
    };
    if(data.main.temp){
      var currentTemp = ((data.main.temp) * (9/5) - 459.67).toFixed(0) + " F";
      $("<span>Temp: " + currentTemp + " </span>").appendTo("#weath" + id);
    }
  });
};

function makeMarkers(lat, lng, name){
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      title: 'Hello World!'
  });
  markerMsg(marker, name);
};

function markerMsg(marker, message) {
  var infowindow = new google.maps.InfoWindow({
    content: message
  });
  marker.addListener('click', function() {
    infowindow.open(marker.get('map'), marker);
  });
}

function getBaseData() {
  $.getJSON( "https://firebasestorage.googleapis.com/v0/b/fishfly-53334.appspot.com/o/spots.json?alt=media&token=3fc71264-588c-4bc6-a5e6-be2d968d8eb5", function(data){
    for(var i = 0; i<data.length; i++){
      $("<div style='position:relative' id='div"+data[i].id+"'></div>").appendTo("#datapage");
      getWeather(data[i].lat, data[i].lng, data[i].id);
      getCFS(data[i].stationid, data[i].id);
      var imgCode = $("<img src='" + data[i].img + "' class='photo'/>");
      imgCode.appendTo("#div" +data[i].id);
      $("<div style='width: 100%; height: 60px; background-color: black; margin: -64px 0px 0px 0px; position: absolute; opacity: 0.6' class='blackbox'></div>").appendTo("#div" +data[i].id);
      $("<div style='position:absolute; text-align:center; width: 100%; margin-top: -40px; color: white' id='weath" + data[i].id +"'></div>").appendTo("#div" +data[i].id);
      $("<h2 id='" + data[i].id +"'>" + data[i].name + " </h2>").appendTo("#div" +data[i].id);
      $("<h4 id='" + data[i].id +"'>" + data[i].loc + " </h4>").appendTo("#div" +data[i].id);
      makeMarkers(data[i].lat, data[i].lng, data[i].name);
    }
  })
};


// come back to this when ready to sort based on distance
function distance(lat1, lon1, lat2, lon2) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 +
          c(lat1 * p) * c(lat2 * p) *
          (1 - c((lon2 - lon1) * p))/2;

  console.log(12742 * Math.asin(Math.sqrt(a)))// 2 * R; R = 6371 km
}

var map;
function initMap(){
  var userInput = $("#destination").val();
  var geocoder = new google.maps.Geocoder();
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
  distance(userLat[0], userLng[0], 39.249, -106.348111)
}
})
};

$(window).bind("load", function () {
    getBaseData(  );
  });

$( "#target" ).submit(function( event ) {
  event.preventDefault();
  $("#datapage").html("");
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
        zoom: 9
      });
    }
  })
  getBaseData(  );
});
