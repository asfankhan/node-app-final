var map;
var service;
var infowindow;
var currLocation={lat:0,lng:0};
var placesNearBy;
var currloc=new google.maps.LatLng(currLocation.lat,currLocation.lng);
var marker;

function initMap() 
{
    map = new google.maps.Map(document.getElementById('map'), {
      center: {lat: 0, lng: -0},
      zoom: 12
    });
}
function getLoc()
{
	if (navigator.geolocation) 
	{
      navigator.geolocation.getCurrentPosition(function(position) {
        currLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        currloc = new google.maps.LatLng(currLocation.lat,currLocation.lng);
        
        map.setCenter(currLocation);
        var image = '/img/map_icon_black.png';

        marker = new google.maps.Marker({
          map: map,
          animation: google.maps.Animation.DROP,
          position: currloc,
          icon: image
        });

        //marker.addListener('click', toggleBounce);

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent("Your Location");
          infowindow.open(map, this);
        });

      });
    } else {
          	// Browser doesn't support Geolocation
		alert("error geolocation")
	}
}

function setMap() 
{
	map.setCenter(currLocation);
}
function findPlace(placeType,radius)
{

	getLoc();
  console.log(currLocation)

	var request = {
    location: currloc,
    radius: 50000,
    types: ['bar']
  };
	infowindow = new google.maps.InfoWindow();

  service = new google.maps.places.PlacesService(map);
  service.nearbySearch(request, callback);
}
function callback(results, status) 
{
        console.log(status)
        console.log(results)
        console.log(currLocation)

  if (status == google.maps.places.PlacesServiceStatus.OK) 
  {
  	placesNearBy=results;
    for (var i = 0; i < results.length; i++) 
    {
      console.log('h')

      var place = results[i];
      createMarker(results[i]);
    }
  }
}
function createMarker(place) 
{
	
	var placeLoc = place.geometry.location;

  var image;
  if(place['rating']>4.2)
  {
    image = '/img/map_icon_gold.png';
  }else if(place['rating']>3.2){
    image = '/img/map_icon_silver.png';
  }else{
    image = '/img/map_icon_bronze.png';
  }

	var marker = new google.maps.Marker({
      map: map,
      animation: google.maps.Animation.DROP,
      position: place.geometry.location,
      icon: image
    });

    google.maps.event.addListener(marker, 'click', function() {
    	createPlaces(place);
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
}
function createPlaces(obj)
{
    console.log(obj)

    var pic=obj.photos[0].getUrl({'maxWidth': 200, 'maxHeight': 200});
    var key="AIzaSyAUE9SXHayTCBZhEYl0fB1L-RfYK-Iit9w";
    var photo = "https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=CnRtAAAATLZNl354RwP_9UKbQ_5Psy40texXePv4oAlgP4qNEkdIrkyse7rPXYGd9D_Uj1rVsQdWT4oRz4QrYAJNpFX7rzqqMlZw2h2E2y5IKMUZ7ouD_SlcHxYq1yL4KbKUv3qtWgTK0A6QbGh87GB3sscrHRIQiG2RrmU_jF4tENr9wGS_YxoUSSDrYjWmrNfeEHSGSc3FyhNLlBU&key="+key+""

    $('.tab-container').empty();

    $(".tab-container").append( "<div class='col-3' style=''>"+
      "<img style='width:100%; height: 19vh;min-height: 100px;' src='"+pic+"'>"
      +"</div>" );

    $(".tab-container").append( "<div class='col-3' style='background-color:#303030;'>"+
      "<div class='text-center' style='color:#707070;font-weight:bold;font-size:1.15em;'>Rating</div>" + 
      "<div class='text-center' style='color:white;font-size:2em;font-weight:bold;'>"+obj.rating+"</div>"+
      "<div class='text-center' style='color:#505050;font-size:1em;'>(default)</div>" + 
      +"</div>" );

    $(".tab-container").append( "<div class='col-6' style='background-color:#303030;'>"+
      "<p class='text-center' style='color:white;font-size:1.1em;font-weight:bold;letter-spacing:3px;'>"+obj.name+"</p>"+
      "<button class='button' style='height10vh;font-size:1em;width:100%; '>Enter</button>" + 
      +"</div>" );

}
function createYourMarker(place) 
{
  
  var placeLoc = place.geometry.location;

  var marker = new google.maps.Marker({
      map: map,
      position: place.geometry.location
    });

    google.maps.event.addListener(marker, 'click', function() {
      console.log(place)
      createPlaces(place);
      infowindow.setContent(place.name);
      infowindow.open(map, this);
    });
}