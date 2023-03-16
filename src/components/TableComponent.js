import React, { useState } from 'react';
import { json } from 'react-router-dom';
import "./table.css"

function TableComponent(props) {

  const [tableData, setTableData] = useState(props.data);



  // handleChange = (event) => {
  //   alert("abc",event)
  //   console.log(event)
  // const selectedCheckboxes = this.state.selectedCheckboxes;

  // Find index
  // const findIdx = selectedCheckboxes.indexOf(id);

  // Index > -1 means that the item exists and that the checkbox is checked
  // and in that case we want to remove it from the array and uncheck it
  // if (findIdx > -1) {
  //   selectedCheckboxes.splice(findIdx, 1);
  // } else {
  //   selectedCheckboxes.push(id);
  // }

  // this.setState({
  //   selectedCheckboxes: selectedCheckboxes
  // });
  // };
  // render() {
  //   const { selectedCheckboxes } = this.state;
  //   var dataColumns = this.props.data.columns;
  //   var dataRows = this.props.data.rows;

  //   var tableHeaders = (
  //     <thead>
  //       <tr>
  //         {" "}
  //         {dataColumns.map(function (column) {
  //           return <th> {column} </th>;
  //         })}{" "}
  //       </tr>{" "}
  //     </thead>
  //   );

  //   var tableBody = dataRows.map((row) => {
  //     return (
  //       <tr key={row.id}>
  //         {dataColumns.map(function (column) {

  //           console.log(JSON.stringify(dataRows))
  //           if (column == "Leave Type")
  //             return (
  //               <td>
  //                 <input
  //                type="checkbox"
  //                onChange={() => {
  //                 alert(row.id)
  //                 selectedCheckboxes.push(row.id);
  //                 console.log(selectedCheckboxes)

  //                }}
  //             // onChange={() => this.onChange(row.id)}
  //             // selected={selectedCheckboxes.includes(row.id)}
  //           />
  //             <label key={row.id}>{row.LeaveType}</label>
  //               </td>
  //             );
  //             if (column == "Action")
  //             return (
  //             <div >
  //             <button  className='btn'  >Edit</button>
  //           <button  className='btn' >Cancel</button>
  //           </div>  
  //             )


  //           else
  //             return (
  //               <td>
  //                 <a target="_blank" rel="noopener noreferrer" href={row.url}>
  //                   {row[column]}

  //                 </a>  

  //               </td>

  //             );
  //         })}
  //       </tr>
  //     );
  //   });

  //   // Decorate with Bootstrap CSS
  //   return (
  //     <div>
  //       <table className="table table-bordered table-hover" width="100%">
  //         {tableHeaders}
  //          {tableBody}

  //       </table>

  //     </div>
  //   );
  // }



  return (
    <div>
      <table> 
        <thead>          
           <tr> 
            <th style={{width:"40px"}}></th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            <th>Action</th>
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
                       <td> 
                        <div>                       
                          <button  className='btn'  >Edit</button>
                         <button  className='btn' >Cancel</button>
                         </div>
                         </td>
                      </tr>
                      ))}
                       </tbody>
                       </table>
                        </div>                      

  )
}

export default TableComponent;