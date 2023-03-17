import React, { useState } from 'react';
import { json } from 'react-router-dom';
import "./table.css"

function TableComponent(props) {

  const [tableData, setTableData] = useState(props.data);

let showbtn
 props.userTypes === "employee" ? showbtn=true: showbtn =false

  return (
    <div>
      <table> 
        <thead>          
           <tr> 
            <th style={{width:"40px"}}></th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            {showbtn && <th>Action</th>}
            {/* <th>Action</th> */}
             </tr>
             </thead>
              <tbody>
                {tableData.map((data) => (
                <tr key={data.id}>
                  <td> 
                    <input type="checkbox" 
                    checked={data.selected}
                  onChange={() => {
                     const newData = [...tableData];
                     const index = newData.findIndex((item) => item.id === data.id);
                      newData[index].selected = !newData[index].selected;
                      setTableData(newData);
                      console.log("newData=="+JSON.stringify(newData))
                      
                     }}
                      />
                   <label> </label> 
                      </td> 
                     <td>{data.LeaveType}</td>
                      <td>{data.From}</td>                     
                       <td>{data.To}</td>                    
                      
                       {showbtn && 
                       <td> 
                        <div>                       
                          <button  className='btn'  >Edit</button>
                         <button  className='btn' >Cancel</button>
                         </div>
                         </td>}
                      
                      </tr>
                      ))}
                       </tbody>
                       </table>
                        </div>                      

  )
}

export default TableComponent;