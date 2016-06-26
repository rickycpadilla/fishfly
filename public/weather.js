function getWeather2(lat, lng){

    // $.getJSON("https://api.forecast.io/forecast/67e7df6d2acc0806d8ecb50f3f040be8/" + lat + "," + lng, function(data){
    //   if(data.currently.apparentTemperature){
    //     var weatherCond = data.currently.icon;
    //     var icon = $("<img src='images/icons/" + weatherCond + ".png' style='width: 35px; margin-right:5px' class='icon'/>");
    //     icon.appendTo("#rightside");
    //     var currentTemp = data.currently.apparentTemperature.toFixed(0);
    //     $("<span style='font-size: 36px;'>" + currentTemp + "&deg</span>").appendTo("#rightside");
    //   }
    //   if(data.currently.windSpeed){
    //     var windSpeed = data.currently.windSpeed + " MPH";
    //     $("<span>Wind: " + windSpeed + "</span><br>").appendTo("#rightside2");
    //   };
    // });
      $.getJSON("https://api.forecast.io/forecast/67e7df6d2acc0806d8ecb50f3f040be8/" + lat + "," + lng, function(data){
        for(var i=0; i<data.daily.data.length; i++){
          console.log(data.daily.data[i]);
          var today = new Date(data.daily.data[i].time * 1000);
          var low = (data.daily.data[i].apparentTemperatureMax).toFixed(0);
          var high = (data.daily.data[i].apparentTemperatureMin).toFixed(0);
          var weatherCond = data.currently.icon;
          var icon = $("<img src='/images/darkicons/" + weatherCond + ".png' style='width: 25px; margin: 0px 10px 25px 0px;' class='icon'/>");
          var windSpeed =  data.currently.windSpeed
          $("<div style='font-size: 12px' id='main" + i + "'></div>").appendTo("#forecast");
          $("<div style='display: inline-block' id='l" + i + "'></div>").appendTo("#main"+i);
          $("<div style='display: inline-block' id='r" + i + "'></div>").appendTo("#main"+i);
          $("<span style='font-weight: bold'>" + today.toString().substring(0, 10) + "</span><br>").appendTo("#r" + i);
          icon.appendTo("#l" + i);
          $("<span>Low: " + low + "&deg </span>").appendTo("#r" + i);
          $("<span>High: " + high + "&deg</span><br>").appendTo("#r" + i);
          $("<span>Wind: " + windSpeed + " MPH</span><br><br>").appendTo("#r" + i);
        }
      })
}


console.log("testing");;

getWeather2(40.5288528, -108.9842847)
