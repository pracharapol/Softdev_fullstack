import "./css/Password.css"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";


export default function Pass() {

    const [Fullname, setFullname] = useState("");

    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/getname/' + token, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'ok') {
                    setFullname(data.usname)
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])


    function checkNewpass(newPassword, password2) {
        if (newPassword == password2) {
            return true;
        }
        else {
            alert('Your passwords do not match.')
        }

    }

    function checkPassword1(newPassword) {
        var strength = 0;
        if (newPassword.match(/[a-z]+/)) {
            strength += 1;
        }
        if (newPassword.match(/[A-Z]+/)) {
            strength += 1;
        }
        if (newPassword.match(/[0-9]+/)) {
            strength += 1;
        }
        if (newPassword.match(/[$@#&!]+/)) {
            strength += 1;
        }
        if (newPassword.length < 8) {

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
            newPassword: data.get('newPassword'),
            password2: data.get('password2'),
        }
        if (checkPassword1(jsonData.newPassword) && checkNewpass(jsonData.newPassword, jsonData.password2)) {
            const token = localStorage.getItem('token')
            fetch('http://localhost:3333/newPassword', {
                method: 'PUT', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                },
                body:JSON.stringify({token, newPassword: jsonData.newPassword, password: jsonData.password})
            })
                .then(response => response.json())
                .then(data => {
                    if(data.status == 'error'){
                        alert('Your password is Incorrect')
                    }else{
                    alert('Change password success')
                    localStorage.removeItem('token')
                    window.location = '/Login'
                }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        }

    };


    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/authen', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'ok') {
                    // alert('authen success')


                }

                else if (data.status == 'error') {

                    // alert('Please login')
                    localStorage.removeItem('token')
                    window.location = '/Login '
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])


    return (
        <div className="containerz bgrz">

            <div className="menuoz">
                <div className="logorz">
                    <li><Link to="/Home">🌎 </Link></li>

                </div>
                <div className="box-bgz1">
                「 Name : {Fullname} 」
                    </div>
                <ul>
                <div className="boxs-bgz3">
                        <li><Link to="/profile">Back </Link></li>
                    </div>
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
                        <div className="email2">
                                <label >Password</label>
                            </div>
                            <input className="txz4" type="password"  id="password" name="password" required />
                            <div className="email2">
                                <label >New Password</label>
                            </div>
                            <input className="txz1" type="password"  id="newPassword" name="newPassword" required />
                            <div className="email2">
                                <label >New Password again</label>
                            </div>
                            <input className="txz2" type="password"  id="password2" name="password2" required />
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