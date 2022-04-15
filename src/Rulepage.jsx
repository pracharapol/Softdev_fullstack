
import React, { useEffect } from "react";
import "./css/rule.css"
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
        <div className="containerl bgl">

            <div className="menul">
                <div className="logol">
                    <li><Link to="/Home">🌎 </Link></li>
                </div>
                <ul>
                    <div className="box-bgl1">
                        <li><Link to="/Home">Home </Link></li>
                    </div>
                    
                    <div className="box-bgl3">
                        <li><Link to="/Rankp">Ranking </Link></li>
                    </div>
                    <button className="box-bgl4" onClick={handleLogout}>
                        <li>Logout</li>
                    </button>
                </ul>
            </div>
            <div className="containl">
                <div className="headerl">
                    <h3><i>Breath of World</i></h3>
                    <h1>Rules</h1>
                </div>
                <div className="bodyl">
                    <div className="bodyl-rule">
                        <h2>คิวอาร์โค้ดแต่ละร้านมีคะแนนแตกต่างกันเพราะว่าแต่ละร้านมีจำนวนวัสดุทีทำจากธรรมชาติที่ไม่เท่ากัน
                            ดังนั้นเราจะทำการกำหนดให้</h2>
                        <h2>● คิวอาร์โค้ดสีเขียว = 10 คะแนน หมายถึงว่ามีวัสดุที่ทำจากธรรมชาติในปริมาณที่มาก</h2>
                        <h2>● คิวอาร์โค้ด สีเหลือง = 5 คะแนน หมายถึงว่ามีวัสดุที่ทำจากธรรมชาติในปริมาณที่ปานกลาง </h2>
                        <h2>● คิวอาร์โค้ด สีแดง = 1 คะแนน หมายถึงว่ามีวัสดุที่ทำจากธรรมชาติในปริมาณที่น้อย</h2><h2>● จากนั้นคะแนนก็จะถูกอัพโหลดเข้าไปในช่องสะสมคะแนนของแต่ละรายบุคคล
                            จากนั้นจะนำคะแนนที่ได้ไปจัดอันดับตามลำดับของผู้เล่นทั้งหมด</h2>
                    </div>
                </div>
            </div>
        </div>


    )
}

export default Rule