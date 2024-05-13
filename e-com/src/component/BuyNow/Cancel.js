import React from 'react'
import cancel from './cancel.webp'
import { NavLink } from 'react-router-dom'
export default function Cancel() {
  return (
    <div className='cancel'>
      <img src={cancel}/>
      <p>Your Payment is failed</p>
      <NavLink className='p-btn' to="/buynow">Place Your Order Again</NavLink>
       
    </div>
  )
}
