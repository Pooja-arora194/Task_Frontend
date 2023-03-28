import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { BASE_URL } from "../baseUrl";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoadingOutlined } from '@ant-design/icons';
import { DataContext } from "../context/DataContext";


const Login = () => {
  const { setuser, setToken } = useContext(DataContext)
  const [btnDisabled, setbtnDisabled] = useState(false)
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: ""
  })


  const handlesubmit = async (e) => {
    e.preventDefault();
  };


  const setdata = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });

  }

  const add = () => {
    setbtnDisabled(true)
    const { email, password } = data;
    if (!email || !password) {
      toast.error("Email or Password is required")
      return
    }
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    axios
      .post(`${BASE_URL}/login`, data)
      .then((res) => {
        toast.success("Login Successfully")
        setuser(res.data.user)
        setToken(res.data.authtoken)
        localStorage.setItem("authtoken", res.data.authtoken);
        navigate('/dashboardpage')
      })
      .catch((err) => {
        console.log(err);
        toast.error(err?.response?.data?.msg)
      })
      .finally(() => {
        setbtnDisabled(false)
      })

  }

  return (
    <>
      <ToastContainer></ToastContainer>
      <div className="container login-template">
        <div className="row mt-4">
          <div className="col-md-6">
            <img src="logo.png" className="logo-image"></img>
            <img src="loginimg.gif" className="gif_file" height="400" />
          </div>
          <div className="col-md-6 mt-3" style={{ "align-self": "center" }}>
            <h5 className="employee_page ">EMPLOYEE LOGIN</h5>
            <form onSubmit={handlesubmit} className="form_handle">
              <div className="form-login-wrapper">
                <div className="form-group mt-4" align="left">
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
                  <input
                    type="password"
                    className="form-control formtext password"
                    placeholder="Password"
                    name="password"
                    value={data.password}
                    onChange={setdata}

                  />



                  <button
                    type="submit"
                    name="submit"
                    className="login-form-btn"
                    value="Login" onClick={add}
                    disabled={btnDisabled}

                  >{btnDisabled && <LoadingOutlined style={{ fontSize: 24 }} spin />} Submit</button>

                </div>
              </div>
            </form>
          </div>
        </div>
      </div>

    </>

  );
};

export default Login;