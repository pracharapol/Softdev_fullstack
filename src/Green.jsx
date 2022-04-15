import "./css/Green.css"
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
            else if (data.status == 'error') {
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
        <div class="containerq bgq">

            <div className="menuq">
                <div className="logoq">
                    <li><Link to="/Home">🌎 </Link></li>
                </div>
                <div className="box-bg2">
                    { }
                </div>
                <ul>
                    <div className="box-bgq1">
                        <li><Link to="/Home">Home </Link></li>
                    </div>

                    <div className="box-bgq3">
                        <li><Link to="/Rule">About rules </Link></li>
                    </div>
                    <div className="box-bgq2">
                        <li><Link to="/Rankp">Ranking </Link></li>
                    </div>
                    <button className="box-bgq4" onClick={handleLogout}>
                        <li>Logout</li>
                    </button>
                </ul>
            </div>
            <div className="containq">
                <div className="headerq">
                    <h3><i>Breath of World</i></h3>
                    <h1>Green shops</h1>
                </div>

            </div>
            <div className="show">
                <div className="li1">
                    <li>
                        Patom <br /> <h1>ซ.สุขุมวิท 49 เขตวัฒนา กรุงเทพฯ</h1>
                    </li>
                </div>
                <div className="li2">
                    <li>
                        Daydream Believer <br /> <h1>ซ.พหลโยธิน 12 กรุงเทพฯ</h1>
                    </li>
                </div>
                <div className="li3">
                    <li>
                    เขียวไข่กา kiew kai ka <br /> <h1>โครงการ The Garden By PLA 78 ซ.สุขุมวิท 21 กรุงเทพฯ</h1>
                    </li>
                </div>
                <div className="li4">
                    <li>
                    หูกระจง คาเฟ<br /> <h1>45 ถ.ยานนาวา เขตยานนาวา แขวงยานนาวา กรุงเทพฯ</h1>
                    </li>
                </div>
                <div className="li5">
                    <li>
                    The 66 Cottage<br /> <h1>66 ซ.สุขุมวิท 66 แขวงบางจาก เขตพระโขนง กรุงเทพฯ</h1>
                    </li>
                </div>
            </div>
        </div>
    );



}
