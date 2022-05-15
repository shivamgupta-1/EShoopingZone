import React from "react";
import { Routes, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";


import Login from './components/Login';
import Register from "./components/Register";
import Home from "./components/Home";
import Profile from "./components/Profile";
import BoardUser from "./components/BoardUser";
import BoardModerator from "./components/BoardMerchant";
import BoardAdmin from "./components/BoardAdmin";



import Header from "./components/Header";
import Product from "./components/Product.js/Product";
import Footer from "./components/Footer";

import { NoMatch } from "./components/NoMatch";
import DeleteProfile from "./components/DeleteProfile";
import EditProfile from "./components/EditProfile";
import Cart from "./components/Cart";
import { RequireAuth } from "./components/RequireAuth";
import ConfirmOrder from "./components/ConfirmOrder";
import AddProduct from "./components/Product.js/AddProduct";
import DeleteProduct from "./components/Product.js/DeleteProduct";
import ListProfiles from "./components/ListProfiles";
import OrderConfirmerd from "./components/OrderConfirmerd";
import Ewallet from "./components/Ewallet";



const App = () => {
 

  return (
    
    <div  >
    <Header/>
      
     

      <div className="container mt-3">
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Product/>} />
          
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/orderConfirmation" element={<ConfirmOrder/>} />
          <Route path="/user" element={<BoardUser />} >
            <Route path="deleteProfile" element={<DeleteProfile/>}/>
            <Route path="updateProfile" element={<EditProfile/>}/>
            <Route path="products" element={<Product/>}/>
            <Route path='allOrders' element={<OrderConfirmerd/>} />
            <Route path='ewallet' element={<Ewallet/>} />
          </Route>
          
          <Route path="/cart" element={
            <RequireAuth>
          <Cart/>
          </RequireAuth>
          }/>
          
          
          <Route path="/mod" element={<BoardModerator />} />
          <Route path="/admin" element={<BoardAdmin />} >
            <Route path="addProduct" element={<AddProduct/>}/>
            <Route path="deleteProduct" element={<DeleteProduct/>}/>
            <Route path="allProfiles" element={<ListProfiles/>}/>
          </Route>
          <Route path="/editProfile" element={<EditProfile/>}/>
          <Route path='/allOrders' element={<OrderConfirmerd/>} />
          <Route path='/eWallet' element={<Ewallet/>} />
          <Route path='*' element={<NoMatch/>} />
          

        </Routes>
      </div>
      <div >
      <Footer/>
      </div>
      
    </div>
    
  );
};

export default App;