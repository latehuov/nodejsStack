import React from 'react'
import styles from './locationMarker.module.css'

export default function Marker(props){
  return (<>
          <content className={styles.marker}></content>
          <content className={styles.hidden}>{props.text}, {props.lat}, {props.lng}</content>
          </>)
}
