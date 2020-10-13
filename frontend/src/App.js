import React, {useState, useEffect} from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route} from "react-router-dom";
import './App.css';
import axios from 'axios'
import CurrentCharger from './currentcharger.js'
import Header from './header.js'
import BodyComps from './bodycomps.js'
import Create from './create.js'
import Auth from './Auth.js'

export default function App() {

  const [chargerLoc, addLocs] = useState([])
  var [currentView, changeView] = useState('')
  var [chargerfield, changefield] = useState([])
  var [loggedIn, setLogin] = useState()

  useEffect(() => {
    axios.get('http://localhost:4000/')
      .then((response) => {
        addLocs(response.data)
      });
  },[chargerfield] );


  useEffect(() => {
    if(chargerfield.length === 0)
      changefield(chargerLoc)
  },[chargerfield.length, chargerLoc])


  const defaults = {
    center:{lat: 65.14, lng:27.23},
    zoom:5
  }

  const changeCharger = id => {
    changeView(id)
  }
  
  const searchString = text =>{
    axios.post('http://localhost:4000/search', {string: text})
    .then(response => {
      if (response.data.length > 0)
        return changefield(response.data)
      else if(text.length ===0 && response.data.length === 0)
        return changefield(chargerLoc)  
      else if (text.length > 0 && response.data.length === 0)  
        return changefield([{address:'No results found :´(' }])           
      })
  }

  const createUser = (userinfo) => {
    axios.post('http://localhost:4000/create', {userinfo: userinfo})
    .then(response =>console.log(response.data))
  }


  var chargerview =<CurrentCharger chargers={chargerfield} pickCharger={changeCharger}/>


  if(currentView === '')
  {


    chargerview = <CurrentCharger chargers={chargerfield} pickCharger={changeCharger}/>
  }
  else{
    let chargers = chargerLoc.find(charger =>charger.idCharger === currentView)
    chargerview = <CurrentCharger currentView={currentView} chargers={chargers} pickCharger={changeCharger}/>
  }


  return (
    <Router>
    <Header setLogin={setLogin}/>
    <Switch>
      <Route exact path={'/'}>
        <BodyComps chargerview={chargerview} chargerLoc={chargerLoc} defaults={defaults} pickCharger={changeCharger} searchString={searchString}/>
      </Route>
      <Route path={'/create'}>
        <Create createUser={createUser}/>
      </Route>

    </Switch>
    </Router>
  )
}
