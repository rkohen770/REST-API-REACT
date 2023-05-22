import './App.css';
import React, {Component} from 'react';
import { Link, Route, Routes } from "react-router-dom";
import Login from "./Login"
import { NotFound } from "./NotFound";

let loginFlag=true;

function movingToNFPage ()
{
  loginFlag=false;
} 

function App() {
 
  return (
    <div className="App">
      <header className="App-header">
        { loginFlag && (<Login />)} 
      </header>
     {/*  <Routes>
        <Route path="*" onChanged={movingToNFPage()} element={<NotFound />} />
      </Routes> */}
    </div>
  );
}

export default App;
