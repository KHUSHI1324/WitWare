import React from 'react'
import { NavLink } from 'react-router-dom'
import empty from './empty cart.png'
function Empty() {
  return (
    <div className='buynow-sec'>
      <div className="buynow-container">
        <div className="empty-buy" >
            <img src={empty} alt=''/>
            <div className="emptydata">
                <h1>Your Basket is empty</h1>
                <p>See recommendation</p>
            </div>
            <NavLink className='empty-btn' to="/">Add your items</NavLink>
        </div>
      </div>
    </div>
  )
}

export default Empty
