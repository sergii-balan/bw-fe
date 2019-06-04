//http://localhost:8080/fb/places/search/drink?center=56.946285,24.105078&d=100&fields=ALL
//http://localhost:8080/fb/page/1895851790496117
//content-type=application/json

const tableId = 't_places';
var placesUrlNextParameter = '';

function cleanAll() {
	let placesUrlNextParameter = '';
	
	//clean table
	let table = document.getElementById(tableId);
	let old_tbody = table.getElementsByTagName('tbody')[0];
	let new_tbody = document.createElement('tbody');
	table.replaceChild(new_tbody, old_tbody);
}

function addCell(row, cellValue) {
	let value = document.createTextNode(cellValue);
	let cell = row.insertCell(-1);
	cell.appendChild(value);
	return cell;
}


function addCellWithLink(row, cellText, cellLink) {
	let linkText = document.createTextNode(cellText);
	let link = document.createElement("a");
	link.setAttribute("href", cellLink);
	//link.className = "CSSclass";
	link.appendChild(linkText);

	let cell = row.insertCell(-1);
	cell.appendChild(link);
}


function addRow(tableRef, place) {
	console.log(place);
	let row = tableRef.insertRow(-1);

	addCellWithLink(row, place.id, '/fb/place.htm?placeId=' + place.id);
	addCell(row, place.name);
	addCell(row, place.location.street);
	addCellWithLink(row, place.link, place.link);
	addCellWithLink(row, place.website, place.website);
}

function generateTableBody(data) {
	let tableRef = document.getElementById(tableId).getElementsByTagName('tbody')[0];
	let places = data.places;
	for(var key in places) {
		if (places.hasOwnProperty(key)) {
			addRow(tableRef, places[key]);
		}
	}
}

function generateTable(data) {
	generateTableBody(data);
	placesUrlNextParameter = data.nextPage[0].after[0];
}

function generateUrl(baseUrl) {
	let url = baseUrl;
	url += '?d=' + document.getElementById("idRadius").value;
	url += '&center=' + document.getElementById("idLatitude").value + ',' + document.getElementById("idLongitude").value;
	url += '&fields=' + document.getElementById("idFields").value;
	if ((placesUrlNextParameter != null) && (placesUrlNextParameter != '')) {
		url += '&after=' + placesUrlNextParameter;
	}

	return url;
}

function populateTable(baseUrl) {
	
	let url = generateUrl(baseUrl);
	
	fetch(url).then(response => {
		  return response.json();
		}).then(data => {
			generateTable(data)
		}).catch(err => {
			console.log(JSON.stringify(err));
		});
}  

