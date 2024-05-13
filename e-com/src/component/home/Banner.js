import React from 'react'
import Carousel from 'react-material-ui-carousel'
import './home.css'
const bannerData=[
    {  url: 'https://rukminim1.flixcart.com/flap/3376/560/image/d117a62eb5fbb8e1.jpg?q=50' },
    {  url: 'https://rukminim1.flixcart.com/flap/3376/560/image/57267a180af306fe.jpg?q=50' },
    {  url: 'https://rukminim1.flixcart.com/flap/3376/560/image/ae9966569097a8b7.jpg?q=50' },
    {  url: 'https://rukminim1.flixcart.com/flap/3376/560/image/f6202f13b6f89b03.jpg?q=50' },
    {url: "https://rukminim1.flixcart.com/flap/1680/280/image/1defb861e409319b.jpg?q=50"},
   {url: " https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"},
    {url:"https://rukminim1.flixcart.com/flap/1680/280/image/8d4150cc4f3f967d.jpg?q=50"},
    {url:"https://rukminim1.flixcart.com/flap/1680/280/image/685712c6cefb3c02.jpg?q=50"}
]

function Banner() {
  return (
   <Carousel className='carousel' 
   autoPlay={true} 
   animation='slide' 
   indicators={false} 
   navButtonsAlwaysVisible={true} 
   cycleNavigation={true} 
   navButtonsProps={{
    style:{
        backgroundColor:'#fff',
        color:'#494949',
        // borderRadius:0,
        marginTop:-22,
        height:'65px'
    }
   }}>
     {
        bannerData.map((data)=>{
            return(
                <>
                <img src={data.url} alt='banner' className='banner-img'/>
                </>
            )
        })
     }
   </Carousel>
     
  )
}

export default Banner
