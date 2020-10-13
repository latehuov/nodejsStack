import React from 'react'
import './bodycomps.css'
import GoogleMapReact from 'google-map-react'
import Marker from './marker.js'

export default function bodycomps(props) {

    const searchString = (event) => {
        props.searchString(event.target.value)
    }

    return (
        <div className="mainBody">
            <div className='chargerContainer'>
            <input type="text" placeholder="Search for chargers" style={{textAlign: 'center'}} onChange={searchString}></input>
            {props.chargerview}
            </div>
            <div className='mapDiv'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAcGpyZvjDRJ4Ryr-TAzv2LlLJF_mZ-IJ8" }}
                    defaultCenter={props.defaults.center}
                    defaultZoom={props.defaults.zoom}>
                    {props.chargerLoc.map((charger, iterator) => <Marker lat={charger.lat} lng={charger.lng} text={charger.address} key={iterator} pickCharger={props.pickCharger} idCharger={charger.idCharger}/>)}
                </GoogleMapReact>
            </div>
        </div>
    )
}
