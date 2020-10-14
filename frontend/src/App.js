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
import ProtectedRoute from './protectedroute.js'
import FancyHeader from './fancyheader.js'
import FancyBody from './fancybody.js'


export default function App() {

  const [chargerLoc, addLocs] = useState([])
  const [dockData, setDockData] = useState([])
  const [currentView, changeView] = useState('')
  const [chargerfield, changefield] = useState([])
  const [loggedIn, setLogin] = useState(false)
  const [uName, setUname] = useState('')
  const [uId, setUId] = useState('')
  const [reserved, setReserved] = useState()
  const [idHistory, setIdHistory] = useState('')
  const [usage, setUsage] = useState([])

  useEffect(() => {
    axios.get('http://localhost:4000/')
      .then((response) => {
        addLocs(response.data)
      });
  },[] );

  const changeChargerStatus = (dock, status) => {
    axios.post('http://localhost:4000/docks', {id: dock.idDock, status: status}).then(response =>console.log(response))
    setReserved(dock)
    axios.post('http://localhost:4000/addhistory', {idDock: dock.idDock, idCharger: dock.idCharger, idUser: uId}).then(response =>setIdHistory(response.data))
  }
  const stopCharge = (id, status) => {
    axios.post('http://localhost:4000/docks', {id: id, status: status}).then(response =>console.log(response))
    setReserved()
    let chargerInfo = chargerLoc.find(charger=> charger.idCharger === reserved.idCharger)
    axios.post('http://localhost:4000/closehistory', {chargerInfo: chargerInfo, idHistory: idHistory})
  }

  useEffect(() => {
    axios.get('http://localhost:4000/docks')
    .then((response) => {setDockData(response.data)})
  },[setReserved, reserved])

  useEffect(() => {
    if(chargerfield.length === 0)
      changefield(chargerLoc)
  },[chargerfield.length, chargerLoc])

  const findHistory = (id) =>{
    axios.get('http://localhost:4000/history'+ id).then(response=>setUsage(response.data))
  }

  const findID =(uname) =>{
    axios.get('http://localhost:4000/findID'+ uname).then(response =>{
      setUId(response.data[0].idUser)
      findHistory(response.data[0].idUser)  
      })
      
      
  }




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
    .then(response =>window.location = "/").catch(error => window.prompt(error))
  }

  var chargerview



  if(currentView === '')
  {
    chargerview = <CurrentCharger chargers={chargerfield} docks={dockData} pickCharger={changeCharger}/>
  }
  else if(loggedIn && currentView !=='')
  {
    let chargers = chargerLoc.find(charger =>charger.idCharger === currentView)
    chargerview = <CurrentCharger currentView={currentView} chargers={chargers}  docks={dockData} pickCharger={changeCharger} loggedIn={loggedIn}/>
  }
  else{
    let chargers = chargerLoc.find(charger =>charger.idCharger === currentView)
    chargerview = <CurrentCharger currentView={currentView} chargers={chargers}  docks={dockData} pickCharger={changeCharger}/>
  }


  


  return (
    <Router>
      {{
      true: <ProtectedRoute loggedIn={loggedIn} render={(routeProps)=>
            <FancyHeader logOut={setLogin} id={uId} uname={uName} setUname={setUname} reserved={reserved} docks={dockData} changeChargerStatus={changeChargerStatus} stopCharge={stopCharge} findHistory={findHistory}/>
          }/>,        
      false: <Route path={'/'}>
          <Header setLogin={setLogin} setUname={setUname} findID={findID} />
        </Route>
      }[loggedIn]}

      <Route exact path={'/'}>
        <BodyComps chargerview={chargerview} chargerLoc={chargerLoc} defaults={defaults} pickCharger={changeCharger} searchString={searchString}/> 
      </Route>
      <Route path={'/create'}>
        <Create createUser={createUser}/>
      </Route>
      <ProtectedRoute path={'/fancybody'} loggedIn={loggedIn} render={(routeProps)=>
            <FancyBody id={uId} uname={uName} reserved={reserved} docks={dockData} usage={usage} reload={findHistory} />
      }/>

    </Router>
  )
}
