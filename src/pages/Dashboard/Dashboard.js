import React from 'react';
import "./Dashboard.css"
import DatePicker from 'react-date-picker';
class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      empName: "",
      empId: "",
      fromDate:"",
      toDate:"",
      startDate:new Date()
    };

  this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChangeFrom=(date) =>{  
    this.setState({  
      fromDate: date  
    })  
  }  
  handleChangeTo=(date) =>{  
    this.setState({  
      toDate: date  
    })  
  } 
  handleInputChange(event) {
    // event.preventDefault();
    // const target = event.target;
    // this.setState({
    //   [target.name]: target.value,
    // });
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

      <div className="emp_container">
      <label style={{marginLeft:"5%"}}>
            Employee ID        
            <input
              name="id"
              type="text"
              value={this.state.empId}
              onChange={this.handleInputChange}
            />
            </label>
          <label >
         Employee Name
            <input
              name="name"
              type="text"
              value={this.state.empName}
              onChange={this.handleInputChange}
            />
             </label>
             </div>

<div className="calndr_container">

<p style={{margin:"3px 10px 5px 5px"}}>From Date</p>
<div>
      <DatePicker      
      value={this.state.fromDate} 
      selected={ this.state.startDate }  
      onChange={ this.handleChangeFrom}       
      format="y-MM-dd"
      />   
  </div>
<p style={{margin:"3px 10px 5px 15px"}}>To Date</p>
<div>
      <DatePicker
       value={this.state.toDate} 
       selected={ this.state.startDate } 
       onChange={ this.handleChangeTo} 
       format="y-MM-dd"
       />  
       </div>

</div>



      </div>
      </div>
      );
  }
}
export default Dashboard;