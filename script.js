var latsLongs = [];

$.getJSON( "https://data.colorado.gov/resource/a97x-8zfv.json", function( data ) {
  var weathData = [];
  var items = [];

  $.each( data, function( index, val ) {
    if (index < 10){ // remove this to go through all data points

    if("location" in val){
      latsLongs.push([val.location.coordinates[1], val.location.coordinates[0]]);
      $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + val.location.coordinates[1] + "&lon=" + val.location.coordinates[0] + "&APPID=4756af9614c9971a6c4c4b17ef4630fe", function(data){
        var tempFahr = ((data.main.temp) * (9/5) - 459.67).toFixed(0);
        var station = (val.station_name + " " + val.amount + " CFS ");
        $("<li>" + station + tempFahr + " degrees</li>").appendTo("#datapage");
      });
    };
    }
  });
});

//setTimeout(function(){
// GOOGLE MAP
// API Key: AIzaSyBbgYjdxWVT6_5SdZKBrauuv0-mHse6x2g
var map;
function initMap() {
setTimeout(function(){
  var latLng1 = {lat: latsLongs[0][0], lng: latsLongs[0][1]};
  var latLng2 = {lat: latsLongs[1][0], lng: latsLongs[1][1]};
  var latLng3 = {lat: latsLongs[2][0], lng: latsLongs[2][1]};
  var latLng4 = {lat: latsLongs[3][0], lng: latsLongs[3][1]};
  var latLng5 = {lat: latsLongs[4][0], lng: latsLongs[4][1]};
  map = new google.maps.Map(document.getElementById('map'), {
    center: latLng1,
    zoom: 7
  });

  var marker1 = new google.maps.Marker({
    position: latLng1,
    map: map,
    title: 'Hello World!'
  });
  var marker2 = new google.maps.Marker({
    position: latLng2,
    map: map,
    title: 'Hello World!'
  });
  var marker3 = new google.maps.Marker({
    position: latLng3,
    map: map,
    title: 'Hello World!'
  });
  var marker4 = new google.maps.Marker({
    position: latLng4,
    map: map,
    title: 'Hello World!'
  });
  var marker5 = new google.maps.Marker({
    position: latLng5,
    map: map,
    title: 'Hello World!'
  });

}, 1000);
}

//}, 1000);
