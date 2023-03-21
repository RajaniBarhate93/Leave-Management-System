import React, { useState } from 'react';
import { json } from 'react-router-dom';
import "./table.css"
import Modal from "react-modal";
import DatePicker from 'react-date-picker';
import Select from "react-dropdown-select";

import { useNavigate, useLocation } from "react-router-dom";
// const options = [
//     { id: 1, name: "Privilege Leave" },
//     { id: 2, name: "Casual Leave " },
//     { id: 3, name: "Sick Leave" },
//     { id: 4, name: "Maternity Leave" },
//     { id: 5, name: "Paternity Leave" }
// ];
let options = [
    { value: 'C++', label: 'C++' },
    { value: 'JAVA', label: 'JAVA' },
    { value: 'Javascript', label: 'Javascript' },
    { value: 'Python', label: 'Python' },
    { value: 'Swift', label: 'Swift' }
];
function EditLEaveComponent(props) {
    const navigate = useNavigate();
    const [fromDate, setFromDate] = useState();
    const [startDate, setstartDate] = useState();
    const [toDate, setToDate] = useState();
    const [selectValues, setselectValues] = useState();
    console.log(props.editData.LeaveType)

    const handleChangeFrom = (date) => {
        setFromDate(date)
        console.log("date==", this.state.fromDate)
    }
    const handleChangeTo = (date) => {
        setToDate(date)
        console.log("date==", this.state.toDate)
    }
    const setValues = selectValues => setselectValues(selectValues);
    const applyHandler = () => {

        props.hideModal()
    }
    const cancelHandler = (e) => {
        navigate("/records");
    }

    return (
        <Modal isOpen={props.modalIsOpen} onHide={props.hideModal}>
            <div className="App">

                <div className="container">

                    <h1 className='h2T'><u>Edit Leave</u></h1>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1%" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <p style={{ marginRight: "5px" }}>From Date</p>
                            <DatePicker
                                // value={fromDate}
                                // selected={startDate}
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
                            value={options.value}
                            options={options}
                            defaultValue={options[1]}
                        />

                        {/* <select id="select" defaultValue={options[props.editData.LeaveType]}>
                            {
                                options.map((val, k) => {
                                    return (
                                        <option value={val.id} key={k}>{val.name}</option>
                                    )
                                })
                            }

                        </select> */}
                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
                        <p >Comment</p>
                        < textarea className='richtxt' id="w3review" name="w3review" rows="3" cols="50"></textarea>
                    </div>

                    <div style={{ marginTop: "2%" }}>
                        {/* <Link className='btn_common' to='/approval'>Apply</Link> */}
                        <button className='btn_common' onClick={applyHandler} >Save</button>
                        <button className='btn_common' onClick={props.hideModal}>Cancel</button>
                    </div>
                </div></div>


        </Modal>
    )
}
export default EditLEaveComponent