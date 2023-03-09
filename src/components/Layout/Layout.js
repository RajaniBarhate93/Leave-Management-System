import React from 'react'
import Login from '../../pages/Login/Login'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
import layoutstyle from "./Layout.css";

export default function Layout() {
  return (
    <div className={layoutstyle.layout}>
  
    <Login/> 
 
    </div>
  )
}
