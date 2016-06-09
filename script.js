function getBaseData(callback){
  return $.getJSON("https://data.colorado.gov/resource/a97x-8zfv.json", function( data ){
    return callback(data);
  })
}

function getWeatherData(lat, lng, callback){
  $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=4756af9614c9971a6c4c4b17ef4630fe", function(data){
    return callback(data)
  });
}

function storeBaseData(data){
  var baseData = {};
    $.each(data, function(index, val){
        if (index < 20){ // remove this to go through all data points
          if("location" in val){
            return getWeatherData(val.location.coordinates[1], val.location.coordinates[0], function (results) {
              baseData[val.station_name] = {
                lat : val.location.coordinates[1],
                lng : val.location.coordinates[0],
                cfs : val.amount,
                temp : ((results.main.temp) * (9/5) - 459.67).toFixed(0)
              }
            //console.log(getWeatherData(val.location.coordinates[1], val.location.coordinates[0]));
            return baseData
          })
        }
      }
    })
}

function appendResults(station, cfs, temp){
  $("<li>" + station + cfs + temp + " degrees</li>").appendTo("#datapage");
}

function geoFunc(userInput, baseDataVar){
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address' : userInput }, function(results, status) {
    var userLat = [];
    var userLng = [];
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

      for(key in baseDataVar){
        new google.maps.Marker({
          position: {lat: baseDataVar[key].lat, lng: baseDataVar[key].lng},
          map: map,
          title: 'Hello World!'
        });
      }
      for(key in baseDataVar){
        appendResults(key, baseDataVar[key].cfs, baseDataVar[key].temp)
      }
    }
  })
}

var map;
function initMap() {
  getBaseData(function(data){
    storeBaseData(data, function (results) {

      // console.log("*******");
      // console.log(results);
      var userInput = $("#destination").val();
      geoFunc(userInput, baseDataVar);
      $( "#target" ).submit(function( event ) {
        var userInput = $("#destination").val();
        event.preventDefault();
        geoFunc(userInput, baseDataVar)
      });
    })
    });
}
