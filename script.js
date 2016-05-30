$.getJSON( "https://data.colorado.gov/resource/a97x-8zfv.json", function( data ) {
  var items = [];
  $.each( data, function( index, val ) {
    items.push( "<li id='" + val.station_name + "'>" +val.station_name+ val.amount + "</li>" );
  });

  $( "<ul/>", {
    "class": "my-new-list",
    html: items.join( "" )
  }).appendTo( "#datapage" );
});
