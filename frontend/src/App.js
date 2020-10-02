import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import './App.css';
import axios from 'axios'
import CurrentCharger from './currentcharger.js'
import Header from './header.js'
import BodyComps from './bodycomps.js'

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

  const changeCharger = id => {
    changeView(id)
  }

  var chargerview =<CurrentCharger chargers={chargerLoc} pickCharger={changeCharger}/>

  if(currentView == '')
    chargerview = <CurrentCharger chargers={chargerLoc} pickCharger={changeCharger}/>
  else{
    let chargers = chargerLoc.find(charger =>charger.idCharger == currentView)
    chargerview = <CurrentCharger currentView={currentView} chargers={chargers} pickCharger={changeCharger}/>
  }


  return (
    <Router>
    <Header/>
    <BodyComps chargerview={chargerview} chargerLoc={chargerLoc} defaults={defaults} pickCharger={changeCharger}/>

    </Router>
  )
}
