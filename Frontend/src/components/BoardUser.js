import React, { useState, useEffect } from "react";
import "../css/userBoard.css";
import UserService from "../services/user.service";
import EventBus from "../common/EventBus";
import { Link, Outlet } from "react-router-dom";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaArrowCircleLeft, FaOilCan, FaShoppingBasket } from "react-icons/fa";

const BoardUser = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    UserService.getUserBoard().then(
      (response) => {
        setContent(response.data);
      },
      (error) => {
        const _content =
          (error.response &&
            error.response.data &&
            error.response.data.message) ||
          error.message ||
          error.toString();

        setContent(_content);

        if (error.response && error.response.status === 401) {
          EventBus.dispatch("logout");
        }
      }
    );
  }, []);

  return (
    <div className="container board-container">
      <Navbar  expand="lg"  className="navBar-user">
        <Container >
          <Navbar.Brand href="/home">
            <FaShoppingBasket size={40} className="board-link"/>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link className="li" >
                
                <Link className="board-link" to="deleteProfile">
                  Delete Your Profile
                </Link>
              </Nav.Link>
              <Nav.Link className="li">
                
                <Link className="board-link" to="updateProfile">
                  Update Your Profile
                </Link>
              </Nav.Link>
              <Nav.Link className="li">
                
                <Link className="board-link" to="products">
                  Products
                </Link>
              </Nav.Link>
              <Nav.Link className="li">
                
                <Link className="board-link" to="allOrders">
                  Orders
                </Link>
              </Nav.Link>
              <Nav.Link className="li">
                
                <Link className="board-link" to="ewallet">
                  Ewallet
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

export default BoardUser;
