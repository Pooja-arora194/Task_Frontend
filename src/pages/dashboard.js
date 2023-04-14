import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Dashboard = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    let authtokens = localStorage.getItem("authtoken");
    if (!authtokens) {
      navigate("/login");
    } else {
      setShow(true);
    }
  });
  const logout = () => {
    localStorage.removeItem("authtoken");
    navigate("/");
  };

  return (
    <>
      {show ? (
        <>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarNavAltMarkup"
            aria-controls="navbarNavAltMarkup"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav">
              <a className="nav-item nav-link active active-class">
                Dashboard
              </a>
              <button
                className="nav-item nav-link active btn btn-default"
                onClick={logout}
              >
                Logout
              </button>
            </div>
          </div>
        </nav>
        <h5 className="dashboard-page">Welcome to Dashboard Page</h5>
       </>
      ) : (
        ""
      )}
    </>
  );
};

export default Dashboard;
