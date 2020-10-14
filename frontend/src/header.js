import React, {useState} from 'react'
import './header.css'
import Auth from './Auth';
import {Link} from "react-router-dom"

export default function Header(props) {

    const loggedIn = (bool) =>{
        props.setLogin(bool)
        
    }

    const setUname = (Uname) => {
        props.setUname(Uname)
    }

    const findId = (Uname) => {
        props.findID(Uname)
    }

    const login = (event) => {
        let uname = event.target['username'].value
        event.preventDefault();
        Auth.authenticate(event.target['username'].value, event.target['password'].value)
        .then(result =>
          {
            loggedIn(true)
            setUname(uname)
            findId(uname)
          })
        .catch((err) => {
            console.log(err)
          loggedIn(false)
          setUname('')
        })
    }
    
    return (
        <div className="header">
            <div className="inputThings">
                <form onSubmit={login} id="loginForm">
                    <div className="inputThings">
                        <label for="username">Username</label>
                    <input type="text" placeholder="username" name="username"></input>        
                    </div>
                    <div className="inputThings">
                        <label for="password">Password</label>
                        <input type="password" placeholder="password" name="password"></input>
                    </div>
                </form>
            </div>
            <div className="otherStuff">
            <button type="submit" form="loginForm">Login</button>
                <div><Link to={'/create'}>Create account</Link></div>
            
            </div>
        </div>

    )
}
