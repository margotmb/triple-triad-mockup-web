import React, { useState } from "react";
import Navigation from "./navbar";
import "./home.css";

// Query User Collection - To Be Implemented
function Card({carta}){
    if (carta != null){
        return(
            <React.Fragment>
                <div className="tt-card">
                    <span className="tooltiptext">{carta.name}</span>
                    <img src={carta.file_link}></img>
                    <div className="up_value">{carta.values[0]}</div>
                    <div className="right-value">{carta.values[1]}</div>
                    <div className="bottom-value">{carta.values[2]}</div>
                    <div className="left-value">{carta.values[3]}</div>
                </div>
            </React.Fragment>
            )
    }
}
function CardHolder({cartas}){
    return <ul>{cartas.map(carta => <Card key={carta.name} carta={carta}/>)}</ul>;
}
function CardCollection(){
    
    return(
        <React.Fragment>
            <Navigation/>
            <div className="main-window">
                <h1>Cards:</h1>
                
                <img></img>
            </div>
        </React.Fragment>
    )
}

export default CardCollection;