import React from "react";
import "./css/login.css"
import { Link } from "react-router-dom";





export default function SignInSide() {

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
  
        const jsonData ={
            email: data.get('email'),
            password: data.get('password'),
        }

        fetch('http://localhost:3333/login', {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(jsonData),
        })
            .then(response => response.json())
            .then(data => {
                if(data.status == 'ok'){
                    // alert('login success')
                    localStorage.setItem('token', data.token)
                    window.location = '/Home'
                }
                else{
                    alert('login failed')
                }
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    return (
        <div class="containeri bgi">

        <div className="menui">
            <div className="logoi">
                <li><Link to="/Home">🌎 </Link></li>
            </div>
            <ul>
                
                <div className="box-bgi2">
                    <li><Link to="/Register">Sign up</Link></li>
                </div>
                
            </ul>
        </div>
        <div className="containi">
            <div className="body-logini">
                <div className="headeri">
                    <h3 className="Bowi"><i>Breath of the World</i></h3>
                    <h1>Login</h1>
                </div>
                <div className="loginpi">
                    <form  noValidate onSubmit={handleSubmit} name="inp">
                        <label for="email"></label>
                        <input className="tx" type="email" placeholder="Email" id="email" name="email"/>
                        <br />
                        <input className="tx" type="password" placeholder="Password" id="password" name="password"/>
                        <br />

                        <button className="button-savei">
                            <div className="linki">
                                Sign in
                            </div>

                        </button>
                        
                    </form>
                    <br />
                    <div><a className="txs" href="/register">Don't have an account? Sign Up</a></div>
                </div>
            </div>

        </div>

    </div>
        

    );
}