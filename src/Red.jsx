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
                        <li><Link to="/Rule">Rules </Link></li>
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
                    <h3><i>Breath of the World</i></h3>
                    <h1>Red shops</h1>
                </div>
                
            </div>
            <div className="showr">
                <a href="https://www.google.co.th/maps/place/filsandfille/@13.7786737,100.6045677,17z/data=!3m1!4b1!4m5!3m4!1s0x30e29de3c67556bb:0xb2c17c49980b3fa9!8m2!3d13.7786737!4d100.6067564?hl=th">
                <div className="lir1">
                    <li>
                    Filsandfile<br /> <h1>ซอยลาดพร้าว 84 หรือจะเข้าทาง ประดิษฐ์มนูญธรรม 3</h1>
                    </li>
                </div>
                </a>
                <a href="https://www.google.co.th/maps/place/Kraft+Kafe/@13.8102365,100.5919219,14z/data=!4m9!1m2!2m1!1sKraft+Kafe!3m5!1s0x30e29dce13056d45:0xfdee448698e8eb9e!8m2!3d13.8102365!4d100.6094314!15sCgpLcmFmdCBLYWZlWgwiCmtyYWZ0IGthZmWSAQRjYWZl?hl=th">
                <div className="lir2">
                    <li>
                    Kraft Kafe <br /> <h1>นาคนิวาส 30 ซอย ลาดพร้าว 71 เขต ลาดพร้าว กรุงเทพมหานคร 10230</h1>
                    </li>
                </div>
                </a>
                <a href="https://www.google.co.th/maps/place/%E0%B8%A3%E0%B8%B4+Cafe/@13.8142922,100.5525658,13z/data=!4m9!1m2!2m1!1z4Lij4Li0IOC4hOC4suC5gOC4nw!3m5!1s0x30e29d45e1cff9d7:0x1efef224ab8b8e92!8m2!3d13.8032439!4d100.5707951!15sChPguKPguLQg4LiE4Liy4LmA4LifWhUiE-C4o-C4tCDguITguLLguYDguJ-SAQpyZXN0YXVyYW50?hl=th">
                <div className="lir3">
                    <li>
                    ริ คาเฟ<br /> <h1>16/78 ลาดพร้าว18 แยก3 ถ.ลาดพร้าว ซอย ลาดพร้าว 15 แขวงจอมพล เขตจตุจักร กรุงเทพมหานคร 10900</h1>
                    </li>
                </div>
                </a>
                <a href="https://www.google.co.th/maps/place/Tumorrow+Cafe/@13.7481539,100.6148199,17z/data=!3m1!4b1!4m5!3m4!1s0x30e29fa840127c85:0x5045931fe3bd77ff!8m2!3d13.7481552!4d100.6169994?hl=th">
                <div className="lir4">
                    <li>
                    Tumorrow Café<br /> <h1>25/3 ซ.รามคำแหง24แยก2 ถนน หัวหมาก เขต บางกะปิ กรุงเทพมหานคร 10240</h1>
                    </li>
                </div>
                </a>
                <a href="https://www.google.co.th/maps/place/Organic+Supply/@13.7998433,100.6046879,17z/data=!3m1!4b1!4m5!3m4!1s0x30e29ded351cba67:0xa9edec98d96d75b0!8m2!3d13.7998445!4d100.6068435?hl=th">
                <div className="lir5">
                    <li>
                    Organic Supply<br /> <h1>Organic Supply โซนลาดพร้าว 71</h1>
                    </li>
                </div>
                </a>
            </div>

        </div>
    );



}
