import React, { useState, useEffect } from "react";
import "./styles/home.css";
import Navigation from "./navbar";
import { useNavigate } from "react-router-dom";

function Home() {
  const [userData, setUserData] = useState([])

  useEffect( () => {
    const fetchPromise = fetch(import.meta.env.VITE_API_URL + "/sessions/auth", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    });
    fetchPromise.then((response) => {
      if (response.status === 200) {
          const jsonPromise = response.json();
          jsonPromise.then((data) => {
              console.log("Successful request, parsed json body", data);
              // Checks if user exists from GET
              setUserData(data)
              console.log(userData)
          });
      }
    })
  },[])

  const navigate = useNavigate();

  return (
    <React.Fragment>
      <Navigation email={userData.email} />
      <div className="main-window">
        <h2>
          Welcome, <u>{userData.user}</u>
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
