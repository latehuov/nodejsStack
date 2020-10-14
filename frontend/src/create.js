import React, {useState} from 'react'
import './create.css'


export default function Create(props) {
    var [username, createUname] = useState('')
    var [password, createPassword] = useState('')
    var [email, createEmail] = useState('')
    var [carReg, createCar] = useState('')


 
    const createUser = () => {
        let userinfo = {username:username, password:password, email:email, carReg:carReg}
        props.createUser(userinfo)

    }


    return (
        <div className="main">

            <div className="itemInMain">
                <label for="Username">Username</label>
                <input type="text" placeholder="Username" name="Username" onChange={(event) => createUname(event.target.value)}></input>
            </div>
            <div className="itemInMain">
                <label for="Password">Password</label>
                <input type="password" placeholder="Password" name="Password" onChange={(event) => createPassword(event.target.value)}></input>
            </div>
            <div className="itemInMain">
                <label for="Email">Email</label>
                <input type="email" placeholder="Email" name="Email" onChange={(event) => createEmail(event.target.value)}></input>
            </div>
            <div className="itemInMain">
                <label for="carreg">Car registration</label>
                <input type="text" placeholder="Car registration" name="carreg" onChange={(event) => createCar(event.target.value)}></input>
            </div>
            
            
            <button onClick={createUser} className="butt">Submit</button>
        </div>
    )
}
