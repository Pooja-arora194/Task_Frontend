import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Login = () => {
  useEffect(() => {
    let authtokens = localStorage.getItem("authtoken");
    if (authtokens) {
      navigate("/dashboard");
    }
  });

  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handlesubmit = async (e) => {
    e.preventDefault();
  };

  const setdata = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const add = () => {
    const { email, password } = data;
    if (!email || !password) {
      toast.error("Email or Password is required");
      return;
    }

    axios
      .post(`http://localhost:8000/login`, data)
      .then((res) => {
        toast.success("Login Successfully");
        localStorage.setItem("authtoken", res.data.authtoken);
        navigate("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.msg);
      });
    setData({ email: "", password: "" });
  };

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container mt-4">
        <div className="col-sm-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center pt-5">LOGIN FORM </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handlesubmit}>
                <div className="form-login-wrapper">
                  <div className="form-group" align="left">
                    <label>Email Id</label>
                    <input
                      type="email"
                      className="form-control formtext email"
                      placeholder="Email"
                      name="email"
                      id="Email"
                      onChange={setdata}
                      value={data.email}
                    />
                  </div>

                  <div className="form-group mt-4" align="left">
                    <label>Password</label>
                    <div className="password_eye">
                      <input
                        type="password"
                        className="form-control formtext password"
                        placeholder="Password"
                        name="password"
                        value={data.password}
                        onChange={setdata}
                      />
                    </div>

                    <button
                      type="submit"
                      name="submit"
                      className="btn btn-danger mt-4"
                      value="Login"
                      onClick={add}
                    >
                      Submit
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
