import React, { useState } from 'react';
import './Register.css';
import { Link, useHistory } from "react-router-dom";
import { auth, db } from './firebase';
import HeaderLogo from './bbo_headerLogo.jpeg'

function Register() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');


      
    const register = e => {
        e.preventDefault();

        //do firebase register
        auth
            .createUserWithEmailAndPassword(email, password)
            .then((auth) => {
                //it successfully created a new user with email and password
                console.log(auth);
                if(auth) {
                    db
                        .collection('users')
                        .doc(auth.user.uid)
                        .set({
                            email:auth.user.email,
                            name:name,
                            phone:phone,
                        })
                    history.push('/')
                }
            })
            .catch(error => alert(error.message));
    }
    return (
        <div className='register'>
            

            <div className="register_container">
                <Link to="/">
                    
                    <img src={HeaderLogo} alt="logo_img" className="register_logo"/>
                </Link>
                <h1>Register</h1>

                <form>
                    <label htmlFor='name'>Name</label>
                    <input id='name' type='text' value={name} onChange={e => setName(e.target.value)}/>

                    <label htmlFor='phone'>Phone</label>
                    <input id='phone' type='text' value={phone} onChange={e => setPhone(e.target.value)}/>

                    <label htmlFor='email'>E-mail</label>
                    <input id='email' type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                    <label htmlFor='pwd'>Password</label>
                    <input id='pwd' type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={register} className='register_registerButton'>Register</button>
                </form>

                <p>
                    By clicking Register you agree to the BBO 
                    Conditions of Use & Sale. Please 
                    see our Privacy Notice, our Cookies Notice
                    and our INterest-Based Ads Notice.
                </p>

                
            </div>
            <div className="welcome_msg">
                <h1>BBO</h1>
                <h3><strong>O</strong>ne Click<br></br><strong>Book Store<strong></strong></strong></h3>
            </div>
            {/*<br></br><div className="manage_height"></div>*/}
        </div>
    )
}

export default Register
