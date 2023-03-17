import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import "./Application.css"
import DatePicker from 'react-date-picker';
import Select from "react-dropdown-select";
//const options1 = ['Privilege Leave', 'Casual Leave ', 'Sick Leave', 'Maternity Leave', 'Paternity Leave.'];
const options = [{ id: 1, name: "Privilege Leave" }, { id: 2, name: "Casual Leave " },
{ id: 3, name: "Sick Leave" }, { id: 4, name: "Maternity Leave" },
{ id: 5, name: "Paternity Leave" }];


function  Application(props) {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     empName: "Ryan Sann",
  //     empId: "101",
  //     fromDate: "",
  //     toDate: "",
  //     selectValues: "",
  //     startDate:"",
  //     data:true

  //   };

    // this.handleInputChange = this.handleInputChange.bind(this);
  //   this.handleSubmit = this.handleSubmit.bind(this);
  //   this.applyHandler = this.applyHandler.bind(this);
  // }

  const navigate = useNavigate();
  const [empName, setEmpName] = useState();
  const [empId, setempId] = useState();
  const [fromDate, setFromDate] = useState();  
  const [startDate, setstartDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectValues, setselectValues] = useState();
  const { state } = useLocation();

  const handleChangeFrom = (date) => {
    setFromDate(date)
    console.log("date==",this.state.fromDate)
  }
  const handleChangeTo = (date) => {
    setToDate(date)
    console.log("date==",this.state.toDate)
  }
  const setValues = selectValues => setselectValues(selectValues);

  const handleInputChange = (event) => {
    console.log("data..." + event.target.value)
    event.preventDefault();
      }
      
      const handleSubmit=(event) =>{
    // event.preventDefault();
    // Userfront.login({
    //   method: "password",
    //   emailOrUsername: this.state.emailOrUsername,
    //   password: this.state.password,
    // });
  }
  
  const applyHandler= (event)=>{
    console.log("kjbskb==")
    // if (this.state.data) {
    //   return <Link  to="/approval" />;
    // }
      
 

  }
  const cancelHandler = (e) => {
    navigate("/records");  
  }
 
    return (
      <div className="App">
        <div className="container">

          <h1 className='h1T'><u>Leave Management System</u></h1>
          <h2 className='h2T'>Leave Application Screen</h2>

          <div className='main_container'>
        
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "2%" }}>
              <label>  Employee ID  </label>
              <input
                 type="text"
                 name="empId"
                 id="Id"
                value={empId}
                onChange={handleInputChange}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
              <label>  Employee Name  </label>
              <input  
                type="text"
                name="empName"
                value={empName}
                onChange={handleInputChange}
              />   </div>


            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1%" }}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "5px" }}>From Date</p>
                <DatePicker
                  value={fromDate}
                  selected={startDate}
                  onChange={handleChangeFrom}
                  format="y-MM-dd"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "4%" }}>
                <p style={{ marginRight: "5px" }}>  To Date</p>
                <DatePicker
                  value={toDate}
                  selected={startDate}
                  onChange={handleChangeTo}
                  format="y-MM-dd"

                />
              </div>
            </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1%" }}>
              <p style={{ marginRight: "5px" }}>Leave Type</p>
              <Select
                multi={false}
                options={options}
                labelField="name"
                valueField="id"
                closeOnSelect={true}
                clearable={true}
                Keep selected item in a list={false}
                onChange={(values) => setValues(values)}
              />       </div>

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
              <p >Comment</p>
              < textarea className='richtxt' id="w3review" name="w3review" rows="3" cols="50"></textarea>
            </div>

            <div style={{ marginTop: "2%" }}>
              {/* <Link className='btn_common' to='/approval'>Apply</Link> */}
              <button className='btn_common' onClick={applyHandler} >Apply</button>
              <button className='btn_common'  onClick={cancelHandler}>Cancel</button>
            </div>
         
          </div>
          
        </div>
      </div>
    );
  }

export default Application;