import React,{useState,useEffect} from 'react'
import {loadStripe} from '@stripe/stripe-js';
const Right = ({item}) => {

  const [price,setPrice]=useState(0);
  useEffect(()=>{
    totalAmount();
  },[item])
  
  const totalAmount = ()=>{
    let price = 0;
    item.map((item)=>{
      price += item.price.cost
      // price = item.price.cost +price
    });
    setPrice(price)
  }
// payment integration
const MakePayment = async()=>{
  const stripe= await loadStripe('pk_test_51P5nQrSE06XCOnqkq5JGYJAaFkJ64vD34X7V2wAbpWSWfSGUuI9N1VOuvJhVIkyyN5WsDprKMYA0LO8Mi6pLyIvr00Ov2oBFjd');
const body={
  products:item
}
const headers ={
  'Content-Type':'application/json'
}
const response = await fetch('http://localhost:8000/payment',{
  method:'POST',
  headers:headers,
  body:JSON.stringify(body)
});
const session = await response.json();

const result = stripe.redirectToCheckout({
  sessionId:session.id
});
if(result.error){
  console.log(result.error);
}
}
  return (
    <div className='right-buy'>
      
      <h2>WitWare</h2>{/* <img src="https://images-eu.ssl-images-amazon.com/images/G/31/checkout/assets/TM_desktop.CB443006202.png" alt="rightimg" /> */}
      <div className="const-right">
        <p>Your order is eligible for FREE Delivery.<br/>
       <span style={{color:'#565959'}}>Select this option at checkout.  Details</span></p>
      <h3>Subtotal({item.length} items): <span style={{fontWeight:700}}>{price}.00</span></h3>
      <button className='rightbuy-btn'type='button' onClick={MakePayment} >Process to buy</button>
      <div className="emi">Emi available</div>
      </div>
    </div>
  )
}

export default Right
