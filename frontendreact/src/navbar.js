import React, { useState, useEffect } from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import { useNavigate } from "react-router-dom";
import Cookies from 'universal-cookie';



function Navigation({email}){
    const cookies = new Cookies();
    const navigate = useNavigate()
    var token = cookies.get("token");
    const handleSubmit = async e => {
        
        fetch('https://tripletriadapi.onrender.com/api/users/logout', {
        method: 'POST',
        mode: 'cors',
        credentials: "include",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({"token" : token})
        })
        .then(response => {
            cookies.remove("token", {sameSite: 'lax'});
            navigate("/");
            }
        )
        e.preventDefault();
    }
    async function handleNavigate(path){
        await navigate(path);
    }
    return(
        <React.Fragment>
            <Navbar expand="sm" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand href="/home">Triple Triad</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link onClick={() => handleNavigate("/home")}>Home</Nav.Link>
                        <Nav.Link>Deck Manager</Nav.Link>
                        <Nav.Link>Collection</Nav.Link>
                        <Nav.Link>Account</Nav.Link>
                        <NavDropdown title="Play Game" id="basic-nav-dropdown">
                        <NavDropdown.Item onClick={() => handleNavigate("/game")}>Easy</NavDropdown.Item>
                        <NavDropdown.Item>
                            Hard[NotImplemented]
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item>
                        
                        </NavDropdown>
                        
                    </Nav>
                    <Nav className="ms-auto">
                        <Nav.Link >{email}</Nav.Link>
                        <button onClick={handleSubmit} className="btn btn-primary" >
                        Log off
                        </button>
                    </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </React.Fragment>
    )
    
}
export default Navigation