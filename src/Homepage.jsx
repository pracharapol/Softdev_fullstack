
import "./css/home.css"
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import useSound from 'use-sound';
import fanfareSfx from './css/bg.mp3';
import { Reddit } from "@mui/icons-material";




export default function Hom() {

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
    function Green(){
        
        window.location = '/green'
        
    }
    function Yellow(){
        
        window.location = '/yellow'
        
    }
    function Red(){
        
        window.location = '/red'
        
    }
    function Rate(){
        
        window.location = '/green'
        
    }

    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token')
        window.location = '/Login '

    }
    return (

        <div>


            <div class="containerh bgh">


                <div className="menuh">
                    <div className="logoh">
                        <li><Link to="/Home">🌎 </Link></li>
                    </div>
                    <div className="box-bgh1">
                        Name : {Fullname} <br/><a className="pa"href="/password">Change Password</a>
                    </div>
                    <ul>

                        <div className="box-bgh2">
                            <li><Link to="/Rule">Rules </Link></li>
                        </div>
                        <div className="box-bgh3">
                            <li><Link to="/Rankp">Ranking </Link></li>
                        </div>
                        <button className="box-bgh4" onClick={handleLogout}>
                            <li>Logout</li>
                        </button>
                    </ul>
                </div>
                <div className="containh">
                    <div className="headerh">
                        <h3><i>Breath of World</i></h3>

                    </div>

                </div>
                
                <div className="cardd">
                
                <button className="bog1"  onClick={Green}>
                       
                       <li>Green shops</li>
                       
                       </button>
                    <button className="bog2"  onClick={Yellow}>
                       
                    <li>Yellow shops</li>
                    
                    </button>
                    <button className="bog3"  onClick={Red}>
                       
                    <li>Red shops</li>
                    
                    </button>
                    <button className="bog4"  onClick={Green}>
                       
                    <li>rate us</li>
                    
                    </button>
                    
                </div>
               
            </div>
        </div>
    );

}