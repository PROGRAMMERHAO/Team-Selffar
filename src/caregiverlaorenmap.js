/* eslint no-undef: 0 */ 

import React, { useEffect, useState } from 'react';
  
  export default function DisplayMapClass({lati, longi}) {
    const defaultLatitude = 1.3521;
    const defaultLongitude = 103.8198;
    const defaultCaregiverCoords = [1.2966, 103.7764];
    const [arrivalTime, setArrivalTime] = useState();
    const [travelTime, setTravelTime] = useState(0);
    const [travelDistance, setTravelDistance] = useState();

    console.log(lati);
    console.log(longi);

    useEffect(() => {
      if (window && document) {
        const script = document.createElement('script')
        const body = document.getElementsByTagName('body')[0]
        script.src = 'https://js.api.here.com/v3/3.1/mapsjs-core.js'
        body.appendChild(script)
        script.addEventListener('load', () => {
            const script1 = document.createElement('script');
            script1.src = 'https://js.api.here.com/v3/3.1/mapsjs-service.js';
            body.appendChild(script1);
            script1.addEventListener('load', () => {
                if(H) {
                var platform = new H.service.Platform({
                    'apikey': `${process.env.REACT_APP_HERE_JS_API_KEY}`
                  });
                  
                  // obtain the default map types from the platform object:
                  var defaultLayers = platform.createDefaultLayers();
                  
                  // instantiate (and display) a map object:
                  var map = new H.Map(
                      document.getElementById('mapContainer'),
                      defaultLayers.raster.normal.transit,
                      {
                          // sets the zoom level
                          zoom: 25,
                          // sets the center of the map
                          center: { lat: defaultLatitude, lng: defaultLongitude }
                    }
                );
                
                // Define a variable holding SVG mark-up that defines an icon image:
                var svgMarkup = '<svg width="24" height="24" ' +
                'xmlns="http://www.w3.org/2000/svg">' +
                '<circle stroke="white" fill="red" cx="12" cy="12" r="12" ' +
                '/><text x="12" y="18" font-size="12pt" ' +
                'font-family="Arial" font-weight="bold" text-anchor="middle" ' +
                'fill="white"></text></svg>';

                // Create an icon, an object holding the latitude and longitude, and a marker:
                var icon = new H.map.Icon(svgMarkup),
                    coords = {lat: lati, lng: longi},
                    marker = new H.map.Marker(coords, {icon: icon});

                // Add the marker to the map and center the map at the location of the marker:
                map.addObject(marker);
                map.setCenter(coords);

                // Create the parameters for the routing request:
                var routingParameters = {
                    'routingMode': 'fast',
                    'transportMode': 'car',
                    // The start point of the route:
                    'origin':(defaultCaregiverCoords[0] + ',' +  defaultCaregiverCoords[1]),
                    // The end point of the route:
                    'destination': (lati + ',' + longi),
                    // Include the route shape in the response
                    'return': 'polyline,summary'
                };
                
                // Define a callback function to process the routing response:
                var onResult = function(result) {
                    // ensure that at least one route was found
                    if (result.routes.length) {
                    result.routes[0].sections.forEach((section) => {
                        // Create a linestring to use as a point source for the route line
                        let linestring = H.geo.LineString.fromFlexiblePolyline(section.polyline);
                
                        // Create a polyline to display the route:
                        let routeLine = new H.map.Polyline(linestring, {
                            style: { strokeColor: 'blue', lineWidth: 3 }
                        });
                
                        // Create a marker for the start point:
                        let startMarker = new H.map.Marker(section.departure.place.location);
                
                        // Create a marker for the end point:
                        let endMarker = marker;
                
                        // Add the route polyline and the two markers to the map:
                        map.addObjects([routeLine, startMarker, endMarker]);
                
                        // Set the map's viewport to make the whole route visible:
                        map.getViewModel().setLookAtData({bounds: routeLine.getBoundingBox()});
                        setTravelTime(travelTime + section.summary.duration);
                    });
                    }
                };
                
                // Get an instance of the routing service version 8:
                var router = platform.getRoutingService(null, 8);
                
                // Call calculateRoute() with the routing parameters,
                // the callback and an error callback function (called if a
                // communication error occurs):
                router.calculateRoute(routingParameters, onResult,
                    function(error) {
                    alert(error.message);
                    }
                );
                }
            });
        });
      }
    }, [])
  
    return (
        <>
            <h2>Estimated Waiting Time: {Math.round(travelTime / 60)}</h2>
            <h2>Estimated Arrival Time: {new Date(new Date().setMinutes(new Date().getMinutes() + (travelTime / 60))).toTimeString()}</h2>
            <div id="mapContainer" style={{ width: "640px", height: "480px", marginLeft: "450px" }}></div>
        </>
    );
  }
