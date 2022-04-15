import React, { useEffect, useState } from "react";
import "./css/rank.css"
import { Link } from "react-router-dom";

export default function Rank() {
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


    const[Scoreuser,setScoreuser] = useState("");
    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/getscore/'+ token, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'ok') {
                    setScoreuser(data.Uscore)
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])
    
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
        <div class="container bg">

            <div className="menu">
                <div className="logo">
                    <li><Link to="/Home">🌎 </Link></li>
                </div>
                <div className="box-bg0">
                        Name : {Fullname} ➢ Your score : {Scoreuser} 
                    </div>
                
                <ul>
                    <div className="box-bg1">
                        <li><Link to="/Home">Home </Link></li>
                    </div>
                    
                    <div className="box-bg3">
                        <li><Link to="/Rule">About rules </Link></li>
                    </div>
                    <button className="box-bg4" onClick={handleLogout}>
                        <li>Logout</li>
                    </button>
                </ul>
            </div>
            <div className="contain">
                <div className="header">
                    <h3><i>Breath of World</i></h3>
                    <h1>Ranking</h1>
                </div>
                <div className="grid-card">
                    <body>
                        <table>
                            <tr>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                            <tr>
                                <td>Peter</td>
                                <td>300</td>
                            </tr>
                            <tr>
                                <td>Lois</td>
                                <td>256</td>
                            </tr>
                            <tr>
                                <td>Jamo</td>
                                <td>218</td>
                            </tr>
                            <tr>
                                <td>Nigga Ta</td>
                                <td>205</td>
                            </tr>
                            <tr>
                                <td>Kanot</td>
                                <td>200</td>
                            </tr>
                            <tr>
                                <td>{Fullname}</td>
                                <td>{Scoreuser}</td>
                            </tr>
                        </table>
                    </body>
                </div>
            </div>

        </div>
    )
}
