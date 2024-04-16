import React, { useState } from "react";
import "./styles/home.css";
import Navigation from "./navbar";
import Cookies from "universal-cookie";
import { useNavigate } from "react-router-dom";

// ToDo
// Review if universal-cookie is needed
// Express has session middleware
// Test new format of useState
function Home() {
  const cookies = new Cookies();
  const navigate = useNavigate();
  var token = cookies.get("token");
  const [userData, setUserData] = useState({ name: "None", email: "None" });

  fetch("/api/users/auth", {
    method: "POST",
    mode: "cors",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ token: token }),
  })
    .then((user) => user.json())
    .then((user) => {
      setUserData({ ...userData, name: user.name, email: user.email });
    });

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
