import React, { useEffect, useState } from 'react';
import { useNavigate,useLocation } from "react-router-dom";
import "./Records.css"
import DatePicker from 'react-date-picker';
import Select from "react-dropdown-select";
import TableComponent from '../../components/TableComponent';
import { Link, Redirect } from "react-router-dom"
const checkList = ["Apple", "Banana", "Tea", "Coffee"];
const options = [{ id: 1, name: "Privilege Leave" }, { id: 2, name: "Casual Leave " },
{ id: 3, name: "Sick Leave" }, { id: 4, name: "Maternity Leave" },
{ id: 5, name: "Paternity Leave" }];
var tableData = [  
    {
     id: 1,
     'LeaveType': 'Sick Leve',
     'From': '10th Feb 2023',
     'To': '10th Feb 2023',
     'Action':""
    
   }, {
    id: 2,
    'LeaveType': 'Privilege',
    'From': '10th Feb 2023',
    'To': '10th Feb 2023',
    'Action': ""
  }, {
    id: 3,
    'LeaveType': 'Privilege',
    'From': '10th Feb 2023',
    'To': '10th Feb 2023',
    'Action': ""
  }, {
    id: 4,
     'LeaveType': 'Maternity',
     'From': '10th Feb 2023',
     'To': '10th Feb 2023',
     'Action':""
   }
  ]
  function Records(props){
  const navigate = useNavigate();
  const [empName, setEmpName] = useState();
  const [empId, setempId] = useState();
  const [fromDate, setFromDate] = useState();  
  const [startDate, setstartDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectValues, setselectValues] = useState();
  const { state } = useLocation();

  let showbtn= null
  state.userType === "employee" ? showbtn=true: showbtn =false;


  const handleChangeFrom = (date) => {   
    setFromDate(date)
  }
  const handleChangeTo = (date) => {    
    setToDate(date)
  }
   const setValues = selectValues => setselectValues(selectValues);

  const handleInputChange = (event) => {
    console.log("data..." + event.target.value)
    event.preventDefault();
    const target = event.target;
    // this.setState({
    //   [target.name]: target.value,
    // });
  }

 const handleSubmit=(event)=> {  
  console.log(state.userType)
  navigate("/dashboard");  

 }
 const handleApproveRej=(event)=>{
  navigate("/approval");  
 }
 


  // render() {
    return (
      <div className="App">
        <div className="container">

          <h1 className='h1T'><u>Leave Management System</u></h1>
          <h2 className='h2T'>Leave Records</h2>

          <div className='main_container'>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "2%" }}>
              <label>  Employee ID  </label>
              <input
                name="empId"
                type="text"
                value={empId}
                onChange={handleInputChange}
              />
            </div>


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


            <div style={{ marginTop: "2%", marginBottom: "2%" }}>
              <button className='btn_common' >Search</button>
              <button className='btn_common' >Cancel</button>
              <button className='btn_common' >Reset</button>
            </div>

            <TableComponent data={tableData} userTypes={state.userType} />

            <div style={{ marginTop: "2%" }}>
            {showbtn == true &&  <button className='btn_commonbtm' onClick={handleSubmit}>Apply Leave</button>}
                       
            {showbtn === false && <button className='btn_commonbtm' onClick={handleApproveRej}>Approve/Reject</button>}
            </div>
          </div>
        </div>
      </div>
    );
  }
// }
export default Records;