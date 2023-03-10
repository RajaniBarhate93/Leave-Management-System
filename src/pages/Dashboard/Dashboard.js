import React from 'react';
import "./Dashboard.css"
import DatePicker from 'react-date-picker';
import Select from "react-dropdown-select";
const options1 = ['Privilege Leave', 'Casual Leave ', 'Sick Leave', 'Maternity Leave', 'Paternity Leave.'];
const options = [{ id: 1, name: "Privilege Leave" }, { id: 2, name: "Casual Leave " },
{ id: 3, name: "Sick Leave" }, { id: 4, name: "Maternity Leave" },
{ id: 5, name: "Paternity Leave" }];


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empName: "",
      empId: "",
      fromDate: "",
      toDate: "",
      selectValues: "",
      startDate: new Date()
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

  handleInputChange=(event)=> {
    console.log("data..."+event.target.value)
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

  render() {
    return (
      <div className="App">
        <div className="container">

          <h1 className='h1T'><u>Leave Management System</u></h1>
          <h2 className='h2T'>Leave Application Screen</h2>

          <div className='main_container'>
            <div style={{ display: "flex", flexDirection: "row",alignItems: "center", marginLeft:"2%" }}>
            <label>  Employee ID  </label>
              <input
                name="id"
                type="text"
                value={this.state.empId}
                onChange={this.handleInputChange}
              />
           </div>
           <div style={{ display: "flex", flexDirection: "row",alignItems: "center",    marginTop:  "2%" }}>
            <label>  Employee Name  </label>
              <input
                name="name"
                type="text"
                value={this.state.empName}
                onChange={this.handleInputChange}
              />   </div>
           
        
           <div style={{ display: "flex", flexDirection: "row",alignItems: "center",marginTop:"1%" }}>  
           <div style={{ display: "flex", flexDirection: "row",alignItems: "center"  }}>      
              <p style={{marginRight:"5px"}}>From Date</p>                      
                <DatePicker
                  value={this.state.fromDate}
                  selected={this.state.startDate}
                  onChange={this.handleChangeFrom}
                  format="y-MM-dd"
                />
       </div>
       <div style={{ display: "flex", flexDirection: "row",alignItems: "center",marginLeft:"4%" }}>   
              <p style={{marginRight:"5px"}}>  To Date</p>            
               <DatePicker
                  value={this.state.toDate}
                  selected={this.state.startDate}
                  onChange={this.handleChangeTo}
                  format="y-MM-dd"
                  
                />
                </div>
        </div>
            
             <div style={{ display: "flex", flexDirection: "row",alignItems: "center",marginTop:"1%" }}>   
              <p style={{marginRight:"5px"}}>Leave Type</p>
              <Select
                multi={false}
                options={options}
                labelField="name"
                valueField="id"
                closeOnSelect={true}
                clearable={true}
                Keep selected item in a list={false}
                onChange={(values) => this.setValues(values)}
              />       </div>   

<div style={{ display: "flex", flexDirection: "row",alignItems: "center",marginTop:"2%" }}>   
              <p >Comment</p>
             < textarea className='richtxt' id="w3review" name="w3review" rows="3" cols="50"></textarea>      
              </div>   
      
               <div style={{marginTop:"2%"}}>
        <button className='btn_common' >Apply</button>
        <button className='btn_common' >Cancel</button>
     </div>
        </div>
      </div>
      </div>
    );
  }
}
export default Dashboard;