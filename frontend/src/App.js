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

export default function App() {

  const [chargerLoc, addLocs] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/')
      .then((response) => {
        addLocs(response.data.charger)
      });
  });


  const defaults = {
    center:{lat: 65.14, lng:27.23},
    zoom:5
  }

  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
      bootstrapURLKeys={{ key: "AIzaSyAcGpyZvjDRJ4Ryr-TAzv2LlLJF_mZ-IJ8" }}
      defaultCenter={defaults.center}
      defaultZoom={defaults.zoom}>

      </GoogleMapReact>

    </div>
  )
}
