import "./css/profile.css"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";

export default function Pro() {
    const [Fullname, setFullname] = useState("");
    const [Email, setEmail] = useState("");
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
                    setEmail(data.usemail)
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])




    useEffect(() => {
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


    const [Scoref, setScoref] = useState("");
    useEffect(() => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/getscoref/' + token, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'ok') {
                    setScoref(data.Uscoref)
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });
    }, [])
    const [coin, setcoin] = useState(0);
    useEffect(() => {
        const token = localStorage.getItem('token')

        fetch('http://localhost:3333/getcoin/' + token, {
            method: 'GET', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

        })

            .then(response => response.json())
            .then(data => {
                if (data.status == 'ok') {
                    setcoin(data.Uscoinn)
                }

            })

            .catch((error) => {
                console.error('Error:', error);
            });


    }, [])

    function clockMonth(){
        var i = today.getMonth()
        if(i>=0 && i<9){
            return '0' + (today.getMonth()+1)
        }
        else {
            return (today.getMonth()+1)
        }
    }

    function clockDate(){
        var i = today.getDate()
        if(i>=0 && i<9){
            return '0' + (today.getDate())
        }
        else {
            return (today.getDate())
        }
    }

    var today = new Date(),
    date = clockDate()+ '-'  + (clockMonth()) + '-' + today.getFullYear(); 
    
     


return(
    <div className="containerzz bgrzz">

            <div className="menuozz">
                <div className="logorzz">
                    <li><Link to="/Home">🌎 </Link></li>

                </div>
                 <div className="box-bghhh1">
                 Last time login :&nbsp;{date}
                    </div>
                <ul>
                    <div className="boxs-bgzz4">
                        <li><Link to="/Home">Home </Link></li>
                    </div>


                </ul>
            </div>

            <div className="bodyzz">
                <div className="body-CreateAccountzz">
                    <h2 className="crzz">Profile</h2>
                    <div className="loginzz">
                        <div className="emaill">
                    Email : {Email}
                    </div>
                    <br />
                    <br />
                    <div className="namee">
                    Name : {Fullname}
                    </div>
                    <br />
                    <br />
                    <div className="scoree">
                    Score : {Scoreuser}
                    </div>
                    <br />
                    <br />
                    <div className="coinn">
                    Coin : {coin}
                    </div>
                    <br />
                    <br />
                    <div className="scoref">
                    Accumulated score : {Scoref}
                    </div>
                    <br />
                    <br />
                    <div className="box-bghzz1">
                    <a className="pa"href="/password">Change password</a>
                    </div>
                    </div>
                </div>

            </div>
        </div>

);
}