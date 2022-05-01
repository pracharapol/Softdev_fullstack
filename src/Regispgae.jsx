import "./css/Regispage.css"
import { Link } from "react-router-dom";
import React, { useState } from "react";


export default function SignUpSide() {

    function checkEmail(email) {
        var mail = 0;
        if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
            mail += 1;
        }
        if (mail == 0) {
            alert('Invalid email')
            return false;
        }
        else {
            return true;
        }
    }

    function checkName(fname, Iname) {
        var base = 0;
        if (Iname.match(/[a-z]+/)) {
            base += 1;
        }

        if (fname.match(/[a-z]+/)) {
            base += 1;
        }
        if (fname.length > 20) {
            base -= 1;

        }
        if (Iname.length > 20) {
            base -= 1;

        }
        if (base < 2) {
            alert('Please enter your name in lowercase. and letters from 1 to 20 characters.')
            return false;
        }


        switch (base) {
            case 0:
                return false;
            case 1:
                return false;
            case 2:
                return true;



            default: return true
        }
    }



    function checkPassword(password) {
        var strength = 0;
        if (password.match(/[a-z]+/)) {
            strength += 1;
        }
        if (password.match(/[A-Z]+/)) {
            strength += 1;
        }
        if (password.match(/[0-9]+/)) {
            strength += 1;
        }
        if (password.match(/[$@#&!]+/)) {
            strength += 1;
        }
        if (password.length < 8) {

            strength -= 4;
        }
        if (strength < 3) {
            alert('Password use 8 more characters with a mix of letters, capital letters, numbers & symbols')
            return false;
        }

        switch (strength) {
            case 0:
                return false;
            case 1:
                return false;
            case 2:
                return false;
            case 3:
                return true;
            case 4:
                return true;
            case 5:
                return true;
            default: return true
        }
    }


    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        const jsonData = {
            fname: data.get('firstname'),
            Iname: data.get('lastname'),
            email: data.get('email'),
            password: data.get('password'),
           
        }

        if (checkPassword(jsonData.password) && checkEmail(jsonData.email) && checkName(jsonData.fname, jsonData.Iname)) {
            fetch('http://localhost:3333/register', {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(jsonData),
            })
                .then(response => response.json())
                .then(data => {
                    if (data.status == 'ok') {
                        alert('register success')
                        window.location = '/Login'
                    }

                    if (data.status == 'email or name Duplecate') {
                        alert('register failed because email or name duplecate')
                    } 
                   
                    if (data.status == 'email and name Duplecate') {
                        alert('register failed because email and name duplecate')
                    }


                })
                .catch((error) => {
                    console.error('Error:', error);
                });


        }

    };
    return (
        <div className="container bgr">

            <div className="menuo">
                <div className="logor">
                    <li><Link to="/Home">🌎 </Link></li>

                </div>
                <ul>
                    <div className="boxs-bg4">
                        <li><Link to="/Login">Login </Link></li>
                    </div>


                </ul>
            </div>

            <div className="body bb">
                <div className="body-CreateAccount">
                    <h2 className="cr">Create Account</h2>
                    <div className="login">

                        <form noValidate onSubmit={handleSubmit} name="inp">
                            <div className="email1">
                                <label >Firstname</label>
                            </div>
                            <input className="tx3" type="text" id="firstname" name="firstname" />

                            <div className="email1">
                                <label >Lastname</label>
                            </div>
                            <input className="tx4" type="text" id="lastname" name="lastname" />

                            <div className="email1">
                                <label >Email Adress</label>
                            </div>
                            <input className="tx1" type="email" id="email" name="email" />

                            <div className="email1">
                                <label >Password</label>
                            </div>
                            <input className="tx2" type="password" id="password" name="password"  />
                            <br />
                            <br />
                            <br />
                            
                            <button className="button-save" type="submit">

                                Sign up


                            </button>

                        </form>
                        <br />
                    <div><a className="txs1" href="/login">have an account? Sign in</a></div>
                    </div>
                </div>

            </div>
        </div>

    );
}
