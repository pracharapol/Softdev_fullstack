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


    const [Scoreuser, setScoreuser] = useState("");
    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/getscore/' + token, {
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


    const [Fullrank, setFullrank] = useState("");
    const [Fullrank1, setFullrank1] = useState("");
    const [Fullrank2, setFullrank2] = useState("");
    const [Fullrank3, setFullrank3] = useState("");
    const [Fullrank4, setFullrank4] = useState("");
    const [Fullrank5, setFullrank5] = useState("");
    const [Fullrank6, setFullrank6] = useState("");
    const [Fullrank7, setFullrank7] = useState("");
    const [Fullrank8, setFullrank8] = useState("");
    const [Fullrank9, setFullrank9] = useState("");

    const [Fullscore, setFullscore] = useState("");
    const [Fullscore1, setFullscore1] = useState("");
    const [Fullscore2, setFullscore2] = useState("");
    const [Fullscore3, setFullscore3] = useState("");
    const [Fullscore4, setFullscore4] = useState("");
    const [Fullscore5, setFullscore5] = useState("");
    const [Fullscore6, setFullscore6] = useState("");
    const [Fullscore7, setFullscore7] = useState("");
    const [Fullscore8, setFullscore8] = useState("");
    const [Fullscore9, setFullscore9] = useState("");
    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/ranking', {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',

            },

        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'ok') {
                    setFullrank(data.usrank)
                    setFullrank1(data.usrank1)
                    setFullrank2(data.usrank2)
                    setFullrank3(data.usrank3)
                    setFullrank4(data.usrank4)
                    setFullrank5(data.usrank5)
                    setFullrank6(data.usrank6)
                    setFullrank7(data.usrank7)
                    setFullrank8(data.usrank8)
                    setFullrank9(data.usrank9)


                    setFullscore(data.srank)
                    setFullscore1(data.srank1)
                    setFullscore2(data.srank2)
                    setFullscore3(data.srank3)
                    setFullscore4(data.srank4)
                    setFullscore5(data.srank5)
                    setFullscore6(data.srank6)
                    setFullscore7(data.srank7)
                    setFullscore8(data.srank8)
                    setFullscore9(data.srank9)
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])


    return (
        <div class="container bg">

            <div className="menu">
                <div className="logo">
                    <li><Link to="/Home">🌎 </Link></li>
                </div>
                <div className="box-bg0">
                    「 Name : {Fullname} 」 ➢ 「 Your score : {Scoreuser}   Points 」
                </div>

                <ul>
                    <div className="box-bg1">
                        <li><Link to="/Home">Home </Link></li>
                    </div>

                    <div className="box-bg3">
                        <li><Link to="/RuleR">Rules of Ranking</Link></li>
                    </div>
                    <button className="box-bg4" onClick={handleLogout}>
                        <li>Logout</li>
                    </button>
                </ul>
            </div>
            <div className="contain">
                <div className="header">
                    <h3><i>Breath of the World</i></h3>
                    <h1>Top10 Ranking</h1>
                </div>
                <div className="grid-card">
                    <body>
                        <table>
                            <tr>
                                <th>No.</th>
                                <th>Name</th>
                                <th>Score</th>
                            </tr>
                            <tr>
                                <td className="one">1.</td>
                                <td className="one">{Fullrank}</td>
                                <td className="one">{Fullscore}</td>
                            </tr>
                            <tr>
                                <td className="two">2.</td>
                                <td className="two">{Fullrank1}</td>
                                <td className="two">{Fullscore1}</td>
                            </tr>
                            <tr>
                                <td className="three">3.</td>
                                <td className="three">{Fullrank2}</td>
                                <td className="three">{Fullscore2}</td>
                            </tr>
                            <tr>
                                <td className="other">4.</td>
                                <td className="other">{Fullrank3}</td>
                                <td className="other">{Fullscore3}</td>
                            </tr>
                            <tr>
                                <td className="other">5.</td>
                                <td className="other">{Fullrank4}</td>
                                <td className="other">{Fullscore4}</td>
                            </tr>
                            <tr>
                                <td className="other">6.</td>
                                <td className="other">{Fullrank5}</td>
                                <td className="other">{Fullscore5}</td>
                            </tr>

                            <tr>
                                <td className="other">7.</td>
                                <td className="other">{Fullrank6}</td>
                                <td className="other">{Fullscore6}</td>
                            </tr>

                            <tr>
                                <td className="other">8.</td>
                                <td className="other">{Fullrank7}</td>
                                <td className="other">{Fullscore7}</td>
                            </tr>

                            <tr>
                                <td className="other">9.</td>
                                <td className="other">{Fullrank8}</td>
                                <td className="other">{Fullscore8}</td>
                            </tr>

                            <tr>
                                <td className="other">10.</td>
                                <td className="other">{Fullrank9}</td>
                                <td className="other">{Fullscore9}</td>
                            </tr>
                        </table>
                    </body>
                </div>
            </div>

        </div>
    )
}
