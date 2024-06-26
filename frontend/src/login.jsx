import React, { useRef, useEffect } from "react";
import "./styles/login.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  // Checks for logged user
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + "/sessions/auth", {
      method: "GET",
      mode: "cors",
      credentials: "include",
    }).then((response) => {
      if (response.status === 200){
        response.json().then((data) => {
          console.log("Successful request, parsed json body", data);
          // Checks if user exists from GET
          if (data.user != null){
            navigate("/home");
          }
        }).catch((error) => {
          console.log("Successful request, Could not parse body as json",error);
        });
      }
    });
  }, [])
  
  // Login Form
  const email = useRef("");
  const password = useRef("");
  const api_url_login = import.meta.env.VITE_API_URL + "/sessions/login";

  const handleSubmit = async (e) => {
    if (email != "" && password != "") {
      fetch(api_url_login, {
        method: "POST",
        mode: "cors",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.current,
          password: password.current,
        }),
      }).then((data) => data.json()).then((data) => {
        //Checks if user exists, else incorrect error
        if (data.user !== null){
          navigate("/home")
        }
        else{
          alert("Incorrect email or password")
        }
      })
      e.preventDefault();
    } else {
      console.log("Email or password empty");
    }
  };

  return (
    <React.Fragment>
      <img className="title_login" src="https://i.imgur.com/T3ybYPx.png"></img>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="email"
                className="form-control mt-1"
                placeholder="Enter email"
                onChange={(e) => (email.current = e.target.value)}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                onChange={(e) => (password.current = e.target.value)}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="submit"
                className="btn btn-primary"
                onClick={() => {}}
              >
                Log In
              </button>
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                onClick={() => navigate("/register")}
                className="btn btn-primary"
              >
                Create New Account
              </button>
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
}

export default Login;
