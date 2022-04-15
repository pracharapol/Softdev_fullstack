import "./css/Red.css"
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
        <div class="containeryr bgyr">

            <div className="menuyr">
                <div className="logoyr">
                    <li><Link to="/Home">🌎 </Link></li>
                </div>
                <div className="box-bgyr2">
                            {}
                        </div>
                <ul>
                    <div className="box-bgyr1">
                        <li><Link to="/Home">Home </Link></li>
                    </div>
                    
                    <div className="box-bgyr3">
                        <li><Link to="/Rule">About rules </Link></li>
                    </div>
                    <div className="box-bgyr2">
                        <li><Link to="/Rankp">Ranking </Link></li>
                    </div>
                    <button className="box-bgyr4" onClick={handleLogout}>
                        <li>Logout</li>
                    </button>
                </ul>
            </div>
            <div className="containyr">
                <div className="headeryr">
                    <h3><i>Breath of World</i></h3>
                    <h1>Red shops</h1>
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
            </div><div className="showr">
                <div className="lir1">
                    <li>
                    Filsandfile<br /> <h1>ซอยลาดพร้าว 84 หรือจะเข้าทาง ประดิษฐ์มนูญธรรม 3</h1>
                    </li>
                </div>
                <div className="lir2">
                    <li>
                    Kraft Kafe <br /> <h1>นาคนิวาส 30 ซอย ลาดพร้าว 71 เขต ลาดพร้าว กรุงเทพมหานคร 10230</h1>
                    </li>
                </div>
                <div className="lir3">
                    <li>
                    ริ คาเฟ<br /> <h1>16/78 ลาดพร้าว18 แยก3 ถ.ลาดพร้าว ซอย ลาดพร้าว 15 แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900</h1>
                    </li>
                </div>
                <div className="lir4">
                    <li>
                    Tumorrow Café<br /> <h1>25/3 ซ.รามคำแหง24แยก2 ถนน หัวหมาก เขต บางกะปิ กรุงเทพมหานคร 10240</h1>
                    </li>
                </div>
                <div className="lir5">
                    <li>
                    Organic Supply<br /> <h1>Organic Supply โซนลาดพร้าว 71</h1>
                    </li>
                </div>
            </div>

        </div>
    );



}
