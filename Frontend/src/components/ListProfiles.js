import axios from 'axios';
import React, { useEffect, useState } from 'react'
import profileService from '../services/profile.service';
import '../css/ListProfile.css'
import { FaFacebook, FaLinkedinIn, FaTwitter } from 'react-icons/fa';

const ListProfiles = () => {

    const [userData ,setUserData]=  useState("");

    useEffect(() => {
        getProfiles()
    },[])
    
    const getProfiles = () => {
        axios.get("http://localhost:8081/profile/users").then((response) => {
            setUserData( response.data);
            console.log(response.data);
        });
      };
  return (
    <div className='mt-5'>
      <div class="container">
        <div class="row justify-content-center">
          
          <div class="col-12 col-sm-8 col-lg-6">
          
            <div class="section_heading text-center wow fadeInUp" data-wow-delay="0.2s" style={{ animationDelay: 0.2, animationName: "fadeInUp"}}>
              <h3>All user <span> Profiles</span></h3>
             
              <div class="line"></div>
            </div>
          </div>
        </div>
        <div class="row">
        {userData&& userData.map((data,index)=>
          <div class="col-12 col-sm-6 col-lg-3">
            <div class="single_advisor_profile wow fadeInUp" data-wow-delay="0.2s" style={{ animationDelay: 0.2, animationName: "fadeInUp"}}>
         
              <div class="advisor_thumb "><img className='profile-img-card' src={data.image} alt="" />
            
                <div class="social-info"><a href="#"><FaFacebook/></a><a href="#"><FaTwitter/></a><a href="#"><FaLinkedinIn/></a></div>
              </div>
       
              <div class="single_advisor_details_info">
                <h6>{data.fullName}</h6>
                <h6>{data.mobileNumber}</h6>
                <h6>{data.role}</h6>
                <p class="designation">{data.dateOfBirth}</p>
              </div>
            </div>
          </div>
          )}
        
          
        </div>
      </div>
    </div>
  )
}

export default ListProfiles
