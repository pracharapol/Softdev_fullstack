import "./css/random.css"
import { Link } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom'



export default function Ran() {


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


    const [data, setData] = useState(0)
   



    const Delcoin = () => {

        const token = localStorage.getItem('token')

        fetch('http://localhost:3333/deletecoin', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

            body: JSON.stringify({
                type: 'discount10',
                token: token

            })
           
        })
       
            .then(response => response.json())
            .then(data => {
                if (data.status == 'ok1') {
                    alert('You got 10฿ Discount')
                    window.location = ('/random')
                }
                else{
                    alert('your coins are not enough')
                }
            
                
            })
    }

    const Delcoin1 = () => {

        const token = localStorage.getItem('token')

        fetch('http://localhost:3333/deletecoin', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

            body: JSON.stringify({
                type: 'discount20',
                token: token

            })

        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'ok1') {
                    alert('You got 20฿ Discount')
                    window.location = ('/random')
                }
                else{
                    alert('your coins are not enough')
                }
            })
    }

    const Delcoin2 = () => {

        const token = localStorage.getItem('token')

        fetch('http://localhost:3333/deletecoin', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

            body: JSON.stringify({
                type: 'discount50',
                token: token

            })

        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'ok1') {
                    alert('You got 50฿ Discount')
                    window.location = ('/random')
                }
                else{
                    alert('your coins are not enough')
                }
            })
    }

    const Delcoin3 = () => {

        const token = localStorage.getItem('token')

        fetch('http://localhost:3333/deletecoin', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },

            body: JSON.stringify({
                type: 'discount100',
                token: token

            })

        })
            .then(response => response.json())
            .then(data => {
                if (data.status == 'ok1') {
                    alert('You got 100฿ Discount')
                    window.location = ('/random')
                }
                else{
                    alert('your coins are not enough')
                }
            })

    }


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




    

    return (
        <div>

            <div class="containerhm bghm">
                <div className="menuhm">
                    <div className="logohm">
                        <li><Link to="/Home">🌎 </Link></li>
                    </div>
                    <div className="box-bghm1">
                        「 Name : {Fullname} 」「 coin : {coin} 」
                    </div>
                    <ul>
                        <div className="box-bghm5">
                            <li><Link to="/Home">Home </Link></li>
                        </div>



                    </ul>
                </div>
                <div className="containhm">
                    <div className="headerhm">
                        <h3><i>Breath of the World</i></h3>
                        <h1><i>Rewards</i></h1>

                    </div>

                </div>

                <div className="carddm">

                    <button className="bogm1" onClick={Delcoin}>

                        <li>100 Coins for 10฿ Discount</li>

                    </button>
                    <button className="bogm2" onClick={Delcoin1}>

                        <li>200 Coins for 20฿ Discount</li>

                    </button>
                    <button className="bogm3" onClick={Delcoin2}>

                        <li>500 Coins for 50฿ Discount</li>

                    </button>
                    <button className="bogm4" onClick={Delcoin3}>

                        <li>1000 Coins for 100฿ Discount</li>

                    </button>

                </div>

            </div>
        </div>







    )







}