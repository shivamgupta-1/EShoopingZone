import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../css/Header.css";
import MainLogo from "../images/MainLogo.png";
import authService from "../services/auth.service";
import EventBus from "../common/EventBus";
import { FaShoppingCart } from "react-icons/fa";
import cartService from "../services/cart.service";


function Header2({ count1 }) {
  const [showMerchantBoard, setShowMerchantBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [cartData, setCartData] = useState("");
  const [cartId, setCartId] = useState("");
  

  useEffect(() => {
    const user = authService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setCartId(user.username.length + 1);
      setShowMerchantBoard(user.roles.includes("ROLE_MERCHANT"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    EventBus.on("logout", () => {
      logOut();
    });

    return () => {
      EventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    authService.logout();
    setShowMerchantBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  useEffect(() => {
    const id = setInterval(getCartById, 3000);
    return () => clearInterval(id);
  });

  const getCartById = () => {
    cartService
      .getCartbyId(cartId)
      .then((response) => {
        setCartData(response.data);
        window.location.reload(false);
      })
      .catch((error) => {
        console.log("ERROR:: ", error.response.data);
        setCartData(error.response.data);
      });
  };

  

  return (
    <>
      <nav
        class="navbar navbar-expand-lg navbar-dark "
        style={{ background: "#00bb2e" }}
      >
        <div className="container-fluid">
        <Link to={"/"} className="navbar-brand">
                  <img
                    style={{
                      width: 80,
                      objectFit: "contain",
                      marginRight: 20,
                      marginLeft: 20,
                    }}
                    className="header_logo"
                    src={MainLogo}
                    alt="main-logo"
                  />
                </Link>
                <Link to={"/"} className="navbar-brand">
                  <h4
                    style={{
                     
                      marginRight: 20,
                      marginLeft: 20,
                    }}
                  >EShoppingZone</h4>
                </Link>
        
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span className="navbar-toggler-icon"></span>
  </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <div class=" w-100 order-1 order-md-0 ">
            <ul class="navbar-nav mr-auto">
              <li class="nav-item ">
                
              </li>
              <li class="nav-item active">
                <Link
                  style={{ color: "black" }}
                  to={"/home"}
                  class="nav-link"
                >
                  Home
                </Link>
              </li>
              
             
              <li class="nav-item">
                <Link to={"/cart"} class="nav-link">
                  <FaShoppingCart style={{ color: "#000" }} size={35} />
                </Link>
              </li>
             
              {cartData.items && (
                <li class="nav-item">
                  {" "}
                  <span
                    style={{
                      fontWeight: "bolder",
                      color: "yellow",
                      fontSize: 25,
                    }}
                    class="nav-link"
                  >
                    {cartData.items.length}
                  </span>
                </li>
              )}
            </ul>
          </div>

          <div
            class="navbar-collapse collapse w-100 order-3 dual-collapse2"
            id="navbarTogglerDemo01"
            style={{ display: "flex" }}
          >
            <ul class="navbar-nav ms-auto mt-2 mt-lg-0 ml-auto">
              {showMerchantBoard && (
                <li className="nav-item">
                  <Link
                    style={{ color: "black" }}
                    to={"/mod"}
                    className="nav-link"
                  >
                    Merchant Board
                  </Link>
                </li>
              )}
              {showAdminBoard && (
                <li className="nav-item">
                  <Link
                    style={{ color: "black" }}
                    to={"/admin"}
                    className="nav-link"
                  >
                    Admin Board
                  </Link>
                </li>
              )}
              {currentUser && (
                <li className="nav-item">
                  <Link
                    style={{ color: "black" }}
                    to={"/user"}
                    className="nav-link"
                  >
                    User
                  </Link>
                </li>
              )}
              {currentUser ? (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link
                      style={{ color: "black" }}
                      to={"/profile"}
                      className="nav-link"
                    >
                      {currentUser.username}
                    </Link>
                  </li>
                  <li className="nav-item ">
                    <a
                      style={{ color: "black" }}
                      href="/login"
                      className="nav-link"
                      onClick={logOut}
                    >
                      LogOut
                    </a>
                  </li>
                </div>
              ) : (
                <div className="navbar-nav ml-auto">
                  <li className="nav-item">
                    <Link
                      style={{ color: "black" }}
                      to={"/login"}
                      className="nav-link"
                    >
                      Login
                    </Link>
                  </li>

                  <li className="nav-item">
                    <Link
                      style={{ color: "black" }}
                      to={"/register"}
                      className="nav-link"
                    >
                      Sign Up
                    </Link>
                  </li>
                </div>
              )}
            </ul>
          </div>
        </div>
        </div>
      </nav>
      
    </>
  );
}

export default Header2;
