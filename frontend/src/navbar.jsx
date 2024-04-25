import React from "react";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"
import { useNavigate } from "react-router-dom";


function Navigation({email}){
    const navigate = useNavigate()
    //Function for Logout
    const handleLogout = async () => {
        
        fetch(import.meta.env.VITE_API_URL + "/sessions/logout", {
        method: 'GET',
        mode: 'cors',
        credentials: "include",
        })
        .then(() => {
            navigate("/");
        })
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
                        <button className="btn btn-primary" onClick={() => handleLogout()} >
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
