import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import AuthService from '../services/auth.service';
import profileService from '../services/profile.service';
import { isEmail } from "validator";
import Form from "react-validation/build/form";
import CheckButton from "react-validation/build/button";



const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  
  const validEmail = (value) => {
    if (!isEmail(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
    }
    else if(!/\S+@\S+\.\S+/.test(value)){
      return (
        <div className="alert alert-danger" role="alert">
          This is not a valid email.
        </div>
      );
  }
  };
  
  const vusername = (value) => {
    if (value.length < 3 || value.length > 20) {
      return (
        <div className="alert alert-danger" role="alert">
          The username must be between 3 and 20 characters.
        </div>
      );
    }
  };
  const vconpass = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          conpassword cannot be empty;
        </div>
      );
    }
    else if(value.conpassword !== value.password){
      return (
        <div className="alert alert-danger" role="alert">
          Confirm Password is not same
        </div>
      );
  }
  };
  
  const vpassword = (value) => {
    if (value.length < 8 || value.length > 40) {
      return (
        <div className="alert alert-danger" role="alert">
          The password must be between 8 and 40 characters.
        </div>
      );
    }
  };
  const vmobile = (value) => {
    if (!/^\d{10}$/.test(value)) {
      return (
        <div className="alert alert-danger" role="alert">
          Mobile no.is  invalid
        </div>
      );
    }
  };

function EditProfile() {

    const form = useRef();
    const checkBtn = useRef();

    const currentUser = AuthService.getCurrentUser();
    const [userData ,setUserData]=  useState("");
    const navigate = useNavigate();

   

    const fullName=currentUser.username;
    const [image,setImage]=useState("");
    const [emailId, setEmailId] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const [dob, setDob] = useState("");
    const [mobileNumber, setMobile] = useState("");
    const [address, setAddress] = useState([
    ]);
    const [newPassword, setNewPassword] = useState("");
    const [conNewPassword, setConNewPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
   

    useEffect(() => {
        getProfiles()
    },[])

    const onChangeAddress = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    }
    const getProfiles = () => {
        profileService.getProfileByUsername(fullName).then((response) => {
            setUserData( response.data)
            console.log(response.data);
        });
    
      };
      const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            
           let role=currentUser.roles;
           let dateOfBirth=dob;
           let password=newPassword;
           let data={
               fullName,
               image, emailId,
               about,
               dateOfBirth,
               mobileNumber,
               gender,
               role, 
               password,
               
               
            
            }
               console.log(data);
           profileService.updateProfile(data).then(
                (response) => {
                    setMessage(response.data.message);
                    console.log(response.data.message);
                    setSuccessful(true);
                    alert("Your Profile is updated");
                    navigate("/profile");
                },
                (error) => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    setMessage(resMessage);
                    setSuccessful(false);
                }
            );
        }
    };
  return (
    <>
    <div class="container rounded bg-white mt-5 mb-5">
    <div class="row">
        <div class="col-md-3 border-right">
            <div class="d-flex flex-column align-items-center text-center p-3 py-5"><img class="rounded-circle mt-5" width="150px" src={userData.image}/><span class="font-weight-bold">{userData.fullName}</span><span class="text-black-50">{currentUser.roles}</span><span>Id:{userData.profileId} </span></div>
        </div>
        <div class="col-md-5 border-right">
            <div class="p-3 py-5">
                <div class="d-flex justify-content-between align-items-center mb-3">
                    <h4 class="text-right">Edit Your Profile</h4>
                </div>
                <Form  ref={form}>
                    {!successful && (
                        <>
                <div class="row mt-2">
                    <div class="col-md-6"><label class="labels">Email Id</label><input type="email" class="form-control" placeholder="email Id" value={emailId} onChange= {(e)=>{setEmailId(e.target.value)}}  validations={[required, validEmail]}/></div>
                    <div class="col-md-6"><label class="labels">Mobile No.</label><input type="text" class="form-control" value={mobileNumber} placeholder="mobile number" onChange= {(e)=>{setMobile(e.target.value)}}  validations={[required]}/></div>
                </div>
                <div class="row mt-3">
                    <div class="col-md-12"><label class="labels">Date Of Birth</label><input type="date" class="form-control" placeholder="enter DOB" value={dob} onChange= {(e)=>{setDob(e.target.value)}}/></div>
                    <div class="col-md-12"><label class="labels">About</label><input type="text" class="form-control" placeholder="about" value={about} onChange= {(e)=>{setAbout(e.target.value)}}/></div>
                    <div class="col-md-12"><label class="labels">Gender</label><input type="text" class="form-control" placeholder="gender" value={gender} onChange= {(e)=>{setGender(e.target.value)}}  validations={[required]}/></div>
                    <div class="col-md-12"><label class="labels">Profile Pic</label><input type="text" class="form-control" placeholder="enter your pic url" value={image} onChange= {(e)=>{setImage(e.target.value)}}/></div>
                    <div class="col-md-12"><label class="labels">New Password</label><input type="password" class="form-control" placeholder="enter new password" value={newPassword} onChange= {(e)=>{setNewPassword(e.target.value)}}  validations={[required, vpassword]}/></div>
                    <div class="col-md-12"><label class="labels">Confirm New Password</label><input type="text" class="form-control" placeholder="confirm new passwod" value={conNewPassword} onChange= {(e)=>{setConNewPassword(e.target.value)}}  validations={[required, vconpass]}/></div>

                </div>
                
         
       
             <div class=" row mt-3 ">
                <div class="d-flex justify-content-between align-items-center experience"><span style={{ fontWeight:"bold",fontSize: 30 }}>Address</span></div><br/>
                <div class="col-md-12"><label class="labels">HouseNumber</label><input name="houseNumber" type="text" class="form-control" placeholder="house no." value={address.houseNumber} onChange= {onChangeAddress}/></div> <br/>
                <div class="col-md-12"><label class="labels">Street Name </label><input name="streetName" type="text" class="form-control" placeholder="street name" value={address.streetName} onChange= {onChangeAddress}/></div><br/>
                <div class="col-md-12"><label class="labels">Colony Name</label><input name="colonyName" type="text" class="form-control" placeholder="colony name" value={address.colonyName} onChange= {onChangeAddress}/></div> <br/>
                <div class="col-md-12"><label class="labels">City</label><input name="city" type="text" class="form-control" placeholder="city name" value={address.city} onChange= {onChangeAddress}/></div> <br/>
                <div class="col-md-12"><label class="labels">State</label><input name="state" type="text" class="form-control" placeholder="state name" value={address.state} onChange= {onChangeAddress}/></div> <br/>
                <div class="col-md-12"><label class="labels">Pincode</label><input  name="pincode"type="text" class="form-control" placeholder="pincode " value={address.pincode} onChange= {onChangeAddress}/></div> <br/>
                
            </div>
            
        
        <div class="mt-5 text-center"><button onClick={handleRegister} class="btn btn-primary profile-button" >Save Profile</button></div>
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
       
    </div>
    
</div>
</div>


</>
  )
}

export default EditProfile
