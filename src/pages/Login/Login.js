import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
//import basestyle from "../Base.module.css";
import "./Login.css";
//import axios from "axios";
import ReactSwitch from 'react-switch';
import { useNavigate, NavLink } from "react-router-dom"

const Login = ({ setUserState }) => {
  const navigate = useNavigate();
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [user, setUserDetails] = useState({
    email: "",
    password: "",
  });
  const [checked, setChecked] = useState(true);
  const [type, setType] = useState("employee");
  useEffect(() => {
    console.log(type);
  }, [type,checked]);
  const handleChangeToggle = val => {
      setChecked(val)
      if(val){
        setType("employee")
      }else if(val==false){
          setType("Approver")
        }
        // if(val ? setType("employee"): setType("Approver"));
  
  }
  const changeHandler = (e) => {
    const { name, value } = e.target;
    setUserDetails({
      ...user,
      [name]: value,
    });
  };
  const validateForm = (values) => {
    const error = {};
    const regex = /^[^\s+@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if (!values.email) {
      error.email = "Email is required";
    } else if (!regex.test(values.email)) {
      error.email = "Please enter a valid email address";
    }
    if (!values.password) {
      error.password = "Password is required";
    }
    return error;
  };
  const cancelHandler = (e) => {
    navigate("/")


  }
  const loginHandler = (e) => {
    e.preventDefault();
    setFormErrors(validateForm(user));
    setIsSubmit(true);
    if (!formErrors) {
      alert("Please try again.....")
    }
    if(isSubmit){
      navigate("/records",{state:{userType:type}});
       
    }
  };

  return (

    <div className="login">
      <form>
        <h1 className='h1T'><u>Leave Management System</u></h1>
        <br />
        <h2 className='h2T'>Login Screen</h2>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={changeHandler}
          value={user.email}
        />
        <p className="error">{formErrors.email}</p>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          onChange={changeHandler}
          value={user.password}
        />
        <p className="error">{formErrors.password}</p>
        <div>
       {checked ? <span>Login with Employee</span>: <span>Login with  Approver</span>}
       </div>
      <ReactSwitch
        checked={checked}
        onChange={handleChangeToggle}
      />
        <div className='btn_container'>
          <button className="button_common" onClick={loginHandler}>
            Login
          </button>
          <button className="button_common" onClick={cancelHandler}>
            Cancel
          </button>
        </div>
      </form>
      <NavLink to="/signup">Not yet registered? Register Now</NavLink>
    </div>
  );
};

export default Login;



