import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import AuthService from "../services/auth.service";
import { FaCubes, FaLaugh, FaLeaf, FaPaintRoller, FaUser, FaUserLock } from "react-icons/fa";

const required = (value) => {
  if (!value) {
    return (
      <div className="alert alert-danger" role="alert">
        This field is required!
      </div>
    );
  }
};

const Login = () => {
  let navigate = useNavigate();

  const form = useRef();
  const checkBtn = useRef();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const onChangeUsername = (e) => {
    const username = e.target.value;
    setUsername(username);
  };

  const onChangePassword = (e) => {
    const password = e.target.value;
    setPassword(password);
  };

  const handleLogin = (e) => {
    e.preventDefault();

    setMessage("");
    setLoading(true);

    form.current.validateAll();
    if (checkBtn.current.context._errors.length === 0) {
      AuthService.login(username, password).then(
        () => {
          navigate("/home");
          window.location.reload();
        },
        (error) => {
          const resMessage =
            (error.response &&
              error.response.data &&
              error.response.data.message) ||
            error.message ||
            error.toString();

          setLoading(false);
          setMessage(resMessage);
        }
      );
    } else {
      setLoading(false);
    }
  };

  return (
    <section class="" style={{ backgroundColor: "transparent" }}>
      <div className="container mb-5 ">
        <div className="row d-flex justify-content-center align-items-center h-50">
          <div class="col col-xl-4">
            <div class="card" style={{ borderRadius: "1rem" }}>
              <div class="row g-0">
                
                <div class="col-md-6 col-lg-12 d-flex align-items-center">
                  <div class="card-body p-4 p-lg-5 text-black">
                    <Form onSubmit={handleLogin} ref={form}>
                      <div class="d-flex align-items-center mb-3 pb-1">
                        <span class="h1 fw-bold mb-0"><FaLaugh  style={{ color: "green"  }}/> <FaCubes style={{ color: "red" }}/><FaLeaf style={{ color: "green" }}/> <FaPaintRoller style={{ color: "red" }}/></span>
                      </div>
                      <h2
                        class=" mb-3 pb-3"
                        style={{ letterSpacing: 2 ,fontSize:30, color:"coral",fontWeight:500,fontFamily:"monospace"}}
                      >
                        Login {" "}
                      </h2>
                      <div className="form-outline mb-4">
                        <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="username">
                         <FaUser size={25} style={{color:"lightskyblue" ,marginRight:20}}/> Username
                        </label>
                        <Input
                          class="form-control form-control-lg"
                          type="text"
                          className="form-control"
                          name="username"
                          placeholder="username"
                          value={username}
                          onChange={onChangeUsername}
                          validations={[required]}
                        />
                      </div>

                      <div className="form-outline mb-4">
                        <label class="form-label" style={{ color:"slategrey" ,fontWeight:700 }} htmlFor="password">
                         <FaUserLock size={25} style={{color:"lightskyblue" ,marginRight:20}}/> Password
                        </label>
                        <Input
                          class="form-control form-control-lg"
                          type="password"
                          placeholder="password"
                          className="form-control"
                          name="password"
                          value={password}
                          onChange={onChangePassword}
                          validations={[required]}
                        />
                      </div>

                      <div className="pt-1 mb-4">
                        <button
                          className="btn btn-primary btn-block"
                          data-testid="login-button"
                          disabled={loading}
                          style={{ width:150 }}
                        >
                          {loading && (
                            <span className="spinner-border spinner-border-sm"></span>
                          )}
                          <span>Login</span>
                        </button>

                        <span style={{float:"left", color:"lightslategray", marginTop:10 }}>Don't have an account ? Create One <a style={{ textDecoration:"none", fontWeight:700}} href="/register" >Register</a></span>
                      </div>

                      {message && (
                        <div className="form-group">
                          <div className="alert alert-danger" role="alert">
                            {message}Testing-React-main/src/components/Login.js
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

export default Login;
