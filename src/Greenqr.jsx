import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import QrScan from 'qrscan'
import "./css/Greenqr.css"
import { Link } from "react-router-dom";

const Greenqr = () => {
    const [data, setData] = useState('')
    const [watching, setWatching] = useState(false)
    const navigate = useNavigate()
    var quit = false;

    const onFind = function (value) {
        if (quit) {
            return
        };
        quit = true
        setData(value)
        setWatching(false)
        handleQrCodeScanner(value)
    }

    const handleScanResult = result => {
        console.log(result);

    }

    const handleQrCodeScanner = (value) => {
        const token = localStorage.getItem('token')
        fetch('http://localhost:3333/updatescore', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                type: value,
                token: token
            })
        })
        .then(response => response.json())
        .then(data => {
            if (data.status == 'ok') {
                window.location = '/rankp'
            }
            else if (data.status == 'no') {
                alert('You have scanned 3 times today.')
                window.location = '/Home'
            }

        })
        fetch('http://localhost:3333/updatescoref', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                type: value,
                token: token
            })
        })
        fetch('http://localhost:3333/updatecoin', {
            method: 'PUT', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify({
                type: value,
                token: token
            })
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

    return (
        <div class="containerqr bgqr">
            <div className="menuqr">
                <div className="logoqr">
                    <li><Link to="/Home">🌎 </Link></li>
                </div>
                
                <ul>
                    <div className="box-bgqr1">
                        <li><Link to="/Home">Home </Link></li>
                    </div>
                </ul>
            </div>
            <div className="containqr">
                <div className="headerqr">
                    <h3><i>Breath of the World</i></h3>
                    <h1>QR Scan</h1>
                </div>

            </div>
            <div className='Scanqr1'>
                {watching ? (
                    <QrScan onFind={onFind} />
                ) : (
                    <div >
                        <button className='Scanqr' onClick={() => setWatching(true)}><li>Scan now <br /> Click here</li></button>
                        <h4>{data}</h4>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Greenqr