import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './Login';
import Homepage from './Homepage';
import Register from './Regispgae';
import Rulep from './Rulepage';
import Rankp from './rankpage';
import Green from './Green';
import Yellow from './Yellow';
import Red from './Red';
import Pass from './password';
import Qr from './Greenqr';
import Random from './random';
import Profile from './profile';
import Ruler from './Ruler';

ReactDOM.render(
  <BrowserRouter>
  <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/Home" element={<Homepage />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Rule" element={<Rulep />} />
      <Route path="/rankp" element={<Rankp />} />
      <Route path="/green" element={<Green />} />
      <Route path="/yellow" element={<Yellow />} />
      <Route path="/red" element={<Red />} />
      <Route path="/password" element={<Pass />} />
      <Route path="/Qr" element={<Qr />} />
      <Route path="/random" element={<Random />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/Ruler" element={<Ruler />} />
    </Routes>
</BrowserRouter>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
