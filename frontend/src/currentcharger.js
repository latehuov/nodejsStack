import React, {useState} from 'react'
import './chargerstyle.css'


export default function CurrentCharger (props){

  var [selectedId, setId] = useState('')

  const pickCharger = () => {
    props.pickCharger(selectedId)
  }

    var output = props.chargers.map((charger, iterator) =><div className='chargerDiv' key={iterator + 'charger'} onClick={() =>pickCharger(charger.idCharger)}>
                                              <content>{charger.address}</content>
                                              <content>{charger.city}</content>
                                              <content>{charger.type}</content>
                                              <content>{charger.status}</content>
                                              </div>)




  return <div className='mainDiv'>{output}</div>
}
