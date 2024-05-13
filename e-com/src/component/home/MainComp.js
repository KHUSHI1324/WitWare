import React, { useEffect } from 'react'
import Banner from './Banner'
import Slide from './Slide'
import Navbar from '../Navbar'
import { getProducts,getProducts2 } from '../redux/actions/Action';
import {useDispatch,useSelector } from 'react-redux';
import './home.css'

function MainComp() {

const {products}= useSelector(state=>state.getproductsdata);
console.log(products);
const {products2}= useSelector(state=>state.getproductsdata2);
console.log(products2);

const dispatch = useDispatch();

useEffect(()=>{
  dispatch(getProducts());
  dispatch(getProducts2());
},[dispatch]);

  return (
    <div className='main'>
      <Navbar/>
    <div className='home-sec'>
      <div className='banner-part'>
       <Banner/>
      </div>
      <div className='slide-part'>
        <div className="left-slide">
        <Slide title='Deal of the day' products={products}/>
        </div>
        <div className="right-slide">
            <h4>Festival latest launches</h4>
            <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />  
     
            {/* <img src= 'https://www.google.com/url?sa=i&url=https%3A%2F%2Fin.pinterest.com%2Fpin%2F758715868474455531%2F&psig=AOvVaw3pILLq360bFj6dLCe5fSpn&ust=1710766721460000&source=images&cd=vfe&opi=89978449&ved=0CBMQjRxqFwoTCLih4_Cs-4QDFQAAAAAdAAAAABAY' */}
 {/* alt='' /> */}
              <a href="#">see more</a>
        </div>
      </div>
      <Slide title="Today's Deal" products={products}/>
      <div className='center-img'>
      <img src="https://m.media-amazon.com/images/G/31/AMS/IN/970X250-_desktop_banner.jpg" alt="" />  </div>
      <Slide title='Best Seller' products={products}/>
      <Slide title='Upto 80% off' products={products}/>
    </div>
    </div>
  )
}

export default MainComp
