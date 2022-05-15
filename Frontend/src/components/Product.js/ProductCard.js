import React from "react";
import { FaBasketballBall, FaStar } from "react-icons/fa";
import AuthService from "../../services/auth.service";
import cartService from "../../services/cart.service";
import   './ProductCard.css';

const ProductCard = ({ setOpenModal ,data}) => {

    const currentUser = AuthService.getCurrentUser();

    const addToCart =(res )=>{
      let productId= res.productId;
      let cartId=currentUser.username.length + 1;
      console.log(cartId);
      console.log();
      
      setOpenModal(false);
      cartService.add_product_to_Cart(productId,cartId);

    }
    return (
    
    <div className="modalBackground">
      <div className="modalContainer">
        <div className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            X
          </button>
          
        </div>
        <div className="title">
              <h1>Product Details</h1>
          </div>
        <div class="height d-flex justify-content-center align-items-center">
    
    <div class="card p-3" >
        
        <div class="d-flex justify-content-between align-items-center ">
            <div class="mt-2">
                <h4 class="text-uppercase pb-3" style={ {fontSize:30}}>{data.productName}</h4>
                <div class="mt-3">
                    <h5 class=" mb-0" style={ {fontSize:15 }}>Type : <span  style={ {color:"slategray" ,fontSize:20}}> {data.productType}</span></h5>
                    <h1 class=" mt-0" style={ {fontSize:15 }}>Category : <span  style={ {color:"slategray",fontSize:20}}> {data.category}</span> </h1>
                    <div class="d-flex flex-row user-ratings">
                        <div class="ratings">
                        <FaStar style={{ color:"golden" }} />
                        </div>
                        <h6 class="text-muted ml-1"> <span style={{ color:"red" }}> {data.rating}</span> </h6>
                    </div>
                </div>
            </div>
            <div class="image">
                <img src={data.image} alt={data.productName} width="200" />
            </div>
        </div>
        
        <div class="d-flex justify-content-between align-items-center mt-2 mb-2">
        <p style={ {fontSize:15 }}>Price : <span style={ {color:"red",fontSize:20}}>Rs. {data.price}</span> </p>
            <div class="colors">
                <p style={ {fontSize:15 }}> Specificaton : <span style={ {color:"slategray",fontSize:10}}> {data.specificatin}</span></p>

            </div>
            
        </div>
        
        
        <p style={ {fontSize:15 }}>{data.description} </p>
        <button class="btn btn-dark" style={{ backgroundColor:"lightblue" ,color:"black" }}
            onClick={() => {
              setOpenModal(false);
            }}
            id="cancelBtn"
          >
            Go Back
          </button>
        <button class="btn btn-danger" onClick={()=>addToCart(data)}>Add to cart</button>
    </div>
    
</div>
       
        </div>
      </div>

    
    );
  };
  
  export default ProductCard;