import React, {useState} from 'react'
import './chargerstyle.css'


export default function CurrentCharger (props){


  const [displayCode, setCode] = useState('')

  const pickCharger = (idCharger) => {
    props.pickCharger(idCharger)
  }

  const showCode = (dock, code) => {
    setCode('code for charger ' + dock +' : ' +code)
  }

  var output
  if(!props.currentView){
    
    output = props.chargers.map((charger, iterator) =>
    {
      let torender ; 

    
      torender = <div className='chargerDiv' key={iterator + 'charger'} onClick={() =>pickCharger(charger.idCharger)}>
                  <content>{charger.address}</content>
                  <content>{charger.city}</content>
                  <content>{charger.type}</content>
                  <div className="statusGrid">
                  {props.docks.map(dock=>{if(dock.idCharger===charger.idCharger){
                          let statusColor = dock.Status
                          if(statusColor)
                            statusColor = 'red'
                          else
                            statusColor = 'green'
                          
                          
                          return <content className="chargerStatus" style={{backgroundColor:statusColor}} key={dock.idDock} >{dock.idDock}</content>
                  }})}
                </div>
                </div>
    return torender
    })
  }
  else{
    output = <> <button onClick={() =>pickCharger('')}>	&#8592;</button>
                  <div className='singleCharger'>
                    <content>{props.chargers.address}</content>
                    <content>{props.chargers.city}</content>
                    <content>{props.chargers.type}</content>
                    <div className="singleChargerGrid" >
                    {props.docks.map(dock=>{if(dock.idCharger===props.chargers.idCharger){
                          let statusColor = dock.Status
                          if(statusColor)
                            statusColor = 'red'
                          else
                            statusColor = 'green'
                          let renderedmap = <content className="chargerStatus" style={{backgroundColor:statusColor}} key={dock.idDock}>{dock.idDock}</content>
                          if (props.loggedIn && !dock.Status)
                             renderedmap = <content className="chargerStatusCode hover" style={{backgroundColor:statusColor}} key={dock.idDock} onClick={()=>showCode(dock.idDock, dock.Code)}>{dock.idDock}</content>
                          return renderedmap
                  }})}
                  </div>
                <content>{displayCode}</content>
                  </div></>

  }



  return <div className='mainDiv'>{output}</div>
}
