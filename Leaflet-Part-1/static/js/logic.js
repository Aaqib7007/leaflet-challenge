let basemap = L.tileLayer(
    "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    {
      attribution:
        'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)',
    }
  );
  
  // Create the map object with options.
  let map = L.map("map", {
    center: [40.73, -74.0059],
    zoom: 4,
  });
  
  basemap.addTo(map);
  
  let geoData = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
  
  // Function to determine marker size based on magnitude
  function markerSize(magnitude) {
    return magnitude * 4; // Adjust scale as needed
  }
  
  // Function to determine marker color based on depth
  function markerColor(depth) {
    return depth > 90
      ? "#ff0000"
      : depth > 70
      ? "#ff6600"
      : depth > 50
      ? "#ffcc00"
      : depth > 30
      ? "#ccff00"
      : depth > 10
      ? "#66ff00"
      : "#00ff00";
  }
  
  // Load GeoJSON data and add markers
  d3.json(geoData).then(function (data) {
    L.geoJson(data, {
      pointToLayer: function (feature, latlng) {
        return L.circleMarker(latlng, {
          radius: markerSize(feature.properties.mag),
          fillColor: markerColor(feature.geometry.coordinates[2]),
          color: "#000",
          weight: 1,
          opacity: 1,
          fillOpacity: 0.8,
        });
      },
      onEachFeature: function (feature, layer) {
        layer.bindPopup(
          `<h3>${feature.properties.title}</h3>
          <hr>
          <p><strong>Magnitude:</strong> ${feature.properties.mag}</p>
          <p><strong>Depth:</strong> ${feature.geometry.coordinates[2]} km</p>
          <p><strong>Location:</strong> ${feature.properties.place}</p>`
        );
      },
    }).addTo(map);
  
    // Add legend to map
    let legend = L.control({ position: "bottomright" });
    legend.onAdd = function () {
      let div = L.DomUtil.create("div", "info legend");
      let depths = [-10, 10, 30, 50, 70, 90];
      let colors = [
        "#00ff00",
        "#66ff00",
        "#ccff00",
        "#ffcc00",
        "#ff6600",
        "#ff0000",
      ];
  
      div.innerHTML += "<h4>Depth (km)</h4>";
      for (let i = 0; i < depths.length; i++) {
        div.innerHTML +=
          `<i style="background:${colors[i]}"></i> ` +
          `${depths[i]}${depths[i + 1] ? "&ndash;" + depths[i + 1] : "+"}<br>`;
      }
      return div;
    };
    legend.addTo(map);
  });
  