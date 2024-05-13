import './App.css';
import Header from './component/Header';
import Navbar from './component/Navbar';
import MainComp from './component/home/MainComp';
import Footer from './component/Footer';
import Sign_in from './component/login/Sign_in'
import Sign_up from './component/login/Sign_up'
import Cart from './component/Cart';
import {Routes,Route} from 'react-router-dom'
import BuyNow from './component/BuyNow/BuyNow';
import { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Succes from './component/BuyNow/Succes';
import Cancel from './component/BuyNow/Cancel';
import Track from './component/BuyNow/Track';
import View from './component/View';
function App() {

  const [data,setData] = useState(false);

  useEffect(()=>{
    setTimeout(()=>{
      setData(true)
    },2000)
  },[])

  return (
    <>
      {data ? (
        <div className='App'>
 <Header/>
 {/* <Navbar/> */}
 <Routes>
 <Route path='/' element={<MainComp/>}/>
 <Route path='/login' element={<Sign_in/>}/>
 <Route path='/register' element={<Sign_up/>}/>
 <Route path='/getproductsone/:id' element={<Cart/>}/>
 <Route path='/buynow' element={<BuyNow/>}/>
 <Route path='/success' element={<Succes/>}/>
 <Route path='/cancel' element={<Cancel/>}/>
 <Route path='/track' element={<Track/>}/>
 <Route path='/view' element={<View/>}/>
 </Routes>
 <Footer/>
 </div>
      ):(
        <div className='circle'>
  <CircularProgress/>
  <h2>Loading....</h2>
        </div>
      )
    }
    </>
  );
}


export default App;



// // reducer-->it's just like a action item,what we want

// // props-->transfere the data from one compon. to other.
// //      it is use in simple use(1,2 data transf.)
// // redux-->create general store nd store all data in that ;when user want any data then,redux call a reducer function and that data will get from the store.
// //      it is use in complex use(flipkart,multiple data,etc)
// // centralized database of frontend

// // json web token(jwt)
// //     token type
// //     payload value
// //     secreat key
// // if we click on cart then,token and cookies are equal/authen;then, user will go in cart



