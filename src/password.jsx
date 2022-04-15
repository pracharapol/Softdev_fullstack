import "./css/Password.css"
import { Link } from "react-router-dom";
import React, { useState } from "react";


export default function Pass()  {
    function checkNewpass(password1,password2){
        if (password1 == password2){
            return true;
        }
        else{
            alert('Your passwords do not match.')
        }

    }

    function checkPassword1(password1) {
        var strength = 0;
        if (password1.match(/[a-z]+/)) {
            strength += 1;
        }
        if (password1.match(/[A-Z]+/)) {
            strength += 1;
        }
        if (password1.match(/[0-9]+/)) {
            strength += 1;
        }
        if (password1.match(/[$@#&!]+/)) {
            strength += 1;
        }
        if (password1.length < 8) {

            strength -= 4;
        }
        if (strength < 3) {
            alert('Use 8 more characters with a mix of letters, capital letters, numbers & symbols')
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
            alert('Use 8 more characters with a mix of letters, capital letters, numbers & symbols')
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
            
            password: data.get('password'),
            password1: data.get('password1'),
            password2: data.get('password2'),
        }

        if (checkPassword(jsonData.password) && checkPassword1(jsonData.password1) && checkNewpass(jsonData.password1,jsonData.password2)) {
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

                })
                .catch((error) => {
                    console.error('Error:', error);
                });


        }

    };


return(
    <div className="containerz bgrz">

    <div className="menuoz">
        <div className="logorz">
            <li><Link to="/Home">🌎 </Link></li>

        </div>
        <ul>
            <div className="boxs-bgz4">
                <li><Link to="/Home">Home </Link></li>
            </div>
            

        </ul>
    </div>

    <div className="bodyz">
        <div className="body-CreateAccountz">
            <h2 className="crz">Change password</h2>
            <div className="loginz">

                <form noValidate onSubmit={handleSubmit} name="inpz">
                   
                    <input className="txz4" type="password" placeholder="Password" id="password" name="password" required/>
                    <br />
                    <input className="txz1" type="password" placeholder="New Password" id="password1" name="password1" required/>
                    <br />
                    <input className="txz2" type="password" placeholder="new Password again" id="password2" name="password2" required />
                    <br />


                    <button className="button-savez" type="submit">

                        Submit


                    </button>




                </form>
            </div>
        </div>

    </div>
</div>





);

}