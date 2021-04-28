import React, { useState } from 'react';
import './Login.css';
import { Link, useHistory } from "react-router-dom";
import { auth, db } from './firebase';
import HeaderLogo from './bbo_headerLogo.jpeg'

function Login() {
    const history = useHistory();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const signIn = e => {
        e.preventDefault();

        //firebase login
        auth
            .signInWithEmailAndPassword(email, password)
            .then(auth => {
                history.push('/')
            })
            .catch(error => alert(error.message))

    }

   
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
                        })
                    history.push('/')
                }
            })
            .catch(error => alert(error.message));
    }
    return (
        <div className='login'>
            

            <div className="login_container">
                <Link to="/">
                    
                    <img src={HeaderLogo} alt="logo_img" className="login_logo"/>
                </Link>
                <h1>Sign-in</h1>

                <form>
                    <label htmlFor='email'>E-mail</label>
                    <input id='email' type='text' value={email} onChange={e => setEmail(e.target.value)}/>

                    <label htmlFor='pwd'>Password</label>
                    <input id='pwd' type='password' value={password} onChange={e => setPassword(e.target.value)} />

                    <button type='submit' onClick={signIn} className='login_signInButton'>Sign In</button>
                </form>

                <p>
                    By signing-in you agree to the BBO 
                    Conditions of Use & Sale. Please 
                    see our Privacy Notice, our Cookies Notice
                    and our INterest-Based Ads Notice.
                </p>

                <button onClick={e => history.replace('/register')} className='login_registerButton '>Create your BBO Account</button>

            </div>
            <div className="welcome_msg">
                <h1>BBO</h1>
                <h3><strong>O</strong>ne Click<br></br><strong>Book Store<strong></strong></strong></h3>
            </div>
            {/*<br></br><div className="manage_height"></div>*/}
        </div>
    )
}

export default Login
