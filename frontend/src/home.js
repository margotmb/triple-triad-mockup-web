import React, { useState, useEffect } from "react";
import "./styles/home.css";
import Navigation from "./navbar";
import { useNavigate } from "react-router-dom";

// ToDo
// Test new format of useState
function Home() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({ name: "None", email: "None" });
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
  console.log(userData);
  return (
    <React.Fragment>
      <Navigation email={userData.email} />
      <div className="main-window">
        <h2>
          Welcome, <u>{userData.name}</u>
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
