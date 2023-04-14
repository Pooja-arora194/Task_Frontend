import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {

  const navigate = useNavigate();

  const [data, setData] = useState({
    name: "",
    password: "",
    email: "",
    phonenumber: "",
    
  })



  const handlesubmit = async (e) => {
    e.preventDefault();
  };


  const values = (e) => {

    setData({ ...data, [e.target.name]: e.target.value });

  }

  const add = () => {

    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    const {name,email, password, phonenumber} = data;
  

    if(!name || !email || !password || !phonenumber){
      toast.error("All fields are required")
      return
    }

    axios
      .post(`http://localhost:8000/signup`, {name:name, email:email,password:password, phonenumber:phonenumber}, config)
      .then((res) => {
        setData(res.data)
        toast.success('Record Add Successfully')
        navigate('/login');
      })
      .catch((err) => {
        toast.error(err?.response?.data?.msg);
      });
    setData({ name: "", email: "", password: "", dob: "", phonenumber: "" })
  }
  return (
    <>
       <ToastContainer></ToastContainer>
      <div className="container mt-4">

        <div className="col-sm-6 mx-auto">
          <div className="card">
            <div className="card-header">
              <h3 className="text-center pt-5">SIGNUP FORM </h3>
            </div>
            <div className="card-body">
              <form onSubmit={handlesubmit}>
                <div className="form-login-wrapper">
                  <div className="form-group" align="left">
                    <label>Name*</label>
                    <input
                      type="text"
                      className="form-control formtext"

                      placeholder="Enter Name"
                      name="name"
                      onChange={values}
                      value={data.name}
                      required
                    />
                  </div>
                  <div className="form-group" align="left">
                    <label>Email*</label>
                    <input
                      type="email"
                      className="form-control formtext email"

                      placeholder="Enter Email"
                      name="email"
                      onChange={values}
                      value={data.email}
                      required
                    />
                  </div>
                  <div className="form-group " align="left">
                    <label>Password*</label>
                    <input
                      type="password"
                      className="form-control formtext password"

                      placeholder="Password"
                      name="password"
                      id="Password"
                      onChange={values}
                      value={data.password}
                      required
                    />
                  </div>
                  <div className="form-group" align="left">
                    <label>Phone Number*</label>
                    <input
                      type="phonenumber"
                      className="form-control formtext "

                      placeholder="Phonenumber"
                      name="phonenumber"
                      id="Phonenumber"
                      onChange={values}
                      value={data.phonenumber}
                      required
                    />
                  </div>
                 

                  <div className="submit-btn mt-2" align="right">
                    <input
                      type="submit"
                      name="submit"
                      className="btn btn-danger"
                      value="SIGNUP" onClick={add}

                    />
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

export default SignUp;