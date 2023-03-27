import React, { useState, useEffect, forwardRef } from 'react';
import { json } from 'react-router-dom';
import "./table.css"
import Modal from "react-modal";
import DatePicker from 'react-date-picker';
import { useNavigate, useLocation } from "react-router-dom";
import moment from 'moment';

const options = [
    { id: 1, name: "Privilege Leave" },
    { id: 2, name: "Casual Leave " },
    { id: 3, name: "Sick Leave" },
    { id: 4, name: "Maternity Leave" },
    { id: 5, name: "Paternity Leave" }
];

function EditLEaveComponent(props) {
    const navigate = useNavigate();
    let eDate = props.editData.endDate
    var eDateArray = eDate.split("-");
    var newEdate = eDateArray[1] + '/' + eDateArray[0] + '/' + eDateArray[2];
    let sDate = props.editData.startDate
    var sDateArray = sDate.split("-");
    var newSdate = sDateArray[1] + '/' + sDateArray[0] + '/' + sDateArray[2];
    const [startDate, setStartDate] = useState(new Date(newSdate));
    const [endDate, setEndDate] = useState(new Date(newEdate));
    const [leaveTypeId, setLeaveTypeId] = useState();
    const applyHandler = () => {
        props.hideModal()
    }
    useEffect(() => {
        if (props.editData) {
            options.map((val, k) => {
                if (val.name == props.editData.leaveType.name) {
                    setLeaveTypeId(val.id)
                }
            })

        }
    }, [])

    return (
        <Modal isOpen={props.modalIsOpen} onHide={props.hideModal}>
            <div className="App">
                <div className="container">
                    <h1 className='h2T'><u>Edit Leave</u></h1>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1%" }}>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                            <p style={{ marginRight: "5px" }}>From Date</p>
                            <DatePicker onChange={setStartDate} value={startDate} />
                        </div>
                        <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "4%" }}>
                            <p style={{ marginRight: "5px" }}>  To Date</p>
                            <DatePicker onChange={setEndDate} value={endDate} />
                        </div>
                    </div>
                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1%" }}>
                        <p style={{ marginRight: "5px" }}>Leave Type</p>

                        {
                            leaveTypeId ?
                                <select id="select" defaultValue={options[leaveTypeId]} style={{ "backgroundColor": "#F2CC8F" }}>
                                    {
                                        options.map((val, k) => {
                                            return (
                                                <option value={val.id} >{val.name}</option>
                                            )
                                        })
                                    }

                                </select>
                                : ""
                        }

                    </div>

                    <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
                        <p >Comment</p>
                        < textarea className='richtxt' defaultValue={props.editData.comments} id="w3review" name="w3review" rows="3" cols="50"></textarea>
                    </div>

                    <div style={{ marginTop: "2%" }}>
                        {/* <Link className='btn_common' to='/approval'>Apply</Link> */}
                        <button className='btn_common' onClick={applyHandler} >Update</button>
                        <button className='btn_common' onClick={props.hideModal}>Cancel</button>
                    </div>
                </div></div>


        </Modal>
    )
}
export default EditLEaveComponent