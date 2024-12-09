Earthquake Visualization Using Leaflet
This project is an interactive map that visualizes earthquake data from the United States Geological Survey (USGS). The map uses Leaflet.js to plot earthquake locations and provides detailed insights such as earthquake magnitude, depth, and location.

Features
Dynamic Markers: Markers are sized based on earthquake magnitude and colored based on depth.
Interactive Popups: Each marker displays information such as magnitude, depth, and location when clicked.
Custom Legend: A legend provides color-coded context for earthquake depth.
Real-Time Data: The map pulls data directly from the USGS Earthquake API.

Data Source
The earthquake data is fetched from the USGS Earthquake API: USGS Earthquake Data (Past Week)

Technologies Used
Leaflet.js - JavaScript library for interactive maps.
D3.js - For loading and processing GeoJSON data.
USGS Earthquake API - Data source.

Customization
Modify marker colors by updating the markerColor function in script.js.
Adjust marker sizes by editing the markerSize function.
Change the map style by replacing the basemap URL in script.js.