import React, { useContext } from "react";
import { Avatar, Divider } from "@mui/material";
import { LoginContext } from "./context/ContextProvider";
import { NavLink } from "react-router-dom";

import LogoutIcon from '@mui/icons-material/Logout';
function RightHeader({Logoutuser,Logclose}) {

  const {account,setAccount}=useContext(LoginContext);

  return (
    <>
      <div className="rightheader">
        <div className="right-nav">
          {account ? (
            <Avatar className="avtar2">{account.fname?account.fname[0].toUpperCase():''}</Avatar>
          ) : (
            <Avatar className="avtar"></Avatar>
          )}
         {account ? <h3>Hello, {account.fname.toUpperCase()}</h3> : ''}
        </div>
        <div className="nav-btn" onClick={()=>Logclose()}>
          <NavLink to='/'>Home</NavLink>
          <NavLink to='/'>Shop by category</NavLink>
          <Divider style={{width:'100%',marginLeft:'20px'}}/>
          <NavLink to='/'>Today's Deal</NavLink>
          {
            account ? (
              <NavLink to='/track'>Your order</NavLink> 
            ):(
              <NavLink to='/login'>Your order</NavLink>
            )
          }
          <Divider  style={{width:'100%',marginLeft:'20px'}}/>
          <div className="flag">
          <NavLink to='/'>Settings</NavLink>
          {/* <img src="" alt=""/> */}
          </div>
         
         {
          account ?
          <div className="flag">
            <LogoutIcon style={{fontSize:18,marginRight:4}}/>
            <h3 onClick={()=>Logoutuser()} style={{cursor:'pointer',fontWeight:500}}>Logout</h3>
          </div>:
          <NavLink to="login">SignIn</NavLink>
         }
        </div>
      </div>
    </>
  );
}

export default RightHeader;
