import React from 'react'
import { Redirect, Route } from "react-router-dom";

export default function ProtectedRoute(props) {
    const {loggedIn, ...rest} = props

    let output

    if(loggedIn)
        output = <Route {...rest}/>
    
    else
        output = <Redirect to='/'/>
    
    
    return <React.Fragment>{output}</React.Fragment>
}
