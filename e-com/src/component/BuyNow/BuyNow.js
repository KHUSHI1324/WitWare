import { Divider } from '@mui/material'
import React, { useEffect, useState } from 'react'
import './BuyNow.css'
import Option from './Option'
import SubTotal from './SubTotal'
import Right from './Right'
import Empty from './Empty'


const BuyNow = () => {

  const [cartdata,setcartdata]= useState('');
  console.log(cartdata);

  let token = localStorage.getItem('e-comToken')
  
  const getdatabuy = async()=>{
    const res = await fetch('http://localhost:8000/cartdetails',{
    method:'GET',
    headers:{
      'Content-Type': 'application/json',
      'Authorization' : token
    },
    // credentials:'include'
  });

  const data = await res.json();
  if(res.status == 400 || !data){
    console.log('error');
  }else{
   setcartdata(data.carts); 
  }

  }
useEffect(()=>{
  getdatabuy();
},[]);
  return (
    <>
      {
      cartdata.length ? <div className='buynow-sec'>
      <div className="buynow-container">
        <div className="left-buy">
            <h1>Shopping Cart</h1>
            <p>Select all items</p>
            <span className='leftbuyprice'>Price</span>
             <Divider/>
             {
              cartdata.map((e,k)=>{
                return(
                  <>
                  <div className="item-container">
                <img src={e.url} alt=''/>
                <div className="item-details">
                <h3>{e.title.longTitle}</h3>
                <h3>{e.title.shortTitle}</h3>
                <h3 className='differentprice'>4049.00</h3>
                <p className='unussall'> Usually dispatch in 8 days.</p>
                <p>Eligible for FREE Shipping</p>
                {/* <img src="https://m.media-amazon.com/images/G/31/marketing/fba/fba-badge_18px-2x.CB485942108.png" alt="logo" /> */}
             <Option deletedata={e.id} get={getdatabuy}/>
                </div>
                <h3 className='item-price'> {e.price.cost}.00</h3>
             </div>
             <Divider/>
                  </>
                )
              })
             }
             
            
             <SubTotal item={cartdata}/>
               </div>
        <Right item={cartdata}/>
      </div>
    </div> :<Empty/>
    }
    </>
  
   
  )
}

export default BuyNow
