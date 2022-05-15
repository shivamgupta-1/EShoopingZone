import React, { useEffect, useState } from "react";
import MainLogo from "../images/MainLogo.png";
import { Navbar, Nav, Container } from "react-bootstrap";
import { FaDoorClosed, FaLockOpen, FaShoppingCart, FaSignOutAlt } from "react-icons/fa";
import cartService from "../services/cart.service";
import AuthService from "../services/auth.service";
import eventBus from "../common/EventBus";
import "../css/Header.css";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const [showMerchantBoard, setShowMerchantBoard] = useState(false);
  const [showAdminBoard, setShowAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  const [cartData, setCartData] = useState("");
  const [cartId, setCartId] = useState("");
  const navigate =useNavigate();

  useEffect(() => {
    const user = AuthService.getCurrentUser();

    if (user) {
      setCurrentUser(user);
      setCartId(user.username.length +1);
      setShowMerchantBoard(user.roles.includes("ROLE_MERCHANT"));
      setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
    }

    eventBus.on("logout", () => {
      logOut();
    });

    return () => {
      eventBus.remove("logout");
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setShowMerchantBoard(false);
    setShowAdminBoard(false);
    setCurrentUser(undefined);
  };

  useEffect(() => {
    const id = setInterval(getCartById, 3000);
    return () => clearInterval(id);
  });

  const getCartById = () => {
    cartService.getCartbyId(cartId).then((response) => {
        if(response.data.items.length===0){
          setCartData(false)
        }
        else{
        setCartData(response.data);
        }
        // window.location.reload(false);
      })
      .catch((error) => {
        console.log("ERROR:: ", error.response.data);
        setCartData(error.response.data);
      });
  };

  const cart =()=>{
      navigate("/cart");
  }

  return (
    <div>
      <Navbar className="" sticky="top" expand="lg" style={{ backgroundColor: "#00bb2e" , marginBottom:60,display:"flex"}}>
        <Container className="second-conatiner">
          <Navbar.Brand href="/home">
            <img
              style={{
                
              }}
              className="header_logo"
              src={MainLogo}
              alt="main-logo"
            />
          </Navbar.Brand>
          <Navbar.Brand className="head-text" href="/home" style={{ color: "rgb(211, 73, 13)" }}>
            EShoppingZone
          </Navbar.Brand>
         
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" >
            <Nav className='ms-auto navl' >
            <Nav.Link >
                <FaShoppingCart onClick={cart} style={{ color: "crimson" }} size={35} />
          </Nav.Link>
          {cartData.items && (
                <Nav.Link style={{ color: "rgb(230, 241, 75)" ,fontWeight:600,letterSpacing:1.5 ,fontSize:20  }} href="/cart" >{cartData.items.length}</Nav.Link>
              )}
              <Nav.Link style={{ color: "rgb(230, 241, 75)" ,fontWeight:600,letterSpacing:1.5 ,fontSize:20}} href="/home">Home</Nav.Link>
              
             
              {showMerchantBoard && (
                <Nav.Link style={{ color: "rgb(230, 241, 75)" ,fontWeight:600,letterSpacing:1.5 ,fontSize:20 }} href="/mod"> Merchant Board</Nav.Link>
              )}
              {showAdminBoard && (
                <Nav.Link style={{ color: "rgb(230, 241, 75)" ,fontWeight:600,letterSpacing:1.5 ,fontSize:20 }} href="/admin"> Admin Board</Nav.Link>
              )}
              {currentUser && <Nav.Link style={{ color: "rgb(230, 241, 75)" ,fontWeight:600,letterSpacing:1.5 ,fontSize:20 }} href="/user"> User Board</Nav.Link>}
              {currentUser ? (
                <>
                  <Nav.Link style={{ color: "rgb(230, 241, 75)" ,fontWeight:600,letterSpacing:1.5 ,fontSize:20 }}  href="/profile">
                    {" "}
                    {currentUser.username}
                  </Nav.Link>
                  <Nav.Link  style={{ color: "rgb(230, 241, 75)" ,fontWeight:600,letterSpacing:1.5 ,fontSize:20 }} href="/login" onClick={logOut}>
                    {" "}
                     <FaSignOutAlt/> Logout
                  </Nav.Link>
                  
                </>
              ) : (
                <>
                  <Nav.Link style={{ color: "rgb(230, 241, 75)" ,fontWeight:600,letterSpacing:1.5 ,fontSize:20 }} href="/login"> Login</Nav.Link>
                  <Nav.Link  style={{ color: "rgb(230, 241, 75)" ,fontWeight:600,letterSpacing:1.5 ,fontSize:20}} href="/register"> Sign Up</Nav.Link>
                </>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
