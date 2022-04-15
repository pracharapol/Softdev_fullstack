import React from "react";
import "./css/login.css"
import { Link } from "react-router-dom";
const Logi = () => {
     
    return (
        <div class="containeri bgi">

            <div className="menui">
                <div className="logoi">
                    <li><Link to="/Home">🌎 </Link></li>
                </div>
                <ul>
                    <div className="box-bgi1">
                    <li><Link to="/Home">Home </Link></li>
                    </div>
                    <div className="box-bgi2">
                        <li><Link to="/Regisp">Sign up</Link></li>
                    </div>
                    <div className="box-bgi3">
                        <li><Link to="/Rule">About rules </Link></li>
                    </div>
                    <div className="box-bgi4">
                        <li><Link to="/rankp">Ranking </Link></li>
                    </div>
                </ul>
            </div>
            <div className="containi">
                <div className="body-logini">
                    <div className="headeri">
                        <h3 className="Bowi"><i>Breath of World</i></h3>
                        <h1>Login</h1>
                    </div>
                    <div className="loginpi">
                        <form action="/Log" method="post" name="inp">
                            <label for="Username"></label>
                            <input className="tx" type="text" placeholder="Username" />
                            <br />
                            <input className="tx" type="password" placeholder="Password" />
                            <br />

                            <button className="button-savei">
                                <div className="linki">
                                    Login
                                </div>

                            </button>




                        </form>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default Logi