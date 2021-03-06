function getCFS(stationId, id){
  $.getJSON("https://data.colorado.gov/resource/a97x-8zfv.json", function( data ){
    for (var i = 0; i < data.length; i++){
      if(data[i].usgs_station_id == stationId){
        $("<span>Flow: " + data[i].amount + " CFS</span><br>").appendTo("#rightw" + id);
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
      icon.appendTo("#leftw" + id);
      var currentTemp = data.currently.apparentTemperature.toFixed(0);
      $("<span style='font-size: 36px;'>" + currentTemp + "&deg</span>").appendTo("#leftw" + id);
    }
    if(data.currently.windSpeed){
      var windSpeed = data.currently.windSpeed + " MPH";
      $("<span>Wind: " + windSpeed + "</span><br>").appendTo("#rightw" + id);
    };
  }});
};

function makeMarkers(lat, lng, name, id, url){
  var icon = {
    url: "https://firebasestorage.googleapis.com/v0/b/fishfly-53334.appspot.com/o/marker.png?alt=media&token=f07ed884-1ae9-457b-b01e-14ee14fd6842",
    scaledSize: new google.maps.Size(20, 30),
    origin: new google.maps.Point(0,0),
    anchor: new google.maps.Point(0, 0)
  };
    var marker = new google.maps.Marker({
      position: {lat: lat, lng: lng},
      map: map,
      icon: icon,
      title: 'Hello World!',
      url: url
  });
  markerMsg(marker, name, id);
};

function markerMsg(marker, message, id) {
  var infowindow = new google.maps.InfoWindow({
    content: message
  });
  marker.addListener('mouseover', function() {
    infowindow.open(marker.get('map'), marker);
    $(".card:not(#div"+ id +")").css("opacity", "0.4");
  });
  marker.addListener('mouseout', function() {
    infowindow.close(marker.get('map'), marker);
    $(".card").css("opacity", "1");
  });
  marker.addListener('click', function() {
    window.location.href = this.url;
  });
  $("#div" + id).hover(function(){
    infowindow.open(marker.get('map'), marker);
  },
  function(){
    infowindow.close(marker.get('map'), marker)
  }
  );
}

function getBaseData() {
  $.getJSON( "https://firebasestorage.googleapis.com/v0/b/fishfly-53334.appspot.com/o/spots.json?alt=media&token=85ba93cd-ec7a-4e13-9df3-cf4d4d2b921b", function(data){
    for(var i=0; i<data.length; i++){
      var dist = distance(userLat, userLng, data[i].lat, data[i].lng);
      data[i]["dist"] = dist;
    }
    var data = data.slice(0);
    data.sort(function(a,b) {
      return a.dist - b.dist;
    });

    for(var i = 0; i<data.length; i++){
      var detLink = "details.html?location=" + data[i].name+" "+data[i].loc
      $("<a href='" + detLink + "'><div id='div"+data[i].id+"' class='card'></div></a>").appendTo("#datapage");
      getWeather(data[i].lat, data[i].lng, data[i].id);
      getCFS(data[i].stationid, data[i].id);
      var imgCode = $("<img src='" + data[i].img + "' class='photo'/>");
      imgCode.appendTo("#div" +data[i].id);
      $("<div style='width: 100%; height: 60px; background-color: black; margin: -64px 0px 0px 0px; position: absolute; opacity: 0.6' class='blackbox'></div>").appendTo("#div" +data[i].id);
      $("<div style='position:absolute; width: 100%; margin-top: -60px; color: white' id='weath" + data[i].id +"'></div>").appendTo("#div" +data[i].id);
      $("<div style='float: left; width: 100px' id='leftw" + data[i].id + "'></div>").appendTo("#weath" + data[i].id);
      $("<div style='float: right; width: 116px; font-size: 12px; font-weight: light; padding-top: 5px; margin-right:30px; text-align: right' id='rightw" + data[i].id + "'></div>").appendTo("#weath" + data[i].id);
      $("<h2 id='" + data[i].id +"'>" + data[i].name + " </h2>").appendTo("#div" +data[i].id);
      $("<h4 id='" + data[i].id +"'>" + data[i].loc + " </h4>").appendTo("#div" +data[i].id);
      makeMarkers(data[i].lat, data[i].lng, data[i].name, data[i].id, detLink);
    }
  })
};

function distance(usrLat, usrLng, locLat, locLng) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((locLat - usrLat) * p)/2 +
          c(usrLat * p) * c(locLat * p) *
          (1 - c((locLng - usrLng) * p))/2;

  return (12742 * Math.asin(Math.sqrt(a)))// 2 * R; R = 6371 km
}

var userLat;
var userLng;
var map;
function initMap(){
  var userInput = $("#destination").val();
  var geocoder = new google.maps.Geocoder();
  geocoder.geocode({ 'address' : userInput }, function(results, status) {
      userLat = [];
      userLng = [];
  if(status == "ZERO_RESULTS") {
    $("<h2 style='float: right'>Oops! Looks like you have a typo. Try again!</h2>").appendTo("#target");
  } else {
  userLat.push(results[0].geometry.location.lat());
  userLng.push(results[0].geometry.location.lng());
  map = new google.maps.Map(document.getElementById('map'), {
    center: {lat: userLat[0], lng: userLng[0]},
    zoom: 9,
    disableDefaultUI: true,
    zoomControl: true
  });
  map.setOptions({styles: styles});
}
})
};

$(window).bind("load", function () {
  getBaseData(  );
});

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
