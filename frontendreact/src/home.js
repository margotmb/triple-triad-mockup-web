import React, {useState} from "react";
import "./styles/home.css";
import Navigation from "./navbar";
import Cookies from 'universal-cookie';

function Home(){
    const cookies = new Cookies();
    var token = cookies.get("token");

    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    fetch('https://tripletriadapi.onrender.com/api/users/auth',{
        method: 'POST',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        },
        body: {token}

      })
      .then(user => user.json())
      .then(user => {
        setName(user.name)
        setEmail(user.email)
      })
    return(
        <React.Fragment>
            <Navigation email={email}/>
            <div className="main-window">
                <h2>Welcome, <u>{name}</u></h2>
                <img className="title_login" src="https://i.imgur.com/T3ybYPx.png" ></img>
            </div>
        </React.Fragment>  
    )
}

export default Home