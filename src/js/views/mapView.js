import { TILES_URL, ATTRIBUTION } from "../config";

const map = window.L.map("map");
let marker;

window.L.tileLayer(TILES_URL, {
  attribution: ATTRIBUTION,
}).addTo(map);

map.setView([52, 20], 4);

export function addMapClickHandler(handler) {
  map.on("click", handler);
}

export function placeMarker(latlng) {
  if (!marker) {
    marker = window.L.marker(latlng).addTo(map);
  } else {
    marker.setLatLng(latlng);
  }

  map.setView(latlng, 4);
}
