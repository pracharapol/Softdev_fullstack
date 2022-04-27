
import React, { useEffect } from "react";
import "./css/Ruler.css"
import { Link } from "react-router-dom";
const Rule = () => {
    
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
                else if(data.status == 'error'){

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
        <div className="containerlr bglr">

            <div className="menulr">
                <div className="logolr">
                    <li><Link to="/Home">🌎 </Link></li>
                </div>
                <ul>
                    <div className="box-bglr1">
                        <li><Link to="/Home">Home </Link></li>
                    </div>
                    
                    <div className="box-bglr3">
                        <li><Link to="/Rankp">Ranking </Link></li>
                    </div>
                    <button className="box-bglr4" onClick={handleLogout}>
                        <li>Logout</li>
                    </button>
                </ul>
            </div>
            <div className="containlr">
                <div className="headerlr">
                    <h3><i>Breath of the World</i></h3>
                    <h1>Rules of Ranking</h1>
                </div>
                <div className="bodylr">
                    <div className="bodylr-rule">
                        <h2>ในการจัดอันดับจะเรียงลำดับจากผู้เล่นที่มีคะเเนน point มากไปน้อย 10 อันดับเเรก
                        โดยจะมีการรีเซ็ตตารางจัดอันดับทุกๆ 7 วัน
                        หลังจากการรีเซ็ตการจัดอันดับ ผู้เล่นที่มีคะเเนนมากที่สุด 3 อันดับแรก จะได้ coin ที่ไว้ใช้เเลกรางวัล 200 , 100 เเละ 50 ตามลำดับ
                        โดยคะเเนนที่ถูกสะสมจะไม่ถูกรีเซ็ต ผู้เล่นสามารถดูคะเเนนสะสมได้ที่หน้า profile
                            เเละ coin ที่ใช้สำหรับการแลกรางวัลจะไม่ถูกรีเซ็ตไปด้วย</h2>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <div className="bodylr">
                    <div className="bodylr-rule">
                        <h2>The rankings will be ranked from the top 10 players with the highest to the lowest point score.
                        The leaderboard is reset every 7 days.
                        After resetting the rating The top 3 players with the most points will receive coins that can be used to redeem prizes of 200, 100 and 50 respectively.
                        The accumulated points will not be reset. Players can view their accumulated points on their profile page.
                            Also the coins used for redemption will not be reset.</h2>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Rule