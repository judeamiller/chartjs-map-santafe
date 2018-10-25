var map = L.map('mapid').setView([35.69,-105.94], 11);

L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

L.geoJson(santafeEducationCensus).addTo(map);

function getColor(d) {
	return d > 40   ? '#00441b' :
           d > 35   ? '#006d2c' :
           d > 30   ? '#238b45' :
           d > 25   ? '#41ae76' :
		   d > 20   ? '#66c2a4' :
		   d > 15   ? '#99d8c9' :
		   d > 10   ? '#ccece6' :
		   d > 05   ? '#e5f5f9' :
                      '#f7fcfd';
}

function eduStyle(feature) {
	return {
		fillColor: getColor ((((feature.properties.B15003022 + feature.properties.B15003023 + feature.properties.B15003025) / (feature.properties.B15003001)))*100),
		weight: 2,
		opacity: 1,
		color: 'white',
		dashArray: '3',
		fillOpacity: 0.65
	};
}

L.geoJson(santafeEducationCensus, {style: eduStyle}).addTo(map);