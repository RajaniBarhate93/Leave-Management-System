import React, { useState } from 'react';
import { json } from 'react-router-dom';
import "./table.css"
import EditLeaveComponent from './EditLeave'
import Modal from 'react-modal';
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css'

function TableComponent(props) {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [tableData, setTableData] = useState(props.data);
  const [editData, setEditData] = useState('');

  console.log("myte=" + JSON.stringify(tableData))
  let showbtn
  props.userTypes === "employee" ? showbtn = true : showbtn = false
  const submit = (e) => {
    console.log(e)
    confirmAlert({
      title: 'Confirm to submit',
      message: 'Are you sure want to delete this leave.',
      buttons: [
        {
          label: 'Yes',

        },
        {
          label: 'No',

        }
      ]
    })
  };
  const showModal = () => {
    setModalIsOpen(true)
  };

  const hideModal = () => {
    setModalIsOpen(false)
  };
  const action = (e) => {
    console.log(e)
    setEditData(e)
    showModal()
  }
  return (
    <div>
      <table>
        <thead>
          <tr>
            <th style={{ width: "40px" }}></th>
            <th>Leave Type</th>
            <th>From</th>
            <th>To</th>
            {showbtn && <th>Action</th>}
            {/* <th>Action</th> */}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data) => (
            <tr key={data.empId}>
              <td>
                <input type="checkbox"
                  checked={data.selected}
                  onChange={() => {
                    const newData = [...tableData];
                    const index = newData.findIndex((item) => item.empId === data.empId);
                    newData[index].selected = !newData[index].selected;
                    setTableData(newData);
                    console.log("newData==" + JSON.stringify(newData))
                    var result = newData.find(function (e) {
                      return e.selected == true;
                    });

                    console.log(result)
                    sessionStorage.setItem('selectedRow', JSON.stringify(result));
                    var obj = sessionStorage.getItem('selectedRow');
                    console.log("object===" + obj);

                  }}
                />
                <label> </label>
              </td>
              <td>{data.leaveType}</td>
              <td>{data.startDate}</td>
              <td>{data.endDate}</td>

              {showbtn &&
                <td>
                  <div>
                    <button className='btn' onClick={() => action(data)}>Edit</button>
                    <button className='btn' onClick={() => submit(data)}>Cancel</button>
                  </div>
                </td>}

            </tr>
          ))}
        </tbody>
      </table>
      {
        modalIsOpen ?
          <EditLeaveComponent editData={editData} hideModal={hideModal} modalIsOpen={modalIsOpen} />
          : ""
      }
    </div>

  )
}

export default TableComponent;