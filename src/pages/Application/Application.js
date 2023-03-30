import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import "./Application.css"
import DatePicker from 'react-date-picker';
import axios from "axios";
import Select from "react-dropdown-select";
import moment from 'moment/moment';

const options = [{ id: 1, name: "Privilege Leave" }, { id: 2, name: "Casual Leave " },
{ id: 3, name: "Sick Leave" }, { id: 4, name: "Maternity Leave" },
{ id: 5, name: "Paternity Leave" }];

function Application(props) {
  var getEmpId = JSON.parse(sessionStorage.getItem("lstLeaveDetails"));
  console.log(getEmpId.empId)
  const navigate = useNavigate();
  const [empName, setEmpName] = useState();
  const [empId, setempId] = useState(getEmpId.empId);
  const [fromDate, setFromDate] = useState();
  const [startDate, setstartDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectValues, setselectValues] = useState();
  const [ApplObj, setApplyObj] = useState({ "empId": '', "empName": "", "startDate": "", "endDate": "", "leaveType": "", "comments": "" })
  const { state } = useLocation();

  const handleChangeFrom = (date) => {
    setFromDate(date)
    var date1 = moment(date).format('DD-MM-YYYY');
    setApplyObj({
      ...ApplObj,
      startDate: date1
    });
  }
  const handleChangeTo = (date) => {
    setToDate(date)
    var date1 = moment(date).format('DD-MM-YYYY');
    setApplyObj({
      ...ApplObj,
      endDate: date1
    });

  }

  const setValues = (selectValues) => {
    var temp = selectValues[0]
    setApplyObj({
      ...ApplObj,
      leaveType: temp
    });
  };

  const handleNameChange = (event) => {
    console.log("data..." + event.target.value)
    event.preventDefault();
    setApplyObj({
      ...ApplObj,
      empName: event.target.value
    });
  }

  const handleIdChange = (event) => {
    console.log(event)
    setApplyObj({
      ...ApplObj,
      empId: event.target.value
    });
  }

  const onchangeComment = (event) => {
    event.preventDefault();
    setApplyObj({
      ...ApplObj,
      comments: event.target.value
    });
  }

  const applyHandler = (event) => {
    axios({
      method: 'post',
      url: "http://localhost:9000/saveLeave",
      headers: {
        'Content-Type': 'application/json'
      },
      data: ApplObj

    })
      .then((response) => {
        if (response.data) {
          sessionStorage.setItem("empID", response.data.empId);
          if (response.data.lstLeaveDetails) {
            sessionStorage.setItem("lstLeaveDetails", JSON.stringify(response.data));
          }
        }
      })
      .catch((error) => {
        console.log(error)

      })
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
              disabled={true}
              onChange={(e) => handleIdChange(e)}
            />
          </div>
          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
            <label>  Employee Name  </label>
            <input
              type="text"
              name="empName"
              value={ApplObj.empName}
              onChange={(e) => handleNameChange(e)}
            />   </div>


          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1%" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <p style={{ marginRight: "5px" }}>From Date</p>
              <DatePicker
                value={fromDate}
                selected={startDate}
                onChange={(e) => handleChangeFrom(e)}
                dateFormat="dd/mm/yyyy"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "4%" }}>
              <p style={{ marginRight: "5px" }}>  To Date</p>
              <DatePicker
                value={toDate}
                selected={startDate}
                onChange={(e) => handleChangeTo(e)}
                dateFormat="dd/mm/yyyy"
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
              clearable={false}
              Keep selected item in a list={false}
              defaultValue={ApplObj.leaveType}
              onChange={(values) => setValues(values)}
            />       </div>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
            <p >Comment</p>
            < textarea className='richtxt' id="w3review" name="w3review" rows="3" cols="50" onChange={(e) => onchangeComment(e)}></textarea>
          </div>

          <div style={{ marginTop: "2%" }}>
            <button className='btn_common' onClick={applyHandler} >Apply</button>
            <button className='btn_common' onClick={cancelHandler}>Cancel</button>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Application;