import React, { useEffect, useState } from 'react'
import AuthService from '../services/auth.service';
import cartService from '../services/cart.service';
import '../css/Cart.css';
import { Navigate, useNavigate } from 'react-router-dom';
import ConfirmOrder from './ConfirmOrder';
import { FaMinus, FaPlus } from 'react-icons/fa';


const Cart = () => {
    const currentUser = AuthService.getCurrentUser();
    const [cartData, setCartData] = useState("");
    const [cartInfo, setCartInfo] = useState("");
    const navigate =useNavigate("");
    const [empty,setEmpty]=useState(false);


    let cartId=currentUser.username.length +1;

   
    useEffect( ()=> {
      
        getCartById();

    },[]);

     const  getCartById = (e)=> {
        
        cartService.getCartbyId(cartId).then((response)=>{
        setCartData(response.data);

        // window.location.reload(false);
        
       
    })
    .catch(error => {
        console.log("ERROR:: ",error.response.data);
        setCartData(error.response.data);
        if(error.response.data ==="cart not found"){
            setEmpty(true);
        }
       
    });
    }
    const goBack =()=>{
            navigate("/products");
    }

    const payment =(res) =>{
        
        setCartInfo(res);
        const id = setInterval(navigate("/orderConfirmation"), 3000);
        return () => clearInterval(id);
        
    }

    const removeItem =(res) =>{
        let productId=res.productId;
        let cartId = currentUser.username.length +1;

        cartService.removeItem(cartId,productId);
        window.location.reload(false);

    }
    const plusItem =(res) =>{
        let productId=res.productId;
        let cartId = currentUser.username.length +1;

        cartService.incItem(cartId,productId);
        window.location.reload(false);

    }
    const minusItem =(res) =>{
        let productId=res.productId;
        let cartId = currentUser.username.length +1;

        cartService.decItem(cartId,productId);
        window.location.reload(false);

    }
  return (
    <div class="cart_section">
     <div class="container-fluid">
         <div class="row">
             <div class="col-lg-10 offset-lg-1">
                 <div class="cart_container">
                   {cartData.items &&  <div class="cart_title">Shopping Cart<small style={{ color:"slategray",fontSize:25 }}> ({cartData.items.length} item in your cart) </small></div>} 
                   {empty &&  <div class="cart_title" ><small style={{ color:"slategray" ,fontSize:25 }}>  your cart is empty, please, add items to cart </small></div>}
                 {cartData.items &&  cartData.items.map( (item ,index)=> 
                     <div class="cart_items" key={index}>
                         <ul class="cart_list">
                             <li class="cart_item clearfix">
                                 <div class="cart_item_image "><img className='img-thumbnail' style={{ width:100  }} src={item.image} alt={item.productNAme} /></div>
                                 <div class="cart_item_info d-flex flex-md-row flex-column justify-content-between">
                                     <div class="cart_item_name cart_info_col">
                                         <div class="cart_item_title">Name</div>
                                         <div class="cart_item_text">{item.productName}</div>
                                     </div>
                                     <div class="cart_item_color cart_info_col">
                                         <div class="cart_item_title">Product Id</div>
                                         <div class="cart_item_text"><span style={{ backgroundColor:"#999999" }}></span>{item.productId}</div>
                                     </div>
                                     <div class="cart_item_color cart_info_col">
                                     <div class="cart_item_title"><br/></div>
                                     <div class="cart_item_text" style={{ color:"brown" }}><FaPlus onClick={(e)=>plusItem(item)} /></div> 
                                     </div>
                                     <div class="cart_item_quantity cart_info_col">
                                         
                                         <div class="cart_item_title">Quantity</div>
                                         <div class="cart_item_text">{item.quantity}</div>
                                        
                                     </div>
                                     <div class="cart_item_color cart_info_col">
                                     <div class="cart_item_title"><br/></div>
                                     <div class="cart_item_text" style={{ color:"brown" }}>< FaMinus  onClick={(e)=>minusItem(item)}/></div> 
                                     </div>
                                     <div class="cart_item_price cart_info_col">
                                         <div class="cart_item_title">Price</div>
                                         <div class="cart_item_text">{item.price}</div>
                                     </div>
                                     <div class="cart_item_total cart_info_col">
                                         <div class="cart_item_title">Total</div>
                                         <div class="cart_item_text">{item.price}</div>
                                     </div>
                                     <div class="cart_item_total cart_info_col">
                                         <div class="cart_item_title"><br/></div>
                                         <div class="cart_item_text"><button onClick={ (e)=> removeItem(item)} style={{ backgroundColor:"red", outline:1 ,borderRadius:"5%",color:"#fff" }}>Remove</button></div>
                                     </div>
                                 </div>
                             </li>
                         </ul>
                     </div> 
                        )}    
                     <div class="order_total">
                         <div class="order_total_content text-md-right">
                             <div class="order_total_title">Order Total:</div>
                             <div class="order_total_amount">{cartData.totalPrice}</div>
                         </div>
                     </div>
                     <div class="cart_buttons"> <button type="button" onClick={goBack} class="button cart_button_clear">Continue Shopping</button> <button type="button" onClick={ ()=> payment(cartData)} class="button cart_button_checkout">Proceed to pay</button> </div>
                     { cartInfo && <ConfirmOrder  data={cartInfo} />} 
                 </div>
             </div>
         </div>
     </div>
 </div>
  )
}

export default Cart
