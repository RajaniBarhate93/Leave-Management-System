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
  const navigate = useNavigate();
  const location = useLocation();
  const [empName, setEmpName] = useState();
  const [empId, setempId] = useState();
  const [fromDate, setFromDate] = useState();
  const [startDate, setstartDate] = useState();
  const [toDate, setToDate] = useState();
  const [selectValues, setselectValues] = useState();
  const [SearchObj, setSearchObj] = useState({ "empId": '', "startDate": '', "endDate": '' })
  const [type, setType] = useState();
  let [responseData, setResponseData] = React.useState([]);
  let [showTable, setShowTable] = useState(true)
  //const [tableDatas, settableDatas] = useState([{"empId":"","empName":"","startDate":"", "endDate":"","leaveType":"","comments":""}]);
  const [tableDatas, settableDatas] = useState(location.state.response.lstLeaveDetails);
  let userDetails = location.state
  useEffect(() => {
    var pageView = sessionStorage.getItem("type");
    console.log("record useeffect[]" + pageView);
   // console.log(userDetails)
    if (userDetails && userDetails.response && userDetails.response.lstLeaveDetails.length > 0) {
      if (pageView == "Approver") {
        settableDatas((userDetails.response.lstLeaveDetails))
        console.log(userDetails.response.lstLeaveDetails)
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

  // useEffect(() => {
  //   settableDatas([...tableData]);
  //   const timer = setTimeout(() => {
  //     settableDatas([...tableData]);
  //   }, 1000);
  //   return () => clearTimeout(timer);
  // }, [])

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
    //   setApplyObj({
    //    ...ApplObj,
    //    comments: event.target.value
    //  });    
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
    console.log("dfvdf")
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
      if (userDetails && userDetails.response && userDetails.response.lstLeaveDetails.length > 0) {
        settableDatas(userDetails.response.lstLeaveDetails)
        setShowTable(true)

      }
      else {
        setShowTable(false)
      }

      // if (tableDatas.length) {
      //   setShowTable(true)
      // }
      // axios({
      //   "method": "GET",
      //   "url": "http://localhost:9000/getLeave",
      //   "headers": {
      //     "content-type": "application/octet-stream",
      //     "x-rapidapi-host": "quotes15.p.rapidapi.com",
      //     "x-rapidapi-key": process.env.REACT_APP_API_KEY
      //   }, "params": {
      //     SearchObj: SearchObj
      //   }
      // })
      //   .then((response) => {
      //     setResponseData(response.data)
      //     if (response.data.length) {
      //       alert(true)
      //       setShowTable(true)
      //     }
      //   })
      //   .catch((error) => {
      //     console.log(error)
      //   })
    }
  }
  const resetData = () => {
    // settableDatas([])
    // setShowTable(false)
    setFromDate()
    setToDate()

  }
  // React.useEffect(() => {
  //   fetchData()
  // }, [])


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
          {/* render conditionally */}
          

          {showTable && <TableComponent data={tableDatas} userTypes={type} />}


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
            {showbtn === false && tableDatas.length > 0 && < button className='btn_common' >Approve</button>}
            {showbtn === false && tableDatas.length > 0 && <button className='btn_common'  >Reject</button>}
            <button className='btn_common' onClick={backToLogin}>Back</button>
          </div>
        </div>
      </div>
    </div>
  );
}
// }
export default Records;