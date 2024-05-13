import React, { useContext } from 'react'
import { LoginContext } from '../context/ContextProvider';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Option = ({deletedata,get}) => {

  const {account,setAccount}= useContext(LoginContext);

const removedata = async(req,res)=>{
  let token = localStorage.getItem('e-comToken')
  try {
    const res = await fetch(`http://localhost:8000/remove/${deletedata}`,{
      method:'DELETE',
      headers:{
        Accept:'application/json',
        'Content-Type': 'application/json',
        'Authorization' : token
      },
      // credentials:'include'
    });
  
    const data = await res.json();
    console.log(data);
  
    if(res.status === 400 || !data){
      console.log('error')
    }else{
      console.log('user delete');
      setAccount(data);
      toast.success('item removed from cart',{
        position:'top-center',
      })
      get();
    }
  } catch (error) {
    console.log('error');
  }
}

  return (
    <div className='add-remove-select' key={deletedata}>
      <select name='' id=''>
        <option value='1'>1</option>
        <option value='2'>2</option> 
        <option value='3'>3</option> 
        <option value='4'>4</option>
      </select>
      <p style={{cursor:'pointer'}} onClick={()=>removedata(deletedata)}>Delete</p><span>|</span>
      <p className='forremovemedeia'>Save Or Later</p><span>|</span>
      <p className='forremovemedeia'>See More like this</p>
   <ToastContainer/>
    </div>
  )
}

export default Option
