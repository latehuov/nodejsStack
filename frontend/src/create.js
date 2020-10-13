import React, {useState} from 'react'


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
        <div>
            <input type="text" placeholder="Username" onChange={(event) => createUname(event.target.value)}></input>
            <input type="password" placeholder="Password" onChange={(event) => createPassword(event.target.value)}></input>
            <input type="email" placeholder="Email" onChange={(event) => createEmail(event.target.value)}></input>
            <input type="text" placeholder="Car registration" onChange={(event) => createCar(event.target.value)}></input>
            <button onClick={createUser}>Submit</button>
        </div>
    )
}
