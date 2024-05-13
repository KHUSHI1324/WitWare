import { Divider } from '@mui/material'
import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { LoginContext } from './context/ContextProvider';
import {loadStripe} from '@stripe/stripe-js';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
function Cart({MakePayment}) {

  const {id}=useParams('');
  // console.log(id);

  const navigate = useNavigate('');

  const {account,setAccount} = useContext(LoginContext)

const [indData,setIndData]=useState('');
console.log(indData);

  // call fetch method(indivi. data)
  const getIndData = async()=>{
    const res = await fetch(`http://localhost:8000/getproductsone/${id}`,{
      method:'GET',
      headers:{
        'Content-Type':'application/json'
      }
    });

    const data = await res.json();
    // console.log(data);

    if(res.status !== 200){
      console.log('No data available');
    }else{
      console.log('getdata');
      setIndData(data);
    }
  }

//it will render after one time page load 
  useEffect(()=>{
    setTimeout(getIndData,1000)
  },[id])

  // add cart function
const addToCart = async(id)=>{
  let token = localStorage.getItem('e-comToken')
  console.log(id);
  const checkres = await fetch(`http://localhost:8000/addcart/${id}`,{
    
    method:'POST',
    headers:{
      Accept:'application/json',
      'Content-Type': 'application/json',
      'Authorization' : token
    },
    body:JSON.stringify({
      indData
    }),
   
    // withCredentials: true,
    // Credentials: 'include'
  });

  const data1 = await checkres.json();
  console.log(data1 + 'frontend data');

  if(checkres.status === 401 || !data1){
    console.log("user invalid f");
    
  }else{
    
    setAccount(data1)
  navigate('/buynow');
  }
}

// add payment method
// const MakePayment = async()=>{
//   const stripe= await loadStripe('pk_test_51P5nQrSE06XCOnqkq5JGYJAaFkJ64vD34X7V2wAbpWSWfSGUuI9N1VOuvJhVIkyyN5WsDprKMYA0LO8Mi6pLyIvr00Ov2oBFjd');
// const body={
//   // products:carts
// }
// }
  return (
    <div className='cart-sec'>
      {/* one time page will load then, indData will render; so, for that load and render
      indData == indData ke ander jo bhi keys ki value/ length hogi to content show krega  */}
      {indData && Object.keys(indData).length && 
      <div className="cart-container">
        <div className="left-cart">
        <img src={indData.url} alt='cart_img'/>
        <div className="cart-btn">
            <button className='cart-btn1' onClick={()=>addToCart(indData.id)}>Add to cart</button>
            <button className='cart-btn2' onClick={MakePayment} >Buy now</button>
        </div>
        </div>
        <div className="right-cart">
       <h3>{indData.title.shortTitle}</h3>
       <h4>{indData.title.longTitle}</h4>
       <Divider/>
       <p className="mrp">M.R.P. : {indData.price.mrp}</p>
       <p>Deal of the day : <span style={{color:'#B12704'}}>{indData.price.cost}.00</span></p>
        <p>You save :  : <span style={{color:'#B12704'}}>{indData.price.mrp - indData.price.cost} ({indData.price.discount})</span></p>
       <div className="discount-box">
        <h5>Discount : <span style={{color:'#111'}}>{indData.discount}</span></h5>
         <h4>Free Delivery : <span style={{color:'#111',fontWeight:600}}>Oct 8 - 21 </span>Details</h4>
       <p>Fastest delivery: <span style={{color:'#111',fontWeight:600}}>Tomorrow 11AM</span></p>
       <p className="desc">About the item : <span style={{color:'#565959',fontSize:14,fontWeight:500,letterSpacing:'0.4px'}}>{indData.description}</span></p>
       </div>
        </div>
      </div>
}

{!indData ?  <div className='circle'>
  <CircularProgress/>
  <h2>Loading....</h2>
        </div> : ''}
    </div>
  )
}

export default Cart
