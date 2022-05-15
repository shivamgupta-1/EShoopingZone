import React, { useState, useEffect } from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Link, Outlet } from "react-router-dom";
import { FaShoppingBasket } from "react-icons/fa";

const BoardAdmin = () => {
  const [content, setContent] = useState("");

  return (
    <div className="container board-container">
      <Navbar expand="lg" className="navBar-user">
        <Container>
          <Navbar.Brand href="/home">
            <FaShoppingBasket size={40} className="board-link" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="li">
                <Link className="board-link" to="addProduct">
                  Add or Update Product
                </Link>
              </Nav.Link>
              <Nav.Link className="li">
                <Link className="board-link" to="deleteProduct">
                  Delete a Product
                </Link>
              </Nav.Link>
              <Nav.Link className="li">
                <Link className="board-link" to="allProfiles">
                  All user{" "}
                </Link>
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default BoardAdmin;
