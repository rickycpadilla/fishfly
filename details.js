// function getCFS(stationId, id){
//   $.getJSON("https://data.colorado.gov/resource/a97x-8zfv.json", function( data ){
//     for (var i = 0; i < data.length; i++){
//       if(data[i].usgs_station_id == stationId){
//         $("<span>Flow: " + data[i].amount + " CFS</span>").appendTo("#rightw" + id);
//       }
//     }
//   } )
// };
//
// function getWeather(lat, lng, id){
//   $.getJSON("http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lng + "&APPID=4756af9614c9971a6c4c4b17ef4630fe", function(data){
//     if(data.main.temp){
//       var weatherCond = data.weather[0].description.replace(/ /g,"");
//       var icon = $("<img src='/images/icons/" + weatherCond + ".png' style='width: 35px; margin-right:5px' class='icon'/>");
//       icon.appendTo("#leftw" + id);
//       var currentTemp = ((data.main.temp) * (9/5) - 459.67).toFixed(0);
//       $("<span style='font-size: 36px;'>" + currentTemp + "&deg</span>").appendTo("#leftw" + id);
//     }
//     if(data.wind.speed){
//       var windSpeed = data.wind.speed + " MPH";
//       $("<span>Wind: " + windSpeed + "</span><br>").appendTo("#rightw" + id);
//     };
//   });
// };
//
// function makeMarkers(lat, lng, name){
//     var marker = new google.maps.Marker({
//       position: {lat: lat, lng: lng},
//       map: map,
//       title: 'Hello World!'
//   });
//   markerMsg(marker, name);
// };
//
// function markerMsg(marker, message) {
//   var infowindow = new google.maps.InfoWindow({
//     content: message
//   });
//   marker.addListener('click', function() {
//     infowindow.open(marker.get('map'), marker);
//   });
// }

function getBaseData() {
  $.getJSON( "https://firebasestorage.googleapis.com/v0/b/fishfly-53334.appspot.com/o/spots.json?alt=media&token=3fc71264-588c-4bc6-a5e6-be2d968d8eb5", function(data){
    for(var i=0; i<data.length; i++){
      if((data[i].name + " " + data[i].loc).toUpperCase() === $("#destination").val().trim()){
        // detailPage(data[i].img);
        // console.log(data[i].img);
        // $("#top").css("background", ("url(" + data[i].img + ") no-repeat center center fixed;"))
        $("#top").css("background", "url(" + data[i].img + ") no-repeat center center fixed");
        $("<h2 id='" + data[i].id +"'>" + data[i].name + " </h2>").appendTo("#name");
        $("<h4 id='" + data[i].id +"'>" + data[i].loc + " </h4>").appendTo("#loc");
        break
      }
    }

    // for(var i = 0; i<data.length; i++){
    //   $("<a href='details.html?location=" + data[i].name+" "+data[i].loc + "'><div id='div"+data[i].id+"'></div></a>").appendTo("#datapage");
    //   getWeather(data[i].lat, data[i].lng, data[i].id);
    //   getCFS(data[i].stationid, data[i].id);
    //   var imgCode = $("<img src='" + data[i].img + "' class='photo'/>");
    //   imgCode.appendTo("#div" +data[i].id);
    //   $("<div style='width: 100%; height: 60px; background-color: black; margin: -64px 0px 0px 0px; position: absolute; opacity: 0.6' class='blackbox'></div>").appendTo("#div" +data[i].id);
    //   $("<div style='position:absolute; width: 100%; margin-top: -60px; color: white' id='weath" + data[i].id +"'></div>").appendTo("#div" +data[i].id);
    //   $("<div style='float: left; width: 100px' id='leftw" + data[i].id + "'></div>").appendTo("#weath" + data[i].id);
    //   $("<div style='float: right; width: 116px; font-size: 12px; font-weight: light; padding-top: 5px; margin-right:30px; text-align: right' id='rightw" + data[i].id + "'></div>").appendTo("#weath" + data[i].id);
    //   $("<h2 id='" + data[i].id +"'>" + data[i].name + " </h2>").appendTo("#div" +data[i].id);
    //   $("<h4 id='" + data[i].id +"'>" + data[i].loc + " </h4>").appendTo("#div" +data[i].id);
    //   makeMarkers(data[i].lat, data[i].lng, data[i].name);
    // }
  })
};

// var userLat;
// var userLng;
// var map;
// function initMap(){
//   var userInput = $("#destination").val();
//   var geocoder = new google.maps.Geocoder();
//   geocoder.geocode({ 'address' : userInput }, function(results, status) {
//       userLat = [];
//       userLng = [];
//   if(status == "ZERO_RESULTS") {
//     $("<h2 style='float: right'>Oops! Looks like you have a typo. Try again!</h2>").appendTo("#target");
//   } else {
//   userLat.push(results[0].geometry.location.lat());
//   userLng.push(results[0].geometry.location.lng());
//   map = new google.maps.Map(document.getElementById('map'), {
//     center: {lat: userLat[0], lng: userLng[0]},
//     zoom: 8
//   });
// }
// })
// };

// $(window).bind("load", function () {
    getBaseData(  );
  // });

  //// experimental code below, trying to generate unique results page for each location
// function detailPage(imgURL){
//   $("#top").css("background", "url(" + imgURL + ") no-repeat center center fixed;");
//
// };
