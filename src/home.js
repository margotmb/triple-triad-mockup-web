import React, { useState } from "react";
import "./home.css";
import {Container, Nav, Navbar, NavDropdown} from "react-bootstrap"


function Home(){
   
    return(
        <React.Fragment>
            <Navbar expand="sm" className="bg-body-tertiary">
            <Container>
                <Navbar.Brand href="/home">React-Bootstrap</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="/home">Home</Nav.Link>
                    <Nav.Link href="">Deck Manager</Nav.Link>
                    <Nav.Link href="">Collection</Nav.Link>
                    <Nav.Link href="">Account</Nav.Link>
                    <NavDropdown title="Play Game" id="basic-nav-dropdown">
                    <NavDropdown.Item href="/game">Easy</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">
                        Hard[NotImplemented]
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">
                        Separated link
                    </NavDropdown.Item>
                    
                    </NavDropdown>
                    
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <div className="main_window">
                <img src="aaa"></img>
            </div>
        </React.Fragment>   
    )
}

export default Home