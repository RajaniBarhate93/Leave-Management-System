import React from 'react';
import { Link } from 'react-router-dom';

export default function Login() {
  return(
    <form style={{marginLeft: "50px"}}>
      <label>
        <p>Username</p>
        <input type="text" />
      </label>
      <label>
        <p>Password</p>
        <input type="password" />
      </label>
      <div className=''>
        <button type="submit">Submit</button>
        <span><Link to="/dashboard" >Login</Link></span>
      </div>
    </form>
  )
}