import React, { useEffect, useState } from "react";
import AuthService from "../services/auth.service";
import profileService from "../services/profile.service";
import '../css/Profile.css';
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();
    const [userData ,setUserData]=  useState("");
    const navigate = useNavigate();
    
    let fullName=currentUser.username;

    useEffect(() => {
        getProfiles()
    },[])
    
    const getProfiles = () => {
        profileService.getProfileByUsername(fullName).then((response) => {
            setUserData( response.data)
            console.log(response.data);
        });
      };
    const editProfileHandler = ()=>{

        navigate('/editProfile');
    }

    return (
        <>
        <div class="page-content page-container" id="page-content">
        <div class="padding">
        <div class="row container d-flex justify-content-center">
            <div class="col-xl-6 col-md-12">
                <div class="card user-card-full">
                    <div class="row m-l-0 m-r-0">
                        <div class="col-sm-4 bg-c-lite-green user-profile">
                            <div class="card-block text-center text-white">
                                <div class="m-b-25"> <img src={userData.image} class="img-radius" alt="User-Profile-Image" className="profile-img-card"/> </div>
                                <h6 class="f-w-600">ProfileId: {userData.profileId}</h6>
                                <h6 class="f-w-600">{userData.fullName}</h6>
                                <p>{currentUser.roles}</p> <i class=" mdi mdi-square-edit-outline feather icon-edit m-t-10 f-16"></i>
                            </div>
                        </div>
                        <div class="col-sm-8">
                            <div class="card-block">
                                <h4 class="m-b-20 p-b-5 b-b-default f-w-600">Profile</h4>
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Email</p>
                                        <h6 class="text-muted f-w-400">{userData.emailId}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">Phone</p>
                                        <h6 class="text-muted f-w-400">{userData.mobileNumber}</h6>
                                    </div>
                                </div>
                             
                                <div class="row">
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">About</p>
                                        <h6 class="text-muted f-w-400">{userData.about}</h6>
                                    </div>
                                    <div class="col-sm-6">
                                        <p class="m-b-10 f-w-600">D.O.B</p>
                                        <h6 class="text-muted f-w-400">{userData.dateOfBirth}</h6>
                                    </div>
                                </div>
                                <ul class="social-link list-unstyled m-t-40 m-b-10">
                                    <button class="btn btn-dark" onClick={editProfileHandler}>Edit Profile</button>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </>
            

            
    );
};

export default Profile;