import React from 'react'
import './header.css'
import {Link} from 'react-router-dom'

export default function fancyheader(props) {

    const logout= ()=>{
        props.stopCharge(props.reserved.idDock, 0)
        props.setUname('')
        props.logOut(false)
        window.location='/'

    }

    const reserveCharger= (event) => {
        event.preventDefault();
        let code = event.target['code'].value
        
        let dock = props.docks.find(dock =>dock.Code === code)
        if(dock === undefined)
            return;
        props.changeChargerStatus(dock, !dock.Status)
    }

    const findHistory= (id) =>{
        props.findHistory(id)
    }

    const stopCharge = () => {
        props.stopCharge(props.reserved.idDock, 0)
    }

    var checkForm

    if(props.reserved === undefined){
        checkForm = <form onSubmit={reserveCharger}>
                        <input type="text" placeholder="insert code" name="code"></input>
                        <button type="submit">Charge!</button>
                    </form>

    }
    else{
        checkForm = <button onClick={stopCharge}>Stop charging</button>
    }


    let output = <div className="header">
                    <div className="otherStuff inputThings">
                        <div ><Link to={'/fancybody'} onClick={() => findHistory(props.id)}>{props.uname}</Link></div>
                        <div><Link to={'/'}><div>Home</div></Link></div>
                    
                    <button onClick={()=>logout()}>Log Out</button>
                    </div>
                    
                    {checkForm}
                </div>

    return output
}
