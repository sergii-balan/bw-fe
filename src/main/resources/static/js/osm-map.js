var map = new ol.Map({
  target: 'map',
  layers: [ new ol.layer.Tile({ source: new ol.source.OSM() }) ],
  view: new ol.View({
	        center: ol.proj.fromLonLat([24.10507, 56.946285]),
	        zoom: 16
	      })
});

var markers = new ol.source.Vector();

var markerLayer = new ol.layer.Vector({
	  source: markers
	});

map.addLayer(markerLayer);

var markerStyle = new ol.style.Style({
                    image: new ol.style.Icon(({
                                crossOrigin: 'anonymous',
                                src: 'img/pin24.png'
                           }))
                  });

map.getViewport().addEventListener("click", function(e) {
    map.forEachFeatureAtPixel(map.getEventPixel(e), function (marker, markerLayer) {
    	console.log("click() -> " + marker.get('id') + '-' + marker.get('name'));
    });
});

function loadPlaceInfo(placeInfo) {
	console.log("loadPlaceInfo() -> " + placeInfo.id + " - " + placeInfo.name);

	var marker = new ol.Feature({
          type: 'icon',
	      geometry: new ol.geom.Point(
		      ol.proj.fromLonLat([placeInfo.location.longitude, placeInfo.location.latitude])
		  )
		});
	
	marker.setProperties({'id':placeInfo.id, 'name':placeInfo.name});
	
	marker.setStyle(markerStyle);
	
	markers.addFeature(marker);

}

function loadPlaceInfoList(placeInfoData) {
	console.log("loadPlaceInfoList() -> " + placeInfoData);

	let places = placeInfoData.places;
	for(var key in places) {
		if (places.hasOwnProperty(key)) {
			loadPlaceInfo(places[key]);
		}
	}	
}