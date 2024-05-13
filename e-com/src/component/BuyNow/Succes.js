import React from 'react'
import success from './success.webp'
import { NavLink } from 'react-router-dom'
export default function Succes() {
  return (
    <div className='success'>
      <img src={success} alt=''/>
      <p>Thankyou for your order</p>
      <NavLink className='success-btn1' to='/track'>Track your order</NavLink><br></br><br/>
      <NavLink className='success-btn' to='/'>View more Products</NavLink>
    </div>
  )
}
