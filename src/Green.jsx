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
                        <li><Link to="/Rule">Rules </Link></li>
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
                    <h3><i>Breath of the World</i></h3>
                    <h1>Green shops</h1>
                </div>

            </div>
            <div className="show">

            <a href="https://www.google.co.th/maps/place/Patom+Organic+Living/@13.7385585,100.57694,17z/data=!3m1!4b1!4m5!3m4!1s0x30e29e53d2a4dd4d:0x815330b80edabd27!8m2!3d13.7385595!4d100.5791497?hl=th">
                <div className="li1">
                    <li>
                        Patom <br /> <h1>ซ.สุขุมวิท 49 เขตวัฒนา กรุงเทพฯ</h1>
                    </li>
                </div>
                </a>

                <a href="https://www.google.co.th/maps/place/Daydream+Believer/@13.7849433,100.5457172,17z/data=!3m1!4b1!4m5!3m4!1s0x30e29c1ec9ec310f:0xf44895c28de16725!8m2!3d13.7849433!4d100.5479059?hl=th">
                <div className="li2">
                    <li>
                        Daydream Believer <br /> <h1>ซ.พหลโยธิน 12 กรุงเทพฯ</h1>
                    </li>
                </div>
                </a>

                <a href="https://www.google.co.th/maps/place/%E0%B9%80%E0%B8%82%E0%B8%B5%E0%B8%A2%E0%B8%A7%E0%B9%84%E0%B8%82%E0%B9%88%E0%B8%81%E0%B8%B2+%7C+Kiew+Kai+Ka+@+Sunny+at+Summer+Lasalle/@13.6634087,100.6116797,17z/data=!3m1!4b1!4m5!3m4!1s0x311d5fea8f389a5f:0xdc6c47695ce7d163!8m2!3d13.6634581!4d100.6138853?hl=th">
                <div className="li3">
                    <li>
                    เขียวไข่กา kiew kai ka <br /> <h1>ชั้น1 โครงการ Sunny at Summer Lasalle 842, ถ. ลาซาล เขตบางนา กรุงเทพมหานคร 10260</h1>
                    </li>
                </div>
                </a>

                <a href="https://www.google.co.th/maps/place/Hookrajong+Cafe/@13.6798941,100.4739556,12z/data=!4m9!1m2!2m1!1z4Lir4Li54LiB4Lij4Liw4LiI4LiHIOC4hOC4suC5gOC4nyA0NSDguJYu4Lii4Liy4LiZ4LiZ4Liy4Lin4LiyIOC5gOC4guC4leC4ouC4suC4meC4meC4suC4p-C4siDguYHguILguKfguIfguKLguLLguJnguJnguLLguKfguLIg4LiB4Lij4Li44LiH4LmA4LiX4Lie4Liv!3m5!1s0x30e2a1e454818fb5:0xcd92cb0d7465eaf3!8m2!3d13.6798941!4d100.5439934!15sCpkB4Lir4Li54LiB4Lij4Liw4LiI4LiHIOC4hOC4suC5gOC4nyA0NSDguJYu4Lii4Liy4LiZ4LiZ4Liy4Lin4LiyIOC5gOC4guC4leC4ouC4suC4meC4meC4suC4p-C4siDguYHguILguKfguIfguKLguLLguJnguJnguLLguKfguLIg4LiB4Lij4Li44LiH4LmA4LiX4Lie4LivWp8BIpwB4Lir4Li5IOC4geC4o-C4sOC4iOC4hyDguITguLLguYDguJ8gNDUg4LiWIOC4ouC4suC4meC4meC4suC4p-C4siDguYDguILguJUg4Lii4Liy4LiZ4LiZ4Liy4Lin4LiyIOC5geC4guC4p-C4hyDguKLguLLguJnguJnguLLguKfguLIg4LiB4Lij4Li44LiH4LmA4LiX4Lie4LivkgEEY2FmZZoBI0NoWkRTVWhOTUc5blMwVkpRMEZuU1VOWmVGODNORkYzRUFF?hl=th">
                <div className="li4">
                    <li>
                    หูกระจง คาเฟ<br /> <h1>45 ถ.ยานนาวา เขตยานนาวา แขวงยานนาวา กรุงเทพฯ</h1>
                    </li>
                </div>
                </a>

                <a href="https://www.google.co.th/maps/place/The+66+Cottage/@13.6824998,100.6068658,17z/data=!3m1!4b1!4m5!3m4!1s0x30e2a00328a5b1cf:0xaa122329139c04c!8m2!3d13.6824998!4d100.6090545?hl=th">
                <div className="li5">
                    <li>
                    The 66 Cottage<br /> <h1>66 ซ.สุขุมวิท 66 แขวงบางจาก เขตพระโขนง กรุงเทพฯ</h1>
                    </li>
                </div>
                </a>
            </div>
        </div>
    );



}
