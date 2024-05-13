import React, { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import './login.css'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Sign_in = () => {

    const history=useNavigate();

    const [udata,setUdata]=useState({
        fname:'',
        email:'',
        mobile:'',
        password:'',
        cpassword:''
    });
    console.log(udata);

    const addData=(e)=>{
        const {name,value}=e.target;
       
        setUdata(()=>{
            return{
                ...udata,
              [name]:value  
            }
        })
    };

    const sendData = async(e)=>{
        e.preventDefault();
    
    const {fname,email,mobile,password,cpassword} =udata;
 
    //  if(fname ===''){
    //     toast.warn('Enter valid username',{
    //         position:'top-center'
    //     })  
    //  }else if(email === ''){
    //     toast.warn('Enter valid email',{
    //         position:'top-center'
    //     })
    //  }else{
        
    //  }
        const res = await fetch('http://localhost:8000/register',{
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                fname,email,mobile,password,cpassword
            })
        });
       
        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            toast.warn(' Invalid data',{
                position:'top-center'
            })
        }else{
            console.log("data valid");
            toast.success('data succesfully added',{
                position:'top-center',
            })
            
            setUdata({...udata,
                fname:'',
                email:'',
                mobile:'',
                password:'',
                cpassword:''
            });
            // history('/');
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
                    <h2>Sign-Up</h2>
                    <div className="form-data">
                        <label htmlFor='fname'>Your name</label>
                        <input type='text' name='fname' id='fname' onChange={addData} value={udata.fname}/>
                    </div>
                    <div className="form-data">
                        <label htmlFor='email'>Email</label>
                        <input type='text' name='email' id='email' onChange={addData} value={udata.email}/>
                    </div>
                    <div className="form-data">
                        <label htmlFor='number'>Mobile</label>
                        <input type='number' name='mobile' id='mobile' onChange={addData} value={udata.mobile}/>
                    </div>
                    <div className="form-data">
                        <label htmlFor='password'>Password</label>
                        <input type='password' name='password' placeholder='At least 6 char' id='password' onChange={addData} value={udata.password}/>
                    </div>
                    <div className="form-data">
                        <label htmlFor='password'>Password Again</label>
                        <input type='password' name='cpassword' placeholder='At least 6 char' id='cpassword' onChange={addData} value={udata.cpassword}/>
                    </div>
                    <button  className='signin-btn' type='submit' onClick={sendData}>Continue</button>
               <div className="signin-info">
                <p>Already have an account?</p>
                <NavLink to='/login'>Sign_in</NavLink>
               </div>
                </form>
            </div>
            <ToastContainer/>
        </div>
      </section>
    </>
  )
}

export default Sign_in
