//http://localhost:8080/fb/page/1895851790496117
//content-type=application/json

const div_placeInfo = 'd_placeInfo';
const t_PlaceInfo = 't_PlaceInfo';

Url = {
		QueryParam : function(pname){
			var value = location.search.match(new RegExp("[\?\&]" + pname + "=([^\&]*)(\&?)","i"));
			return value ? value[1] : value;
		}
}


function createImage(imageId, imageUrl) {
	console.log(">>>> 1");
    var img = document.createElement("IMG");
    img.setAttribute("src", imageUrl);
    //img.setAttribute("height", "100");
    //img.setAttribute("width", "200");
    document.getElementById(imageId).appendChild(img);
}

function loadMap(idPlaceOnMap, location) {
	console.log("loadMap() - " + location);

	var lonLat = new OpenLayers
		.LonLat(location.longitude, location.latitude)
		.transform(
			new OpenLayers.Projection("EPSG:4326"), // transform from WGS 1984
			new OpenLayers.Projection("EPSG:900913") // переобразование проекции
		);

	var map = new OpenLayers.Map(idPlaceOnMap); //инициализация карты
	map.addLayer(new OpenLayers.Layer.OSM());//создание добавление слоя карты
	map.setCenter(lonLat, 16);

	var markersLayer = new OpenLayers.Layer.Markers("Markers");//создаем новый слой маркеров
	map.addLayer(markersLayer);//добавление слоя
	markersLayer.addMarker(new OpenLayers.Marker(lonLat));	

}

function generatePlaceInfo(data) {
	document.getElementById("idName").innerHTML = data.name;
	document.getElementById("idAddress").innerHTML = data.location.zip
		+ ', ' + data.location.country
		+ ', ' + data.location.city
		+ ', ' + data.location.street;

	document.getElementById("idPermanentlyClosed").innerHTML = data.permanentlyClosed;
	document.getElementById("idLink").innerHTML = data.link;
	document.getElementById("idPhone").innerHTML = data.phone;
	document.getElementById("idPriceRange").innerHTML = data.priceRange;
	document.getElementById("idOverall_star_rating").innerHTML = data.extraData.overall_star_rating;
	document.getElementById("idRating_count").innerHTML = data.extraData.rating_count;
	
	document.getElementById("idGroupFriendly").innerHTML = data.restaurantServices.groupFriendly;
	document.getElementById("idKidsFriendly").innerHTML = data.restaurantServices.kidsFriendly;
	
	document.getElementById("idAbout").innerHTML = data.about;
	document.getElementById("idDescription").innerHTML = data.description;
	
	document.getElementById("idSunday").innerHTML = data.hours.mon_1_open + " - " + data.hours.mon_1_close;
	document.getElementById("idMonday").innerHTML = data.hours.tue_1_open + " - " + data.hours.tue_1_close;
	document.getElementById("idTuesday").innerHTML = data.hours.wed_1_open + " - " + data.hours.wed_1_close;
	document.getElementById("idWednesday").innerHTML = data.hours.thu_1_open + " - " + data.hours.thu_1_close;
	document.getElementById("idThursday").innerHTML = data.hours.fri_1_open + " - " + data.hours.fri_1_close;
	document.getElementById("idFriday").innerHTML = data.hours.sat_1_open + " - " + data.hours.sat_1_close;
	document.getElementById("idSaturday").innerHTML = data.hours.sun_1_open + " - " + data.hours.sun_1_close;
	
	document.getElementById("idOverall_star_rating").innerHTML = data.extraData.overall_star_rating;
	
	createImage("idCoverPicture", data.cover.source);
	
	console.log(">>>> 2");
	loadMap("idPlaceOnMap", data.location);
		
}

function loadPlaceInfo() {
	
	let url = '/fb/page/' + Url.QueryParam("placeId");
	
	fetch(url).then(response => {
		  return response.json();
		}).then(data => {
			generatePlaceInfo(data)
		}).catch(err => {
			console.log(JSON.stringify(err));
		});
}  

