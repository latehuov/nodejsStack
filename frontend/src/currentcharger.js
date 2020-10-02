import React from 'react'
import './chargerstyle.css'


export default function CurrentCharger (props){

  const pickCharger = (idCharger) => {
    props.pickCharger(idCharger)
  }

  var output
  if(!props.currentView){
    output = props.chargers.map((charger, iterator) =><div className='chargerDiv' key={iterator + 'charger'} onClick={() =>pickCharger(charger.idCharger)}>
                                              <content>{charger.address}</content>
                                              <content>{charger.city}</content>
                                              <content>{charger.type}</content>
                                              <content>{charger.status}</content>
                                              </div>)
  }
  else{
    output = <> <button onClick={() =>pickCharger('')}>	&#8592;</button>
                  <div className='singleCharger'>
                    <content>{props.chargers.address}</content>
                    <content>{props.chargers.city}</content>
                    <content>{props.chargers.type}</content>
                    <content>{props.chargers.status}</content>
                  </div></>
  }



  return <div className='mainDiv'>{output}</div>
}
