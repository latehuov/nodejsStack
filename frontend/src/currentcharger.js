import React from 'react'
import './chargerstyle.css'


export default function CurrentCharger (props){

    var output = props.chargers.map((charger, iterator) =><div className='chargerDiv' key={iterator + 'charger'}>
                                              <content>{charger.address}</content>
                                              <content>{charger.city}</content>
                                              <content>{charger.type}</content>
                                              <content>{charger.status}</content>
                                              </div>)




  return <div className='mainDiv'>{output}</div>
}
