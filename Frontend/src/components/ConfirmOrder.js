import axios from "axios";
import React, { useEffect, useRef, useState } from "react";

import { Navigate, useNavigate } from "react-router-dom";
import "../css/OrderPay.css";
import AuthService from "../services/auth.service";
import cartService from "../services/cart.service";
import orderService from "../services/order.service";
import CheckButton from "react-validation/build/button";
import Form from "react-validation/build/form";
import ewalletService from "../services/ewallet.service";
import profileService from "../services/profile.service";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};
const vmobile = (value) => {
  if (!/^\d{10}$/.test(value)) {
    return (
      <div className="alert alert-danger" role="alert">
        Mobile no.is invalid
      </div>
    );
  }
};

const ConfirmOrder = () => {
  const form = useRef();
  const checkBtn = useRef();

  const currentUser = AuthService.getCurrentUser();
  const [mode, setMode] = useState("");
  const navigate = useNavigate();
  const [userData ,setUserData] = useState("");
  const [mobileNumber, setMobile] = useState("");
  const [flatNumber, setflatno] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [state, setState] = useState("");

  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");

  const [cartData, setCartData] = useState("");
  const cartId = currentUser.username.length + 1;
  
  const [walletData ,setWalletData] = useState("");
  const today = new Date();
  let date = today.getDate() + 4;

  let fullName = currentUser.username;

  function loadScript(src) {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  }

  useEffect(() => {

    profileService.getProfileByUsername(fullName).then((response) => {
      console.log(response.data.profileId);
      setUserData(response.data);
      getWallet(response.data.profileId);
    });
    const id = setInterval(getCartById, 3000);
    return () => clearInterval(id);

   
      
  },[]);
  const getWallet = (res) =>{

    ewalletService.getWalletById(res).then((response) => {
        setWalletData( response.data)
        console.log(response.data);
    });
  }

  const getCartById = () => {
    cartService
      .getCartbyId(cartId)
      .then((response) => {
        setCartData(response.data);
      })
      .catch((error) => {
        console.log("ERROR:: ", error.response.data);
        setCartData(error.response.data);
      });
  };

  const goBack = () => {
    navigate("/cart");
  };

  const makePayment = (e) => {
    if (mode === "cash") {
      console.log("cash Paymnet");

      e.preventDefault();

      setMessage("");
      setSuccessful(false);

      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
        let fullName = currentUser.username;
        let data = {
          fullName,
          mobileNumber,
          flatNumber,
          city,
          pincode,
          state,
        };
        orderService.add_OrderAddress(data);
        let data2 = cartData;
        orderService.place_Order(data2, mode, fullName);
        alert("Your order is confirmed");
        const id = setInterval(navigate(navigate("/allOrders")), 3000);
        return () => clearInterval(id);
      }
    }
     else if (mode==="online"){
      console.log("online Paymnet");
      e.preventDefault();
      const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("You are offline... Failed to load Razorpay SDK");
        return;
      }
      let data2 = cartData;
      console.log(data2)
      axios.post("http://localhost:8084/order/pay", data2).then((result) => {
        if (!result) {
          alert("Server error. Are you online?");
          return;
        }
        console.log(result);
        const { amount, id: order_id, currency } = result.data;
        console.log(result.data);
        const options = {
          key: "rzp_test_BL4rFuV9nKRoMc",
          currency: "INR",
          amount: amount,
          name: currentUser.username,
          description: "Thanks for purchasing",
          image: "",
          order_id: order_id,
          handler: function (response) {
            var fullName = currentUser.username;
            let data3 = {
              fullName,
              mobileNumber,
              flatNumber,
              city,
              pincode,
              state,
            };
            orderService.add_OrderAddress(data3);

            let data2 = cartData;
            console.log(data2)
            orderService.place_Order(data2, mode, fullName);

            alert("Your order is confirmed");
            const id = setInterval(navigate(navigate("/allOrders")), 3000);
            return () => clearInterval(id);
          },
          prefill: {
            name: "",
          },
          notes: {
            address: "Razorpay Corporate Office",
          },
          theme: {
            color: "#3399cc",
          },
        };
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
      });
    }
    else{
      console.log("ewallet Paymnet");

      e.preventDefault();

      setMessage("");
      setSuccessful(false);

     

      form.current.validateAll();
      if (checkBtn.current.context._errors.length === 0) {
        if(walletData.currentBalance<cartData.totalPrice){
          alert("Wallet Balance is less than cart total please , add more money   or choose another payment method")
        }else{
        let fullName = currentUser.username;
        let data = {
          fullName,
          mobileNumber,
          flatNumber,
          city,
          pincode,
          state,
        };

        let amount =cartData.totalPrice;
       
        let profileId = userData.profileId;
        console.log(amount,profileId);
        ewalletService.doTransaction( profileId,amount);
        orderService.add_OrderAddress(data);
        let data2 = cartData;
        orderService.place_Order(data2, mode, fullName);
        alert("Your order is confirmed");
        const id = setInterval(navigate(navigate("/allOrders")), 3000);
        return () => clearInterval(id);
      }
    }
    }
  };

  const onChangeMode = (e) => {
    console.log(e.target.value);
    setMode(e.target.value);
  };

  return (
    <div>
      <div class="container2 mt-5 px-5">
        <div class="mb-4">
          <h2>Confirm order and pay</h2>
          <span>
            please make the payment, after that you can enjoy all the cashback
            and free coupons.
          </span>
        </div>

        <div class="row">
          <div class="col-md-8">
            <Form ref={form}>
              {!successful && (
                <>
                  <div class="card2 p-3">
                    <h6 class="text-uppercase">Choose Payment Mode</h6>

                    <div class="col-md-6" onChange={onChangeMode}>
                      <div class="form-check">
                        {" "}
                        <input
                          class="form-check-input"
                          type="radio"
                          value="cash"
                          name="mode"
                        />{" "}
                        <label
                          style={{ display: "flex" }}
                          class="form-check-label"
                        >
                          Cash on Delivery
                        </label>
                      </div>
                      <div class="form-check">
                        {" "}
                        <input
                          class="form-check-input"
                          type="radio"
                          value="online"
                          name="mode"
                        />{" "}
                        <label class="form-check-label">Online Payment</label>
                      </div>
                      <div class="form-check">
                        {" "}
                        <input
                          class="form-check-input"
                          type="radio"
                          value="ewallet"
                          name="mode"
                        />{" "}
                        <label class="form-check-label">Pay with  Ewallet</label>
                      </div>
                    </div>

                    <div class="row">
                      <div class="col-md-6"></div>

                      <div class="col-md-6"></div>
                      <div class="col-md-6"></div>
                    </div>

                    <div class="mt-4 ">
                      <h6 class="text-uppercase"> Address</h6>

                      <div class="row mt-3">
                        <div class="col-md-6">
                          <div class="inputbox mt-3 mr-2">
                            {" "}
                            <input
                              type="text"
                              name="name"
                              class="form-control"
                              required="required"
                              value={flatNumber}
                              onChange={(e) => {
                                setflatno(e.target.value);
                              }}
                              validations={[required]}
                            />{" "}
                            <span>Flat Number</span>{" "}
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="inputbox mt-3 mr-2">
                            {" "}
                            <input
                              type="text"
                              name="name"
                              class="form-control"
                              required="required"
                              value={city}
                              onChange={(e) => {
                                setCity(e.target.value);
                              }}
                              validations={[required]}
                            />{" "}
                            <span>City</span>{" "}
                          </div>
                        </div>
                        <div class="col-md-12">
                          <div class="inputbox mt-3 mr-2">
                            {" "}
                            <input
                              type="text"
                              name="name"
                              class="form-control"
                              required="required"
                              value={mobileNumber}
                              onChange={(e) => {
                                setMobile(e.target.value);
                              }}
                              validations={[required, vmobile]}
                            />{" "}
                            <span>Mobile Number</span>{" "}
                          </div>
                        </div>
                      </div>

                      <div class="row mt-2">
                        <div class="col-md-6">
                          <div class="inputbox mt-3 mr-2">
                            {" "}
                            <input
                              type="text"
                              name="name"
                              class="form-control"
                              required="required"
                              value={state}
                              onChange={(e) => {
                                setState(e.target.value);
                              }}
                              validations={[required]}
                            />{" "}
                            <span>State/Province</span>{" "}
                          </div>
                        </div>

                        <div class="col-md-6">
                          <div class="inputbox mt-3 mr-2">
                            {" "}
                            <input
                              type="text"
                              name="name"
                              class="form-control"
                              value={pincode}
                              onChange={(e) => {
                                setPincode(e.target.value);
                              }}
                              validations={[required]}
                              required="required"
                            />{" "}
                            <span>Pincode code</span>{" "}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  {walletData ? (
                  <div class=" d-flex justify-content-between amt-box text-center">
                    <img className="wallet_img" src="https://lh3.googleusercontent.com/ohLHGNvMvQjOcmRpL4rjS3YQlcpO0D_80jJpJ-QA7-fQln9p3n7BAnqu3mxQ6kI4Sw" alt="wallet" />
                    <p className="amount2"> Wallet Balance : {walletData.currentBalance}</p>
                  </div>
                  ):(<div></div>)}
                  <div class="mt-4 mb-4 d-flex justify-content-between">
                    <button onClick={goBack}>Previous step</button>

                    <button onClick={makePayment} class="btn btn-success px-3">
                      Pay
                    </button>
                  </div>
                </>
              )}
              {message && (
                <div className="form-group">
                  <div
                    className={
                      successful ? "alert alert-success" : "alert alert-danger"
                    }
                    role="alert"
                  >
                    {message}
                  </div>
                </div>
              )}
              <CheckButton style={{ display: "none" }} ref={checkBtn} />
            </Form>
          </div>

          <div class="col-md-4">
            <div class="card2 card2-blue p-3 text-white mb-3">
              <span>You have to pay</span>
              <div class="d-flex flex-row align-items-end mb-3">
                <h1 class="mb-0 yellow">Rs.{cartData.totalPrice}</h1>
              </div>

              <span>Free delicervy : {date} of this month expected</span>
              <a href="#" class="yellow decoration">
                12 day return policy
              </a>

              <div class="hightlight">
                <span>Discount avilable on credit card</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmOrder;
