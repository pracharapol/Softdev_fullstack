import "./css/Yellow.css"
import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";


export default function Green() {


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
                else if(data.status == 'error') {
                    // alert('Please login')
                    localStorage.removeItem('token')
                    window.location = '/Login '
                }
            })

            .catch((error) => {
                console.error('Error:', error);
            });
 
            
    const handleLogout = (event) => {
        event.preventDefault();
        localStorage.removeItem('token')
        window.location = '/Login '
    }

    return (
        <div class="containery bgy">

            <div className="menuy">
                <div className="logoy">
                    <li><Link to="/Home">🌎 </Link></li>
                </div>
                <div className="box-bgy2">
                            {}
                        </div>
                <ul>
                    <div className="box-bgy1">
                        <li><Link to="/Home">Home </Link></li>
                    </div>
                    
                    <div className="box-bgy3">
                        <li><Link to="/Rule">About rules </Link></li>
                    </div>
                    <div className="box-bgy2">
                        <li><Link to="/Rankp">Ranking </Link></li>
                    </div>
                    <button className="box-bgy4" onClick={handleLogout}>
                        <li>Logout</li>
                    </button>
                </ul>
            </div>
            <div className="containy">
                <div className="headery">
                    <h3><i>Breath of World</i></h3>
                    <h1>Yellow shops</h1>
                </div>
                
            </div>
            <div className="showy">
                <div className="liy1">
                    <li>
                    Story Garden <br /> <h1>ซอย ประดิษฐ์มนูธรรม เขตลาดพร้าว กทม.</h1>
                    </li>
                </div>
                <div className="liy2">
                    <li>
                    Begin Again Cafe <br /> <h1>ถนนพระราม 9 ซอย 49 สวนหลวง กทม</h1>
                    </li>
                </div>
                <div className="liy3">
                    <li>
                    Emmies Cafe <br /> <h1>ถนน พระราม 9 ตัดใหม่ สวนหลวง กทม.</h1>
                    </li>
                </div>
                <div className="liy4">
                    <li>
                    ChowCher Cof<br /> <h1>ChowCher Cof ซอย ลาดพร้าว 16</h1>
                    </li>
                </div>
                <div className="liy5">
                    <li>
                    Sam-Rub Cafe and Cuisine<br /> <h1>Sam-Rub Cafe and Cuisine ลาดพร้าว 8 แยก 9 แขวง จอมพล</h1>
                    </li>
                </div>
            </div>

        </div>
    );



}
