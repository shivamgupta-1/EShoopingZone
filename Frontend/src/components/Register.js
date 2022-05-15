import React, { useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import { isEmail } from "validator";
import MainLogo from "../images/MainLogo.png"

import AuthService from "../services/auth.service";
import {  useNavigate } from "react-router-dom";
import { FaCubes, FaLaugh, FaLeaf, FaPaintRoller } from "react-icons/fa";


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





const Register = () => {
    const form = useRef();
    const checkBtn = useRef();
    const navigate =useNavigate("");
    const currentUser = AuthService.getCurrentUser();

    const [fullName,setFullName] =useState("");
    const [image,setImage]=useState("");
    const [emailId, setEmailId] = useState("");
    const [gender, setGender] = useState("");
    const [about, setAbout] = useState("");
    const [dob, setDob] = useState("");
    const [mobileNumber, setMobile] = useState("");
    const [role, setRole] = useState("");
    const [address, setAddress] = useState([]);
    const [password, setPassword] = useState("");
    const [conPassword, setConPassword] = useState("");
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");


    const onChangeFullname = (e) => {
        const fullName = e.target.value;
        setFullName(fullName);
    };
    const onChangeAddress = (e) => {
        setAddress({ ...address, [e.target.name]: e.target.value });
    }
    const onChangeEmailId = (e) => {
        const email = e.target.value;
        setEmailId(email);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };

    const handleRegister = (e) => {
        e.preventDefault();

        setMessage("");
        setSuccessful(false);

        form.current.validateAll();

        if (checkBtn.current.context._errors.length === 0) {
            
            let dateOfBirth=dob;
            let updatedRole= [role];
            let data={
                fullName,
                image, emailId,
                about,
                dateOfBirth,
                mobileNumber,
                gender,
                updatedRole,
                password,
                
                
             
             }
             console.log(data);
            AuthService.register(data).then(
                (response) => {
                    setMessage(response.data.message);
                    setSuccessful(true);

                    setInterval(()=>{
                        navigate("/login");
                    },3000);
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
        
     <section class="" style={{backgroundColor: "transparent"}}>
        <div className="container  mb-5 ">
            <div className="row d-flex justify-content-center align-items-center ">
            <div class="col col-xl-6">
                <div class="card" style={{borderRadius:"1rem"}}>
                <div class="row g-0">
               

            <div class="col-md-6 col-lg-12 d-flex align-items-center">
              <div class="card-body p-4 p-lg-5 text-black">

                <Form onSubmit={handleRegister} ref={form}>
                    {!successful && (
                        <div>
                            <div class="d-flex align-items-center mb-3 pb-1">
                    <span class="h1 fw-bold mb-0"><FaLaugh  style={{ color: "green" }}/> <FaCubes style={{ color: "red" }}/><FaLeaf style={{ color: "green" }}/> <FaPaintRoller style={{ color: "red" }}/></span>
                  </div>
                            <h5 class=" mb-3 pb-3" style={{letterSpacing: 2 ,fontSize:30, color:"coral",fontWeight:500,fontFamily:"monospace"}}>Create  your account</h5>
                            <div className="form-outline mb-4">
                           
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="fullName">Full Name</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="fullName"
                                    value={fullName}
                                    onChange={onChangeFullname}
                                    validations={[required, vusername]}
                                    placeholder="full name"
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="image">Profile Pic</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="image"
                                    value={image}
                                    onChange= {(e)=>{setImage(e.target.value)}}
                                    placeholder="paste your pic url here.."
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="email">Email</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="email"
                                    value={emailId}
                                    onChange={onChangeEmailId}
                                    validations={[required, validEmail]}
                                    placeholder="email Id"
                                />
                            </div>
                            
                            <div className="form-outline mb-4">
                                <label class="form-label"style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="about">About</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="about"
                                    value={about}
                                    onChange= {(e)=>{setAbout(e.target.value)}}
                                    placeholder="about"
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="dob">DOB</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="date"
                                    
                                    className="form-control"
                                    name="dob"
                                    value={dob}
                                    onChange= {(e)=>{setDob(e.target.value)}}
                                    placeholder="date of birth"
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="mobileNumber">Mobile Number</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="mobileNumber"
                                    value={mobileNumber}
                                    onChange= {(e)=>{setMobile(e.target.value)}}  validations={[required , vmobile]}
                                    placeholder="mobile number"
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="gender">Gender</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="gender"
                                    value={gender}
                                    onChange= {(e)=>{setGender(e.target.value)}}  validations={[required]}
                                    placeholder="'Male' or 'Female or 'Other'"
                              />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="role">Role</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="text"
                                    value={role}
                                    onChange= {(e)=>{setRole(e.target.value)}}  validations={[required]}
                                    placeholder="'user' or 'merchant'"
                                />
                            </div>

                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="password">Password</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="password"
                                    className="form-control"
                                    name="password"
                                    value={password}
                                    onChange={onChangePassword}
                                    validations={[required, vpassword]}
                                    placeholder="password"
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="conPassword"> Confirm Password</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="password"
                                    className="form-control"
                                    name="conPassword"
                                    value={conPassword}
                                    onChange= {(e)=>{setConPassword(e.target.value)}}
                                    validations={[required, vconpass]}
                                    placeholder="confirm password"
                                />
                            </div>

                            <div class=" row mt-3 ">
                <div class="d-flex justify-content-between align-items-center experience"><span style={{ fontWeight:"bold",fontSize: 30 }}>Address</span></div><br/>
                <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="houseNumber"> HouseNumber</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="houseNumber"
                                    value={address.houseNumber}
                                    placeholder="house no."
                                    onChange= {onChangeAddress}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="streetName">Street Name</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="streetName"
                                    placeholder="street name"
                                    value={address.streetName}
                                    onChange= {onChangeAddress}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="colonyName">Colony Name</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="colonyName"
                                    placeholder="colony name"
                                     value={address.colonyName} 
                                     onChange= {onChangeAddress}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="City">City</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="City"
                                    value={address.city}
                                     onChange= {onChangeAddress}
                                     placeholder="city name"
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="state">State</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="state"
                                    placeholder="state name"
                                     value={address.state}
                                      onChange= {onChangeAddress}
                                />
                            </div>
                            <div className="form-outline mb-4">
                                <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="pincode">Pincode</label>
                                <Input
                                    class="form-control form-control-lg"
                                    type="text"
                                    className="form-control"
                                    name="pincode"
                                    placeholder="pincode "
                                     value={address.pincode}
                                      onChange= {onChangeAddress}
                                />
                            </div>
                
            </div>

                            <div className="pt-1 mb-4">
                                <button data-testid='register-button' className="btn btn-dark btn-lg btn-block">Sign Up</button>
                            </div>
                            <span style={{float:"left", color:"lightslategray", marginTop:10 }}>  Already have an account ? <a style={{ textDecoration:"none", fontWeight:700}} href="/login">Login</a></span>
                        </div>
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
        </div>
        </div>
        </div>
     </section>
     
    );
};

export default Register;