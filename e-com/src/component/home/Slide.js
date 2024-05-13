import React from 'react'
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {Divider} from '@mui/material';
// import {products} from './Products';
import View from '../View';
import './home.css'
import { NavLink } from 'react-router-dom';
// import navigate from 'navigate';
const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
       },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      }
  };

  
// const opendata = (e)=>{
//   navigate('/getProductsone',{state:e.id})
// }

const Slide=({title,products})=> {

  const open = (products,title) => {
    console.log(products);
    console.log(title);
    // Render the View component with the clicked product data
    // return <View products={products} />;
    
  };
  // const productsArray = Array.from(Object.values(products));
  // const productsArray2 = Array.from(Object.values(products2));
  return (
    <div className='products-sec'>
      <div className="products-deal">
        <h3>{title}</h3>
       {/* <NavLink to='view'  onClick={() => open(products)} className='view-btn'>View all</NavLink> */}
      </div>
      <Divider/>

      <Carousel responsive={responsive}
      infinite={true}
      draggable={false}
      swipeable={true}
      showDots={false}
      centerMode={true}
      autoPlay={true}
      autoPlaySpeed={4000}
      keyBoardControl={true}
      removeArrowOnDeviceType={['tablet','mobile']}
      dotListClass='custom-dot-list-style'
      itemAriaLabel='carousel-item-padding-40-px'
      containerClass='carousel-container'>
   {
    products.map((e)=>{
        return(
          // send product 'id' to cart page 
          <NavLink to={`/getProductsone/${e.id}`} >
            <div className='products-items'
            // onClick={opendata}
            >
              
               <div className='products-img'> 
                <img src={e.url} alt='productitem'/>
               </div>
               <p className='products-name'>{e.title.shortTitle}</p>
               <p className='products-offer'>{e.discount}</p>
               <p className='products-explore'>{e.tagline}</p>
            </div>
            </NavLink>
        )
    })
   }
      </Carousel>
    </div>
  )
}

export default Slide
