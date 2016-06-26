// Last Day
// 1. Details page
//  - Fix photos
//  - Add weather and CFS
//  - Add description
//  - Add map with driving directions
//  - Add forecast
// 2. Results page
//  - Make markers clickable, take to Details
//  - If time, make hover over result highlight marker
// 3. Home page
//  - Stylize form
//  - Add content under fold
//    - Search all of colorado
//    - Other stuff
// 4. Deploy

function getCFS(stationId, id){
  $.getJSON("https://data.colorado.gov/resource/a97x-8zfv.json", function( data ){
    for (var i = 0; i < data.length; i++){
      if(data[i].usgs_station_id == stationId){
        $("<span>Flow: " + data[i].amount + " CFS</span><br>").appendTo("#rightside2");
      }
    }
  } )
};

function getWeather(lat, lng, id){
  $.ajax({
    url: "https://api.forecast.io/forecast/67e7df6d2acc0806d8ecb50f3f040be8/" + lat + "," + lng,
    dataType: 'jsonp',
    success: function(data){
    if(data.currently.apparentTemperature){
      var weatherCond = data.currently.icon;
      var icon = $("<img src='images/icons/" + weatherCond + ".png' style='width: 35px; margin-right:5px' class='icon'/>");
      icon.appendTo("#rightside");
      var currentTemp = data.currently.apparentTemperature.toFixed(0);
      $("<span style='font-size: 36px;'>" + currentTemp + "&deg</span>").appendTo("#rightside");
    }
    if(data.currently.windSpeed){
      var windSpeed = data.currently.windSpeed + " MPH";
      $("<span>Wind: " + windSpeed + "</span><br>").appendTo("#rightside2");
    };
  }});
  $.ajax({
    url: "https://api.forecast.io/forecast/67e7df6d2acc0806d8ecb50f3f040be8/" + lat + "," + lng,
    dataType: 'jsonp',
    success: function(data){
    for(var i=1; i<data.daily.data.length; i++){
      var today = new Date(data.daily.data[i].time * 1000);
      var low = (data.daily.data[i].apparentTemperatureMax).toFixed(0);
      var high = (data.daily.data[i].apparentTemperatureMin).toFixed(0);
      var weatherCond = data.daily.data[i].icon;
      console.log(weatherCond);
      var icon = $("<img src='images/darkicons/" + weatherCond + ".png' style='width: 25px; margin: 0px 10px 25px 0px;' class='icon'/>");
      var windSpeed =  data.daily.data[i].windSpeed
      $("<div style='font-size: 12px' id='main" + i + "'></div>").appendTo("#forecast");
      $("<div style='display: inline-block' id='l" + i + "'></div>").appendTo("#main"+i);
      $("<div style='display: inline-block' id='r" + i + "'></div>").appendTo("#main"+i);
      $("<span style='font-weight: bold'>" + today.toString().substring(0, 10) + "</span><br>").appendTo("#r" + i);
      icon.appendTo("#l" + i);
      $("<span>Low: " + low + "&deg </span>").appendTo("#r" + i);
      $("<span>High: " + high + "&deg</span><br>").appendTo("#r" + i);
      $("<span>Wind: " + windSpeed + " MPH</span><br><br>").appendTo("#r" + i);
    }
  }})
};

//
function makeMarkers(lat, lng){
  var icon = {
    url: "https://firebasestorage.googleapis.com/v0/b/fishfly-53334.appspot.com/o/marker.png?alt=media&token=f07ed884-1ae9-457b-b01e-14ee14fd6842",
    scaledSize: new google.maps.Size(20, 30), // scaled size
    origin: new google.maps.Point(0,0), // origin
    anchor: new google.maps.Point(0, 0) // anchor
  };
  var marker = new google.maps.Marker({
    position: {lat: lat, lng: lng},
    map: map,
    icon: icon,
    title: 'Hello World!'
  });
};
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
  $.getJSON( "https://firebasestorage.googleapis.com/v0/b/fishfly-53334.appspot.com/o/spots.json?alt=media&token=85ba93cd-ec7a-4e13-9df3-cf4d4d2b921b", function(data){
    for(var i=0; i<data.length; i++){
      if((data[i].name + " " + data[i].loc).toUpperCase() === $("#destination").val().trim()){
        $("#top").css("background", "url(" + data[i].img + ") no-repeat center center fixed");
        $("<h2 id='" + data[i].id +"'>" + data[i].name + " </h2>").appendTo("#name");
        $("<h4 id='" + data[i].id +"'>" + data[i].loc + " </h4>").appendTo("#loc");
        $("<p>" + data[i].description + " </p>").appendTo("#about");
        getWeather(data[i].lat, data[i].lng, data[i].id);
        getCFS(data[i].stationid, data[i].id);
        initMap(data[i].lat, data[i].lng);
        makeMarkers(data[i].lat, data[i].lng);
        getDir(data[i].lat, data[i].lng)
        console.log(data[i].lat, data[i].lng);

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

var map;
function initMap(lat, lng){
      map = new google.maps.Map(document.getElementById('mapper'), {
        center: {lat: lat, lng: lng},
        zoom: 14,
        disableDefaultUI: true,
        zoomControl: true
      });
      map.setOptions({styles: styles});
};

var styles = [
  {"featureType":"administrative",
    "elementType":"labels.text.fill",
    "stylers":[{"color":"#444444"}]
  },
  {"featureType":"landscape",
    "elementType":"all",
    "stylers":[{"color":"#f5f5f5"}]
  },
  {"featureType":"poi",
    "elementType":"all",
    "stylers":[{"visibility":"off"}]
  },
  {"featureType":"road",
    "elementType":"all",
    "stylers":[{"saturation":-100},{"lightness":45}]
  },
  {"featureType":"road.highway",
    "elementType":"all",
    "stylers":[{"visibility":"simplified"}]
  },
  {"featureType":"road.arterial",
    "elementType":"labels.icon",
    "stylers":[{"visibility":"off"}]
  },
  {"featureType":"transit",
    "elementType":"all",
    "stylers":[{"visibility":"off"}]
  },
  {"featureType":"water",
    "elementType":"all",
    "stylers":[{"color":"#A4DDF5"}, {"visibility":"on"}]
  }
];



function getDir(lat, lng){
  $("<a href='https://www.google.com/maps/dir//" + lat + "," + lng + "' target='_blank'>Get Directions</a>").appendTo("#directions");
}

// $(window).bind("load", function () {
    getBaseData(  );
  // });

  //// experimental code below, trying to generate unique results page for each location
// function detailPage(imgURL){
//   $("#top").css("background", "url(" + imgURL + ") no-repeat center center fixed;");
//
// };
