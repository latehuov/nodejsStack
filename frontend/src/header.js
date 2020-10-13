import React, {useState} from 'react'
import './header.css'
import Auth from './Auth';
import {Link} from "react-router-dom"

export default function Header(props) {

    const loggedIn = (bool) =>{
        props.setLogin(bool)
    }

    const login = (event) => {
        event.preventDefault();
        Auth.authenticate(event.target['username'].value, event.target['password'].value)
        .then(result =>
          {
            loggedIn(true)
          })
        .catch((err) => {
          loggedIn(false);
        })
    }
    
    return (
        <div className="header">
            <div>

            </div>
            <div>
                <form onSubmit={login}>
                <input type="text" placeholder="username" name="username"></input>
                <input type="password" placeholder="password" name="password"></input>
                <button type="submit">Login</button>
                </form>
            </div>
            <Link to={'/create'}>Create account</Link>
            
        </div>

    )
}
