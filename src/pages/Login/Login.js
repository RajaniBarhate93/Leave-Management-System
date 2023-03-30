import { Link } from 'react-router-dom';
import React, { useState, useEffect } from "react";
//import basestyle from "../Base.module.css";
import "./Login.css";
import axios from "axios";
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
    sessionStorage.setItem("type", type);
    var pageView = sessionStorage.getItem("type");
  }, [type, checked]);

const tempData= 
{
  "empId": 1012,
  "lstLeaveDetails": [
    {
      "id": 1,
      "empId": 1011,
      "empName": "Ryan Sann",
      "startDate": "23-03-2023",
      "endDate": "24-03-2023",
      "leaveType": {
        "id": 1,
        "name": "Privilege Leave"
      },
      "leaveStatus": "APPLIED",
      "comments": "please approve request",
      "approverComments": null
    }
  ]
}

  const handleChangeToggle = val => {
    setChecked(val)
    if (val) {
      setType("employee")
    } else if (val == false) {
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
 
  const cancelHandler = (e) => {
    navigate("/")


  }
  const loginHandler = (e) => {
    e.preventDefault();
    // setFormErrors(validateForm(user));
    setIsSubmit(true);
    // if (!formErrors) {
    //   alert("Please try again.....")
    // }
    //if (isSubmit) {
    //call login api
    let userDetail = user
    let userT = ""

    if (type === "Approver") {
      userT = "A"
    }
    else if (type === "employee") {
      userT = "E"
    }

    let request = {
      "username": userDetail.email,
      "userType": userT,
      "password": userDetail.password
    }
    let url="http://localhost:9000/login"
    var apiResponse=[]
    axios({
      method: 'post',
      url: "http://localhost:9000/login",
      headers: {
        'Content-Type': 'application/json'         
               }, 
       data: {
				username: userDetail.email,
				userType: userT,
				password: userDetail.password
			}
    })
      .then((response) => {      
        if (response.data) {    
       sessionStorage.setItem("empID", response.data.empId);
       if(response.data.lstLeaveDetails){
        sessionStorage.setItem("lstLeaveDetails", JSON.stringify(response.data));        
       }
                 navigate("/records", { state: { userType: type  } });
        }
      })
      .catch((error) => {
        console.log(error)
     //   navigate("/records", { state: { userType: type,response:tempData } });
      })
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
          {checked ? <span>Login with Employee</span> : <span>Login with  Approver</span>}
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



