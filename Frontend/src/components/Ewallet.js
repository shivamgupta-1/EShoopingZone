import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { FaAccusoft, FaArrowLeft, FaArrowRight, FaGasPump, FaGooglePlay, FaLightbulb, FaMobile, FaTv, FaUser, FaWater } from "react-icons/fa";
import '../css/eWallet.css'
import AuthService from '../services/auth.service';
import ewalletService from '../services/ewallet.service';
import profileService from '../services/profile.service';


const Ewallet = () => {
    const [userData,setUserData]=useState("");
    const currentUser = AuthService.getCurrentUser();
    const [walletData ,setWalletData]=  useState("");
    const [statement ,setStatement] = useState("");
    const [amount,setAmount]=useState("");
    const [noWallet,setNoWallet] = useState(false);

    const navigate = useNavigate();
    
    let fullName=currentUser.username;
    
    useEffect(() => {

      profileService.getProfileByUsername(fullName).then((response) => {
        console.log(response.data.profileId);
        setUserData(response.data)
        getWallet(response.data.profileId);
        getStatement(response.data.profileId)
       
    });
   

    },[])
   
    const getStatement = (res) => {
       
      ewalletService.getStatement(res).then((response) => {
          setStatement( response.data)
          console.log(response.data);
      });
    }
    
    
  

    const getWallet = (res) =>{
     
    
      ewalletService.getWalletById(res).then((response) => {
          setWalletData( response.data)
          if(!(response.data)){
            setNoWallet(true);
          }
          console.log(response.data);
      });
    }
    
  
      

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

 
    const addToWallet =(e)=>{
        console.log("online Paymnet");
      e.preventDefault();
      const res = loadScript("https://checkout.razorpay.com/v1/checkout.js");
      if (!res) {
        alert("You are offline... Failed to load Razorpay SDK");
        return;
      }
      if(!amount){
        alert("amount is needed")
      }

    ewalletService.createOrder(amount).then((result) => {
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
          description: "Thanks for adding to wallet",
          image: "",
          order_id: order_id,
          handler: function (response) {
            
            let profileId= userData.profileId;
            console.log(profileId)
            let a=amount/100;
            ewalletService.addMoneyToWallet(a,profileId);

            alert("money aadded to  wallet");
            window.location.reload(false)
            const id = setInterval(navigate(navigate("/ewallet")), 3000);
            return () => clearInterval(id);
          },
          prefill: {
            name: "",
            email:"g@gmail.com",
            

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
    const deleteWallet =()=>{
          let profileId = userData.profileId;
          ewalletService.deleteWallet(profileId);
          setNoWallet(true);
    }
    const createAccount =()=>{
      ewalletService.create_wallet(userData.profileId);
      setNoWallet(false);
    }
  return (
    <>
    {noWallet ?(
      <div className='conatiner noW' style={{  }}>
        <p className='para'>EShopping Ewallet 'easy' n 'safe' payment</p>
          <h2 className='head4'>Create your Ewallet account <FaArrowRight/><span><button onClick={createAccount} className='btnCreate'>Create</button></span></h2>
      </div>
    ):(
    <div className='main_div'>
   <button onClick={deleteWallet} className='button-delete'>Delete</button>
	<div class="wallet-container text-center">
    
		<p class="page-title"> <FaAccusoft/> E-wallet Id : {walletData.profileId}<FaUser class="fa fa-user" /></p>
    
		<div class="amount-box text-center">
			<img src="https://lh3.googleusercontent.com/ohLHGNvMvQjOcmRpL4rjS3YQlcpO0D_80jJpJ-QA7-fQln9p3n7BAnqu3mxQ6kI4Sw" alt="wallet" />
			<p>Total Balance</p>
			<p class="amount">{walletData.currentBalance}</p>
		</div>

		<div class="btn-group text-center">
      <input type="text" className='txn-list inP btn ' placeholder='enter amount ' value={amount} onChange={(e)=>setAmount(e.target.value)}/>
			<button type="button" onClick={addToWallet} class="btn btn-outline-light">Add Money</button>
			<button type="button"  onClick={(e)=>{navigate("/cart")}} class="btn btn-outline-light">Pay Bills</button>
			</div>
      {statement && statement.map((i,index)=>
			<div class="txn-history" key={index}>
				<p><b>Recent Transaction</b></p>
				<p class="txn-list ">{i.transactionType} <span className='cen '>{( new Date(i.dateTime)).getDate()}-{( new Date(i.dateTime)).getMonth()}-{( new Date(i.dateTime)).getFullYear()}</span> <span class="debit-amount ">{i.amount}</span></p>
			</div>
      )}

			<div class="footer-menu">
				<div class="row text-center">
					<div class="col-md-3">
						<FaMobile class="fa fa-home"></FaMobile>
						<p>Mobile Recharge</p>
					</div>

					<div class="col-md-3">
						<FaLightbulb class="fa fa-inbox" />
						<p>Electricity</p>
					</div>

					<div class="col-md-3">
						<FaGooglePlay class="fa fa-university"/>
						<p>Google Play Recharge</p>
					</div>

					<div class="col-md-3">
						<FaTv class="fa fa-barcode"/>
						<p>DTH Recharge</p>
					</div>
				</div>
			</div>
</div>
    </div>
    )}
    </>
  )
}

export default Ewallet
