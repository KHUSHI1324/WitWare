import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './login.css'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { LoginContext } from '../context/ContextProvider';
const Sign_in = () => {
    
    const history = useNavigate();

    const [logdata,setData]=useState({
        email:'',
        password:''
    });
    console.log(logdata);

    const {account,setAccount} = useContext(LoginContext);
    

    const addData=(e)=>{
const{name,value}=e.target;

setData(()=>{
    return{
        ...logdata,
        [name]:value
    }
   })
};

const sendData = async(event)=>{
    event.preventDefault();
    
    const {email,password}=logdata;

    const res = await fetch('http://localhost:8000/login',{
        method:'POST',
        headers:{
            'Content-Type': "application/json"
        },
        body:JSON.stringify({
            email,password
        })
    });

    const data = await res.json();
    console.log(data);
    
    
    if(res.status === 400 || !data){
        console.log("Invalid details");
        toast.warn("Invalid details",{
            position: "top-center",
        })
    }else{
        console.log("data valid");
        setAccount(data);
        history('/');
        toast.success('user valid',{
            position:'top-center',
        })
        localStorage.setItem('e-comToken',data.result.token)
    
        setData({...logdata,
                   email:"",
                   password:""
                });
    }
   
}

  return (
    <>
      <section>
        <div className="sign-container">
            <div className="sign-header">
                <h1>WitWare</h1>
            </div>
            <div className="sign-form">
                <form method='POST'>
                    <h2>Sign-In</h2>
                    <div className="form-data">
                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' id='email' onChange={addData} value={logdata.email}/>
                    </div>
                    <div className="form-data">
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' placeholder='At least 6 char' id='password' onChange={addData} value={logdata.password}/>
                    </div>
                    <button className='signin-btn' type='submit' onClick={sendData}>Continue</button>
     </form>
            </div>
            <div className="create-accountinfo">
                <p>New To WitWare?</p>
                <NavLink to='/register'>
                  <button>Create Your witware account</button>
              </NavLink>  
          </div>
          <ToastContainer/>
        </div>
      </section>
    </>
  )
}

export default Sign_in
