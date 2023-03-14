import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../utils/header";
import { BASE_URL } from "../../baseUrl";
import { useNavigate } from "react-router-dom";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LayoutTemplate from "../../layout/Layout";

const AddUser = () => {

  const navigate = useNavigate();
  const [role, setRole] = useState('')
  const [show, setShow] = useState(false)
  const [newuser, setNewUser] = useState({
    name: "",
    first_login: "",
    email: "",
    dob: "",
    phonenumber: "",
    date_of_joining: "",
    emp_id: "",
    designation: ""

  },
  )



  const handlesubmit = async (e) => {

    e.preventDefault();
  };


  const values = (e) => {

    setNewUser({ ...newuser, [e.target.name]: e.target.value });

  }


  useEffect(() => {

    let authtokens = localStorage.getItem("authtoken");
    let token = {
      headers: {
        token: authtokens,
        "Content-Type": "application/json",
      },
    };

    if (!authtokens) {
      navigate('/')
    }
  }, [])


  const add = () => {

    const { name, email, first_login, dob, phonenumber, date_of_joining, emp_id, designation } = newuser;

    axios
      .post(`${BASE_URL}/add_user`, newuser)
      .then((res) => {
        setNewUser(res.data)
        toast.success("User Added Successfully")
        navigate('/invite')

        // localStorage.setItem('authtoken', res.data.authtoken);


      })
      .catch((err) => {
        console.log(err);

      });
    setNewUser({ name: "", email: "", first_login: "", emp_id: "", phonenumber: "", dob: "", date_of_joining: "", designation: "" })
  }


  useEffect(() => {

    let authtokens = localStorage.getItem("authtoken");
    if (!authtokens) {
      navigate('/')
    }
    else {
      let display = {
        headers: {
          'token': authtokens,
        }
      }


      axios.get(`${BASE_URL}/all`, display)
        .then((res) => {

          setRole(res.data.role)
          if (res.data.role == 2 || res.data.role == 1) {
            setShow(true)
          }
          else {
            navigate('/')
          }
        })
        .catch((err) => {
          console.log(err);

        });
    };

  }, [])


  return (
    <LayoutTemplate>
      <div className=" layout add-UserLayout">
        <div className="container">
          <h2 className="add-user-heading">Add Employee</h2>

          <form onSubmit={handlesubmit}>
            <div className="row justify-content-between custom-row">
              <div className="col-md-3">
                <label className="addUserLabel">Employee Name</label>
                <input type="text" className=" add_userInput" onChange={values} name="name"
                  value={newuser.name} placeholder="Enter Employee Name" />
              </div>
              <div className="col-md-3">
                <label className="addUserLabel">Email Id</label>
                <input className=" add_userInput" onChange={values}
                  value={newuser.email} placeholder="Enter Email Id" type="email" name=
                  "email" />
              </div>
              <div className="col-md-3">
                <label className="addUserLabel">Password</label>
                <input className=" add_userInput" onChange={values}
                  value={newuser.first_login} placeholder="Enter Password" type="string" name="first_login" />
              </div>
            </div>
            <div className="row justify-content-between custom-row">
              <div className="col-md-3">
                <label className="addUserLabel">Date Of Birth</label>
                <input className=" add_userInput" onChange={values}
                  value={newuser.dob} type="date" placeholder="Enter Date Of Birth" name="dob" />
              </div>
              <div className="col-md-3">
                <label className="addUserLabel">Phone No</label>
                <input className=" add_userInput" onChange={values}
                  value={newuser.phonenumber} placeholder="Enter Phone No" type="phone" name="phonenumber" />
              </div>
              <div className="col-md-3">
                <label className="addUserLabel">Employee ID</label>
                <input className=" add_userInput" onChange={values}
                  value={newuser.emp_id}
                  placeholder="Enter Employee ID" type="string" name="emp_id" />
              </div>
            </div>
            <div className="row  custom-row last-row">
              <div className="col-md-3">
                <label className="addUserLabel">Date Of Joining</label>
                <input className=" add_userInput" onChange={values} value={newuser.date_of_joining} placeholder="Enter Date Of Joining" type="date" name="date_of_joining" />
              </div>
              <div className="col-md-3">
                <label className=" addUserLabel">Designation</label>
                <select className="add_userInput" name="designation" onChange={values}
                  value={newuser.designation}>
                  <option selected>Select Designation</option>
                  <option value="Full Stack Developer">Full Stack Developer</option>
                  <option value="Php Developer">Php Developer</option>
                  <option value="Designer">Designer</option>
                  <option value="SEO">SEO</option>
                  <option value="BDE">BDE</option>
                  <option value="HR">HR</option>

                </select>
                {/* <input className="add_userInput" onChange={values} value={newuser.designation} placeholder="Enter Designation" type="date" /> */}
              </div>
            </div>
            <input type="submit" className="add-employee-btn" value="Add Employee" onClick={add} />
          </form>
        </div>

      </div>
    </LayoutTemplate>
  );


};

export default AddUser;