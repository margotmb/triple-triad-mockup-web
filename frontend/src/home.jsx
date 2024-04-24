import React, { useState, useEffect } from "react";
import "./styles/home.css";
import Navigation from "./navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();
  const user = useRef("");
  const email = useRef("");

  /*
  fetch(process.env.REACT_APP_API_URL + "/sessions/auth", {
    method: "GET",
    mode: "cors",
    credentials: "include"})
    .then((user) => user.json())
    .then((user) => {
      setUserData({ ...userData, name: user.name, email: user.email });
    });
  */
  return (
    <React.Fragment>
      <Navigation email={user.current} />
      <div className="main-window">
        <h2>
          Welcome, <u>{email.current}</u>
        </h2>
        <img
          className="title_login"
          src="https://i.imgur.com/T3ybYPx.png"
        ></img>
      </div>
    </React.Fragment>
  );
}

export default Home;
