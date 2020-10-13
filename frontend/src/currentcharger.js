import React from 'react'
import './chargerstyle.css'


export default function CurrentCharger (props){

  const pickCharger = (idCharger) => {
    props.pickCharger(idCharger)
  }

  var output
  if(!props.currentView){
    output = props.chargers.map((charger, iterator) =>
    {
      let statusColor = charger.status
      if(statusColor)
        statusColor = 'red'
      else
        statusColor = 'green'
    
      return <div className='chargerDiv' key={iterator + 'charger'} onClick={() =>pickCharger(charger.idCharger)}>
                                              <content>{charger.address}</content>
                                              <content>{charger.city}</content>
                                              <content>{charger.type}</content>
                                              <content className="chargerStatus" style={{backgroundColor:statusColor}}></content>
    </div>})
  }
  else{

    let statusColor = props.chargers.status
    if(statusColor)
      statusColor = 'red'
    else
      statusColor = 'green'

    output = <> <button onClick={() =>pickCharger('')}>	&#8592;</button>
                  <div className='singleCharger'>
                    <content>{props.chargers.address}</content>
                    <content>{props.chargers.city}</content>
                    <content>{props.chargers.type}</content>
                    <content className="chargerStatus" style={{backgroundColor:statusColor}}></content>
                  </div></>
  }



  return <div className='mainDiv'>{output}</div>
}
