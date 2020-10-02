import React from 'react'
import styles from './locationMarker.module.css'

export default function Marker(props){

  const pickCharger = (idCharger) => {
    props.pickCharger(idCharger)
  }

  return (<>
          <content className={styles.marker} onClick={() =>pickCharger(props.idCharger)}></content>
          <content className={styles.hidden}>{props.text}, {props.lat}, {props.lng}</content>
          </>)
}
