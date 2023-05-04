
// more on webglfundamentals

// http://build-failed.blogspot.com/2013/02/displaying-webgl-data-on-google-maps.html

// https://webglfundamentals.org/webgl/lessons/webgl-how-it-works.html

// namespace
// L.glify
// var geokdbush = require('geokdbush');

var map = L.map('map',{
  zoomSnap: 0,
  zoomDelta:.4,
  trackResize: true,
  center: [51.5148, -0.1269],
  maxBounds: L.latLngBounds([51.8, -0.7], [51.2, 0.41]),
  zoom: 12,
  minZoom: 11,
  maxZoom: 18
});

L.tileLayer.provider('Stamen.Toner').addTo(map);

/*
L.glify.shapes({
  map,
  data: tennis_geoms,
  color: "darkred",
  opacity: .8,
  borderOpacity: 1,
  border: true
});
*/

// var tennis_geoms = fetch('https://github.com/ischlo/tennis_london/blob/main/data/tennis_london.geojson');

L.geoJSON(tennis_geoms,{
  style: { 
        color : '#ff4f5a',
        opacity: 1,
        fillOpacity: .5,
        fillColor: '#ff4f00'
      },
  onEachFeature: function(feature,layer) {
    popupOptions = {closeOnClick: true };
    layer.bindPopup(feature.properties.popups,popupOptions);
  }
}).addTo(map);

// create the index
var index = new KDBush(tennis_geoms.features, (p) => p.properties.lon, (p) => p.properties.lat);

// initiate the layer with the lines, empty
var lines_layer = L.layerGroup();

// function to get the nearest 5 tennis courts from the set of centriods 
// and draw the line between the click point and the court
function n5(po, layerG){
  // add the following into a click event on the map.
  var point = po.latlng;
  // console.log(point);
  var nearest = around(index, point.lng, point.lat, maxResults = 5);
  // console.log(nearest);
  for(let i = 0;i<5;++i){ 
    coords = [
      point
      ,[nearest[i].properties.lat, nearest[i].properties.lon ]
    ];
    
    layerG.addLayer(L.polyline(coords, {color:"black"}));
  }
  layerG.addTo(map);
}

map.on("click", function(po){
  
  lines_layer.clearLayers();
  n5(po,lines_layer);
  
});


      
      
      
      