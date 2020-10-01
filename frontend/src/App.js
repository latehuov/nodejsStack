import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import axios from 'axios'
import GoogleMapReact from 'google-map-react'
import Marker from './marker.js'
import CurrentCharger from './currentcharger.js'

export default function App() {

  const [chargerLoc, addLocs] = useState([])
  var [currentView, changeView] = useState('')

  useEffect(() => {
    axios.get('http://localhost:4000/')
      .then((response) => {
        addLocs(response.data)
      });
  });

  const defaults = {
    center:{lat: 65.14, lng:27.23},
    zoom:5
  }

  return (
    <Router>
    <div style={{display:'flex', height:'100vh', width:'100%'}}>
      <CurrentCharger currentView={currentView} chargers={chargerLoc}/>
      <div style={{ height: '100vh', width: '80%', display: 'flex'}}>
        <GoogleMapReact
          bootstrapURLKeys={{ key: "AIzaSyAcGpyZvjDRJ4Ryr-TAzv2LlLJF_mZ-IJ8" }}
          defaultCenter={defaults.center}
          defaultZoom={defaults.zoom}>
          {chargerLoc.map((charger, iterator) => <Marker lat={charger.location.lat} lng={charger.location.lng} text={charger.address} key={iterator}/>)}
        </GoogleMapReact>
      </div>
    </div>
    </Router>
  )
}
