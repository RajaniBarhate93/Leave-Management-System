import React from 'react';
import "./Records.css"
import DatePicker from 'react-date-picker';
import Select from "react-dropdown-select";
import TableComponent from '../../components/TableComponent';
const checkList = ["Apple", "Banana", "Tea", "Coffee"];
const options = [{ id: 1, name: "Privilege Leave" }, { id: 2, name: "Casual Leave " },
{ id: 3, name: "Sick Leave" }, { id: 4, name: "Maternity Leave" },
{ id: 5, name: "Paternity Leave" }];

// Example Data
var tableData = [
  
  // columns: ['Leave Type','From', 'To' ,"Action"],
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
     'Action':""
   },{
    id: 3,
     'LeaveType': 'Privilege',
     'From': '10th Feb 2023',
     'To': '10th Feb 2023',
     'Action':""
   }, {
    id: 4,
     'LeaveType': 'Maternity',
     'From': '10th Feb 2023',
     'To': '10th Feb 2023',
     'Action':""
   }
  ]

class Records extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empName: "",
      empId: "",
      fromDate: "",
      toDate: "",
      selectValues: "",
      startDate: new Date(),
      checked:[]
    };

    // this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeFrom = (date) => {
    this.setState({
      fromDate: date
    })
  }
  handleChangeTo = (date) => {
    this.setState({
      toDate: date
    })
  }
 
  setValues = selectValues => this.setState({ selectValues });

  handleInputChange = (event) => {
    console.log("data..." + event.target.value)
    event.preventDefault();
    const target = event.target;
    this.setState({
      [target.name]: target.value,
    });


  }

  handleSubmit(event) {
    // event.preventDefault();
    // Userfront.login({
    //   method: "password",
    //   emailOrUsername: this.state.emailOrUsername,
    //   password: this.state.password,
    // });
  }


  // 

 
  render() {
    return (
      <div className="App">
        <div className="container">

          <h1 className='h1T'><u>Leave Management System</u></h1>
          <h2 className='h2T'>Leave Records</h2>

          <div className='main_container'>
            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "2%" }}>
              <label>  Employee ID  </label>
              <input
                name="id"
                type="text"
                value={this.state.empId}
                onChange={this.handleInputChange}
              />
            </div>


            <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginTop: "1%" }}>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
                <p style={{ marginRight: "5px" }}>From Date</p>
                <DatePicker
                  value={this.state.fromDate}
                  selected={this.state.startDate}
                  onChange={this.handleChangeFrom}
                  format="y-MM-dd"
                />
              </div>
              <div style={{ display: "flex", flexDirection: "row", alignItems: "center", marginLeft: "4%" }}>
                <p style={{ marginRight: "5px" }}>  To Date</p>
                <DatePicker
                  value={this.state.toDate}
                  selected={this.state.startDate}
                  onChange={this.handleChangeTo}
                  format="y-MM-dd"

                />
              </div>
            </div>

         
            <div style={{ marginTop: "2%",marginBottom:"2%"}}>
              <button className='btn_common' >Search</button>
              <button className='btn_common' >Cancel</button>
              <button className='btn_common' >Reset</button>
            </div>        

            <TableComponent data={tableData} />
         
            <div style={{ marginTop: "2%" }}>
              <button className='btn_commonbtm' >Apply Leave</button>
              <button className='btn_commonbtm' >Approve/Reject</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Records;