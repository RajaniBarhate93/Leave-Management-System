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
            <tr key={data.id}>
              <td>
                <input type="checkbox"
                  checked={data.selected}
                  onChange={() => {
                    const newData = [...tableData];
                    const index = newData.findIndex((item) => item.id === data.id);
                    newData[index].selected = !newData[index].selected;
                    setTableData(newData);
                    console.log("newData==" + JSON.stringify(newData))

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