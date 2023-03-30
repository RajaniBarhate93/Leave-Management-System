import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import "./Records.css"
import axios from 'axios';
import DatePicker from 'react-date-picker';
import TableComponent from '../../components/TableComponent';
import { getleaveRecords } from '../../services/Service';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'
import moment from 'moment';
let tableData1 = []
const tableData = [
  { "empId": 1011, "empName": "Ryan Sann", "startDate": "05-02-2023", "endDate": "10-02-2023", "leaveType": "Sick Leave", "comments": "please approve request", 'status': "approved" },
  { "empId": 1012, "empName": "Ryan Sann", "startDate": "07-02-2023", "endDate": "10-02-2023", "leaveType": "Sick Leave", "comments": "please approve request", 'status': "applied" }
]

function Records(props) {
  var getEmpId = JSON.parse(sessionStorage.getItem("lstLeaveDetails"));
  console.log(getEmpId.empId)
  const navigate = useNavigate();
  const location = useLocation();
  const [empName, setEmpName] = useState();
  const [empId, setempId] = useState(getEmpId.empId);
  const [fromDate, setFromDate] = useState();
  const [startDate, setstartDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectValues, setselectValues] = useState();
  const [SearchObj, setSearchObj] = useState({ "empId": '', "startDate": '', "endDate": '' })
  const [type, setType] = useState();
  let [responseData, setResponseData] = React.useState([]);
  let [showTable, setShowTable] = useState(true)
  const [list, setList] = useState([]);
  //const [tableDatas, settableDatas] = useState([{"empId":"","empName":"","startDate":"", "endDate":"","leaveType":"","comments":""}]);
  const [tableDatas, settableDatas] = useState(location.state.response.lstLeaveDetails);
  let userDetails = location.state

  useEffect(() => {
    var pageView = sessionStorage.getItem("type");
    var tabledataApprovar = JSON.parse(sessionStorage.getItem("lstLeaveDetails"));
    console.log("records===" + tabledataApprovar);

    if (tabledataApprovar && tabledataApprovar.lstLeaveDetails && tabledataApprovar.lstLeaveDetails.length > 0) {
      if (pageView == "Approver") {
        settableDatas((tabledataApprovar.lstLeaveDetails))
        setShowTable(true)
      }
      else {
        setShowTable(false)
      }
    }
    if (pageView) {
      setType(pageView)
    }
  }, []);



  let showbtn = null
  type === "employee" ? showbtn = true : showbtn = false;

  const handleChangeFrom = (date) => {
    setFromDate(date)
    var date1 = moment(date).format('DD-MM-YYYY');
    console.log("data1..." + date1)
    setSearchObj({
      ...SearchObj,
      startDate: date1
    });
  }
  const handleChangeTo = (date) => {
    setToDate(date)
    var date1 = moment(date).format('DD-MM-YYYY');
    console.log("data1..." + date1)
    setSearchObj({
      ...SearchObj,
      endDate: date1
    });
  }
  const setValues = (selectValues) => {
    alert(selectValues)
    setselectValues(selectValues);
  }

  const handleIdChange = (event) => {
    console.log(event)
    setSearchObj({
      ...SearchObj,
      empId: event.target.value
    });
  }

  const handleSubmit = (event) => {
    navigate("/dashboard");
  }
  const backToLogin = (event) => {
    navigate("/");
  }

  const onchangeComment = (event) => {
    event.preventDefault();

  }

  const searchhandler = (event) => {
    console.log("kjbskb==", JSON.stringify(SearchObj))
    const fetchData = async () => {
      const data = await fetch(getleaveRecords)
      const response = await data.json()
      if (!response) {
        throw new Error('Data coud not be fetched!')
      } else {
        return response.json()
        //setResponseData(response.data)
      }
    }

  }

  const fetchData = (e) => {
    e.preventDefault()
    if ((!fromDate || !toDate)) {
      confirmAlert({
        message: 'Please select From Date and To Date.',
        buttons: [
          {
            label: 'Ok',
          }]
      })
    } else if (fromDate > toDate) {
      confirmAlert({
        message: 'From Date cannot be greater then To Date!',
        buttons: [
          {
            label: 'Ok',
          }]
      })
    }

    else {
      var tabledataApprovar = JSON.parse(sessionStorage.getItem("lstLeaveDetails"));
      console.log("records===" + JSON.stringify(SearchObj));
      let empType = type === 'Approver' ? 'getApproverLeave' : 'getEmployeeLeave';

      axios({
        method: 'post',
        url: "http://localhost:9000/" + empType,
        headers: {
          'Content-Type': 'application/json'
        },
        data: {
          "empId": empId,
          "startDate": SearchObj.startDate,
          "endDate": SearchObj.endDate
        }
      })
        .then((response) => {
          console.log(response)
          if (response.data) {
            settableDatas(response.data);
            setShowTable(true);
          }
        })
        .catch((error) => {
          console.log(error)
        })

      //   if (tabledataApprovar && tabledataApprovar.lstLeaveDetails && tabledataApprovar.lstLeaveDetails.length > 0) {   
      //     settableDatas((tabledataApprovar.lstLeaveDetails))
      //     setShowTable(true)
      //   }
      //   else {
      //     setShowTable(false)
      //   }     
    }

  }

  const resetData = () => {
    setFromDate()
    setToDate()

  }
  const onSelectLeave = (data) => {
    console.log(data)
    setList(data)
  }
  const approve_reject = () => {
    axios({
      method: 'patch',
      url: "http://localhost:9000/updateEmployeeLeave",
      headers: {
        'Content-Type': 'application/json'
      },
      data: data
    })
      .then((response) => {
        console.log(response)
      })
      .catch((error) => {
        console.log(error)
      })
  }
  const reject = () => {

  }


  return (
    <div className="App">
      <div className="container">

        <h1 className='h1T'><u>Leave Management System</u></h1>
        <h2 className='h2T'>Leave Records</h2>

        <div className='main_container'>

          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "2%" }}>
            {
              type == "employee" ?
                <>
                  <label>  Employee ID  </label>
                  <input
                    disabled
                    name="empId"
                    type="text"
                    id="Id"
                    value={userDetails.response.empId}
                    onChange={(e) => handleIdChange(e)}
                  />
                </>
                : ""
            }
          </div>


          <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1%", marginLeft: type == "Approver" ? "15%" : "" }}>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
              <p style={{ marginRight: "5px" }}>From Date</p>
              <DatePicker
                value={fromDate}
                selected={startDate}
                onChange={handleChangeFrom}
                dateFormat="DD-MM-YYYY"
              />
            </div>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "4%" }}>
              <p style={{ marginRight: "5px" }}>  To Date</p>
              <DatePicker
                value={toDate}
                selected={startDate}
                onChange={handleChangeTo}
                dateFormat="DD-MM-YYYY"
              />
            </div>
          </div>
          <div style={{ marginTop: "2%", marginBottom: "2%" }}>
            {/* <button className='btn_common' onClick={searchhandler}>Search</button> */}
            <button className='btn_common' onClick={(e) => fetchData(e)}>Search</button>
            <button className='btn_common' onClick={resetData}>Reset</button>
          </div>


          {showTable && <TableComponent data={tableDatas} userTypes={type} onSelectLeave={onSelectLeave} />}

          {/* instead of show button add the flag which depends on search result len */}
          {showbtn === false && showTable && <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: "2%" }}>
            {/* <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
              <p>Comment</p>
              < textarea className='richtxt' id="w3review" name="w3review" rows="3" cols="50" onChange={(e) => onchangeComment(e)}></textarea>
            </div> */}

            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "2%" }}>
              <p>Approver's Comment</p>
              < textarea className='richtxtcmt' id="w3review" name="w3review" rows="3" cols="50"></textarea>
            </div>

          </div>
          }
          <div style={{ marginTop: "2%" }}>
            {showbtn === true && showTable && <button className='btn_commonbtm' onClick={handleSubmit}>Apply Leave</button>}
            {/* {showbtn === false && <button className='btn_commonbtm' onClick={handleApproveRej}>Approve/Reject</button>} */}
            {showbtn === false && tableDatas.length > 0 && < button className='btn_common' onClick={approve_reject}>Approve</button>}
            {showbtn === false && tableDatas.length > 0 && <button className='btn_common' onClick={approve_reject}>Reject</button>}
            <button className='btn_common' onClick={backToLogin}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
// }
export default Records;