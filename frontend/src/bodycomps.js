import React from 'react'
import './bodycomps.css'
import GoogleMapReact from 'google-map-react'
import Marker from './marker.js'

export default function bodycomps(props) {

    return (
        <div className="mainBody">
            {props.chargerview}
            <div className='mapDiv'>
                <GoogleMapReact
                    bootstrapURLKeys={{ key: "AIzaSyAcGpyZvjDRJ4Ryr-TAzv2LlLJF_mZ-IJ8" }}
                    defaultCenter={props.defaults.center}
                    defaultZoom={props.defaults.zoom}>
                    {props.chargerLoc.map((charger, iterator) => <Marker lat={charger.location.lat} lng={charger.location.lng} text={charger.address} key={iterator} pickCharger={props.pickCharger} idCharger={charger.idCharger}/>)}
                </GoogleMapReact>
            </div>
        </div>
    )
}
