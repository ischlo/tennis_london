
// more on webglfundamentals

// http://build-failed.blogspot.com/2013/02/displaying-webgl-data-on-google-maps.html

// https://webglfundamentals.org/webgl/lessons/webgl-how-it-works.html

// namespace
// L.glify

// import glify from "leaflet.glify";
  
  
var map = L.map('map',{
  zoomSnap:.2,
  zoomDelta:.2,
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
      
      