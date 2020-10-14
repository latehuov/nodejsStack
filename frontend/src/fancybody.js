import React from 'react'
import './fancybody.css'

export default function FancyBody(props) {

const reload = () => {
    props.reload(props.id)
}

    let output = (<div>
                    <button onClick={reload}>Reload</button>
                    <div className="mainContainer">
                        <content className="col">Purchase ID</content>
                        <content className="col">Start Time</content>
                        <content className="col">End Time</content>
                        <content className="col">Chargeing Station</content>
                        <content className="col">Chargeing Dock</content>
                        <content className="col">Total price (€)</content>
                        <content className="col">Estimated Energy consumed (kwh)</content>
                    </div>
                    {props.usage.map((history, currentValue) =>
                        <div className="mainContainer">
                            <content key={history.idHistory} className="col">{history.idHistory}</content>
                            <content key={history.startTime + currentValue} className="col">{history.startTime}</content>
                            <content key={history.endTime + currentValue} className="col">{history.endTime}</content>
                            <content key={history.idCharger + currentValue} className="col">{history.idCharger}</content>
                            <content key={history.idDock + currentValue} className="col">{history.idDock}</content>
                            <content key={history.price + history.idHistory} className="col">{history.price}</content>
                            <content key={history.idHistory + history.energy} className="col">{history.energy}</content>
                        </div>
                    )}</div>)

    return output
       }
