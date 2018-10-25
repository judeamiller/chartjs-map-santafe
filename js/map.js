var map = L.map('mapid').setView([35.69,-105.94], 11);

L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
}).addTo(map);

// L.geoJson(santafeEducationCensus).addTo(map);

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

L.geoJson(santafeEducationCensus, {
	style: eduStyle,
	onEachFeature: function (feature, layer) {
        layer.bindPopup(
            "<h6>Educational Attainment</h6> <hr>" +
			"<strong>Tract Population: </strong>" + feature.properties.B15003001 + '<br>' +
			'<strong>Tract Name: </strong>' + feature.properties.name + '<br>'
            );
            layer.on('mouseover', function (e) {
                // Add active class to selected element
                layer.getElement().classList.add('active');
            });
            layer.on('mouseout', function (e) {
                this.closePopup();
                // Remove any previous instances of 'active' class from map
                document.querySelectorAll('.active').forEach(function(element){
                    element.classList.remove('active');
				}); 
			}); 
		}
}).addTo(map);

var legend = L.control({position: 'bottomright'});

legend.onAdd = function(map) {
	var div = L.DomUtil.create('div', 'info legend'),
	grades = [0, 5, 10, 15, 20, 25, 30, 35, 40],
	labels = [];

	div.innerHTML += "<b>Percentage of population with <br> Bachelor's degree or higher</b><br>"

	for (let i = 0;  i < grades.length; i++ ) {
		div.innerHTML += 
		'<i style="background: ' + getColor(grades[i] + 1) + '"></i> ' + grades[i] + (grades[i+1]  ? ' – ' + grades[i + 1] + '%' + "<br>" : '+');
	}

	return div;
}

legend.addTo(map);