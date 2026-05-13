import React from 'react';

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  CircleMarker
} from 'react-leaflet';

import L from 'leaflet';

import 'leaflet/dist/leaflet.css';

// FIX LEAFLET MARKER ISSUE

delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({

  iconRetinaUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',

  iconUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',

  shadowUrl:
    'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png'

});

// CUSTOM ICONS

const donorIcon = new L.Icon({

  iconUrl:
    'https://cdn-icons-png.flaticon.com/512/684/684908.png',

  iconSize: [35, 35]

});

const victimIcon = new L.Icon({

  iconUrl:
    'https://cdn-icons-png.flaticon.com/512/2776/2776067.png',

  iconSize: [35, 35]

});

function MapDashboard() {

  // DONOR → VICTIM ROUTES

  const routes = [

    {

      donor: {

        name: 'Bangalore',

        position: [12.9716, 77.5946],

        resource: 'Water Bottles'

      },

      victim: {

        name: 'Chennai',

        position: [13.0827, 80.2707],

        priority: 'High'

      },

      status: 'In Transit'

    },

    {

      donor: {

        name: 'Mangalore',

        position: [12.9141, 74.8560],

        resource: 'Food Kits'

      },

      victim: {

        name: 'Mysore',

        position: [12.2958, 76.6394],

        priority: 'Critical'

      },

      status: 'Delivered'

    }

  ];

  // HOTSPOTS

  const hotspots = [

    {

      position: [11.0168, 76.9558],

      severity: 'Critical'

    },

    {

      position: [15.3173, 75.7139],

      severity: 'Medium'

    }

  ];

  return (

    <div
      className="container-fluid p-4"
      style={{
        background:
          'linear-gradient(135deg, #141e30, #243b55)',
        minHeight: '100vh'
      }}
    >

      {/* HEADER */}

      <div className="mb-4">

        <h1
          className="fw-bold text-white"
          style={{
            letterSpacing: '1px'
          }}
        >
          DRRMS Smart Route Tracking
        </h1>

        <p className="text-light">

          Live donor-to-victim disaster delivery monitoring

        </p>

      </div>

      {/* TOP STATS */}

      <div className="row mb-4">

        <div className="col-md-3 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #11998e, #38ef7d)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>Active Routes</h5>

              <h1>5</h1>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #396afc, #2948ff)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>Delivered</h5>

              <h1>3</h1>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #ff416c, #ff4b2b)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>Critical Zones</h5>

              <h1>2</h1>

            </div>

          </div>

        </div>

        <div className="col-md-3 mb-3">

          <div
            className="card border-0 shadow-lg text-white"
            style={{
              background:
                'linear-gradient(135deg, #f7971e, #ffd200)',
              borderRadius: '20px'
            }}
          >

            <div className="card-body text-center">

              <h5>NGO Support</h5>

              <h1>8</h1>

            </div>

          </div>

        </div>

      </div>

      {/* MAIN CONTENT */}

      <div className="row">

        {/* LEFT PANEL */}

        <div className="col-md-3 mb-4">

          {/* LEGEND */}

          <div
            className="card border-0 shadow-lg p-4 mb-4"
            style={{
              borderRadius: '20px'
            }}
          >

            <h4 className="fw-bold mb-3">

              Map Legend

            </h4>

            <p>🟦 Donor Location</p>

            <p>🔴 Victim Area</p>

            <p>🟠 Disaster Hotspot</p>

            <p>➖ Delivery Route</p>

          </div>

          {/* LIVE TRACKING */}

          <div
            className="card border-0 shadow-lg p-4"
            style={{
              borderRadius: '20px'
            }}
          >

            <h4 className="fw-bold mb-3">

              Live Deliveries

            </h4>

            {

              routes.map((route, index) => (

                <div
                  key={index}
                  className="mb-3 p-3"
                  style={{
                    background: '#f4f6f9',
                    borderRadius: '12px'
                  }}
                >

                  <h6 className="fw-bold">

                    {route.donor.name}
                    {' '}
                    →
                    {' '}
                    {route.victim.name}

                  </h6>

                  <p className="mb-1">

                    Resource:
                    {' '}
                    {route.donor.resource}

                  </p>

                  <span className={`badge bg-${
                    route.status === 'Delivered'
                      ? 'success'
                      : 'primary'
                  }`}>

                    {route.status}

                  </span>

                </div>

              ))

            }

          </div>

        </div>

        {/* MAP SECTION */}

        <div className="col-md-9">

          <div
            className="card border-0 shadow-lg overflow-hidden"
            style={{
              borderRadius: '25px'
            }}
          >

            <MapContainer
              center={[12.9716, 77.5946]}
              zoom={6}
              style={{
                height: '80vh',
                width: '100%'
              }}
            >

              {/* DARK MAP STYLE */}

              <TileLayer
  attribution='&copy; OpenStreetMap contributors'
  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

              {/* ROUTES */}

              {

                routes.map((route, index) => (

                  <React.Fragment key={index}>

                    {/* DONOR */}

                    <Marker
                      position={
                        route.donor.position
                      }
                      icon={donorIcon}
                    >

                      <Popup>

                        <b>Donor Location</b>

                        <br />

                        {route.donor.name}

                        <br />

                        Resource:
                        {' '}
                        {route.donor.resource}

                      </Popup>

                    </Marker>

                    {/* VICTIM */}

                    <Marker
                      position={
                        route.victim.position
                      }
                      icon={victimIcon}
                    >

                      <Popup>

                        <b>Victim Area</b>

                        <br />

                        {route.victim.name}

                        <br />

                        Priority:
                        {' '}
                        {route.victim.priority}

                      </Popup>

                    </Marker>

                    {/* ROUTE */}

                    <Polyline
                      positions={[
                        route.donor.position,
                        route.victim.position
                      ]}
                      pathOptions={{
                        color: '#00c6ff',
                        weight: 5,
                        dashArray: '10'
                      }}
                    />

                  </React.Fragment>

                ))

              }

              {/* HOTSPOTS */}

              {

                hotspots.map((spot, index) => (

                  <CircleMarker
                    key={index}
                    center={spot.position}
                    radius={45}
                    pathOptions={{

                      color:
                        spot.severity ===
                        'Critical'
                          ? '#ff0000'
                          : '#ff9800',

                      fillColor:
                        spot.severity ===
                        'Critical'
                          ? '#ff0000'
                          : '#ff9800',

                      fillOpacity: 0.35

                    }}
                  >

                    <Popup>

                      <b>Disaster Hotspot</b>

                      <br />

                      Severity:
                      {' '}
                      {spot.severity}

                    </Popup>

                  </CircleMarker>

                ))

              }

            </MapContainer>

          </div>

        </div>

      </div>

    </div>

  );

}

export default MapDashboard;