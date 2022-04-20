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
                        <li><Link to="/Rule">Rules </Link></li>
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
                    <h3><i>Breath of the World</i></h3>
                    <h1>Yellow shops</h1>
                </div>
                
            </div>
            <div className="showy">
                <a href="https://www.google.co.th/maps/place/B-Story+Garden+Cafe+%26+Restaurants/@13.819539,100.6224446,17z/data=!3m1!4b1!4m5!3m4!1s0x311d6310336af887:0x6f146bfcf6eebf3b!8m2!3d13.8195416!4d100.6246255?hl=th">
                <div className="liy1">
                    <li>
                    Story Garden <br /> <h1>ซอย ประดิษฐ์มนูธรรม เขตลาดพร้าว กทม.</h1>
                    </li>
                </div>
                </a>
                <a href="https://www.google.co.th/maps/place/Begin+Again/@13.7357683,100.6925914,17z/data=!3m1!4b1!4m5!3m4!1s0x311d61c735c5cfa1:0x6b23f856db24db22!8m2!3d13.7357683!4d100.6947801?hl=th">
                <div className="liy2">
                    <li>
                    Begin Again Cafe <br /> <h1>1 ซ. กรุงเทพกรีฑา 32 แขวง ทับช้าง เขตสะพานสูง กรุงเทพมหานคร 10250</h1>
                    </li>
                </div>
                </a>
                <a href="https://www.google.co.th/maps/place/Emmie's/@13.7443416,100.6298428,17z/data=!3m1!4b1!4m5!3m4!1s0x311d61c526cab813:0xcb69d5fa9d2960a0!8m2!3d13.7443415!4d100.6320315?hl=th">
                <div className="liy3">
                    <li>
                    Emmies Cafe <br /> <h1>ถนน พระราม 9 ตัดใหม่ สวนหลวง กทม.</h1>
                    </li>
                </div>
                </a>
                <a href="https://www.google.co.th/maps/place/%E0%B8%8C%E0%B8%AD%E0%B9%80%E0%B8%8C%E0%B8%AD+%E0%B8%84%E0%B8%AD%E0%B8%9F+ChowCher+Cof/@13.8078584,100.566336,17z/data=!3m1!4b1!4m5!3m4!1s0x30e29d4d6e326525:0x95a734b003a09ab6!8m2!3d13.8078575!4d100.5685249?hl=th">
                <div className="liy4">
                    <li>
                    ChowCher Cof<br /> <h1>ChowCher Cof ซอย ลาดพร้าว 16</h1>
                    </li>
                </div>
                </a>
                <a href="https://www.google.co.th/maps/place/%E0%B8%AA%E0%B8%B3%E0%B8%A3%E0%B8%B1%E0%B8%9A+Sam-Rub+Cafe+and+Cuisine/@13.8078582,100.5597699,15z/data=!4m9!1m2!2m1!1sSam-Rub+Cafe+and+Cuisine!3m5!1s0x30e29c458fd9c15d:0xe0226597967a4b38!8m2!3d13.8096043!4d100.5626796!15sChhTYW0tUnViIENhZmUgYW5kIEN1aXNpbmWSAQpyZXN0YXVyYW50?hl=th">
                <div className="liy5">
                    <li>
                    Sam-Rub Cafe and Cuisine<br /> <h1>Sam-Rub Cafe and Cuisine ลาดพร้าว 8 แยก 9 แขวง จอมพล</h1>
                    </li>
                </div>
                </a>
            </div>

        </div>
    );



}
