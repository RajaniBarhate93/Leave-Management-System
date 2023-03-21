import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import "./Approval.css"
import DatePicker from 'react-date-picker';
import Select from "react-dropdown-select";
import { Link } from 'react-router-dom';
import moment from 'moment';
const options = [{ id: 1, name: "Privilege Leave" }, { id: 2, name: "Casual Leave " },
{ id: 3, name: "Sick Leave" }, { id: 4, name: "Maternity Leave" },
{ id: 5, name: "Paternity Leave" }];

function Approval(props) {

    const navigate = useNavigate();
    const [fromDate, setFromDate] = useState();
    const [startDate, setstartDate] = useState();
    const [toDate, setToDate] = useState();
    const [selectValues, setselectValues] = useState();
    const [approvalObj, setapprovalObj] = useState({});


    useEffect(() => {
        var retrievedObject = sessionStorage.getItem('selectedRow');
        var obj = JSON.parse(retrievedObject)
        setapprovalObj(obj)
        var formateddate = moment(obj.startDate).format('DD-MM-YYYY');
        var dateChanged = formateddate.split("-").join("/");
        var dateString = dateChanged
        var dateObject = new Date(dateString);
        setFromDate(dateObject.toString())
        console.log("Mydate ++ = " + dateObject.toString());
        var formateddates = moment(obj.endDate).format('DD-MM-YYYY');
        var dateChangeds = formateddates.split("-").join("/");
        var dateStrings = dateChangeds
        var dateObjects = new Date(dateStrings);
        setToDate(dateObjects.toString())


    }, []);


    const setValues = selectValues => setselectValues(selectValues);

    const applyHandler = (event) => {

    }

    const cancelHandler = (e) => {
        navigate("/records");
    }
    const rejectHandler = (e) => {

    }


    return (
        <div className="App">
            <div className="container">

                <h1 className='h1T'><u>Leave Management System</u></h1>
                <h2 className='h2T'>Leave Approval Screen</h2>

                <div className='main_container'>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "2%" }}>
                        <label>  Employee ID  </label>
                        <input
                            name="empId"
                            type="text"
                            value={approvalObj.empId}
                        />
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
                        <label>  Employee Name  </label>
                        <input
                            name="empName"
                            type="text"
                            value={approvalObj.empName}
                        />   </div>


                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1%" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <p style={{ marginRight: "5px" }}>From Date</p>
                            <DatePicker
                                value={fromDate}
                                selected={startDate}
                                dateFormat="dd/mm/yyyy"
                            />
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "4%" }}>
                            <p style={{ marginRight: "5px" }}>  To Date</p>
                            <DatePicker
                                value={toDate}
                                selected={startDate}
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
                            clearable={true}
                            Keep selected item in a list={false}
                            onChange={(values) => this.setValues(values)}
                        />
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%", marginLeft: "7%" }}>
                        <p >Comment</p>
                        < textarea className='richtxt' id="w3review" name="w3review" rows="3" cols="50" value={approvalObj.comments}></textarea>
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
                        <p >Approver's Comment</p>
                        < textarea className='richtxt' id="w3review" name="w3review" rows="3" cols="50"></textarea>
                    </div>

                    <div style={{ marginTop: "2%" }}>
                        <button className='btn_common' onClick={applyHandler}  >Approve</button>
                        <button className='btn_common' onClick={rejectHandler} >Reject</button>
                        <button className='btn_common' onClick={cancelHandler}>Cancel</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Approval;