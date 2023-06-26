import React from "react";
import Game from "./game";
import Login from "./login"
import Home from "./home"
import CardCollection from "./cardcollection";
import { BrowserRouter, Route, Routes} from 'react-router-dom';

function App(){
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/game" element={<Game/>} />
        <Route path="/home" element={<Home/>} />
        <Route path="/collection" element={<CardCollection/>}/>
      </Routes>
      
    </BrowserRouter>
    
  )
}

export default App;