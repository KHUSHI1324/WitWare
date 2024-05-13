import React, { useContext, useEffect, useState } from "react";
// import { AppBar,styled } from '@mui/material'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Drawer from "@mui/material/Drawer";
import LogoutIcon from '@mui/icons-material/Logout';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import RightHeader from "./RightHeader";
import { NavLink, useNavigate } from "react-router-dom";
import { LoginContext } from "./context/ContextProvider";
import { useSelector } from "react-redux";
function Header() {
  // const navigate = useNavigate();

  const { account, setAccount } = useContext(LoginContext);
  console.log(account);

  const history = useNavigate();
  
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  
  const [text,setText]= useState('');
  // console.log(text)
  const [liopen,setLiopen] = useState(true);

  
const {products}= useSelector(state=>state.getproductsdata);

  const [dropen, setDropen] = useState(false);

  const getdetailvaliduser = async () => {
    let token = localStorage.getItem('e-comToken')
// console.log(token);

    const res = await fetch("http://localhost:8000/validuser", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        'Authorization' : token
      },
  //     credentials: "include",
  //     withCredentials: true,
    });
    const data = await res.json();
    console.log(data);

    if (data.status == 400 || !data) {
      console.log("error in validation ");
      // history('/login')
    } else {
      console.log("data validation successfull");
      console.log(data);
      // history('/');
      setAccount(data);
    }
  };
  useEffect(() => {
    getdetailvaliduser();
  }, []);

  const handleOpen = () => {
    setDropen(true);
  };

  const handledrclose = () => {
    setDropen(false);
  };

  const logoutuser = async () => {
    let token = localStorage.getItem('e-comToken')
    const res2 = await fetch("http://localhost:8000/logout", {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        'Authorization' : token
      },
      // credentials: "include",
    });
    const data2 = await res2.json();
    console.log(data2);

    if (res2.status == 400 || !res2) {
      console.log("error");
    } else {
      console.log("data valid");
      toast.success('user logout',{
        position:'top-center',
    })
      history('/');
      setAccount(false);
      
    }
  };

  const getText = (items)=>{
setText(items);
setLiopen(false);
  }
  

  // const sendBuy =()=>{
  //   if(account){
  //     navigate('/buynow')
  //   }else{
  //     // navigate()
  //     console.log('user not found');
  //   }
  // }
  // console.log(account);
  return (
    <div className="header">
      <div className="nav">
        <div className="nav-left">
          <IconButton className="hamburgur" onClick={handleOpen}>
            <MenuIcon style={{ color: "#fff" }} />
          </IconButton>
          <Drawer className="drawer" open={dropen} onClose={handledrclose}>
            <RightHeader Logclose={handledrclose} Logoutuser={logoutuser} />
          </Drawer>
          ={handledrclose}
          <div className="Component">
            <NavLink to="/">
              <h1>WitWare</h1>
            </NavLink>
          </div>
          <div className="search">
            <input type="text" name=""  placeholder='Search your products' onChange={(e)=>getText(e.target.value)} id="" />
            <div className="search-icon">
              <SearchIcon id="search" />
            </div>
          </div>

          {/* search filter */}

    {
      text && <List className="extrasearch" hidden={liopen}>
  {
    products.filter(product =>product.title.longTitle.toLowerCase().includes(text.toLowerCase())).map(product =>(
      <ListItem>
        <NavLink to ={`getproductsone/${product.id}`} onClick={()=>setLiopen(true)}>
        {product.title.longTitle}
        </NavLink>
      </ListItem>
    ))
  }
      </List>
    }
        </div>
        
        <div className="nav-right">
          <div className="btn">
            <NavLink to="/login">signup</NavLink>
          </div>
          <div
            className="cart"
            //  onClick={sendBuy}
          >
             {
                  account ?    <NavLink to='/buynow'>
               <Badge badgeContent={account && account.carts ? account.carts.length : 0} color="primary">

                    <ShoppingCartIcon id='icon'/>
                  </Badge>
                  </NavLink>:   <NavLink to='/login'>
                <Badge badgeContent={0} color="primary">
                  <ShoppingCartIcon id='icon'/>
                </Badge>
                </NavLink>
                } 

<ToastContainer/>
            <p>cart</p>
          </div>
          {account ? (
            <Avatar className="avtar2"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
              // title={account.fname ? account.fname.toUpperCase() : ""} /* Check if account.fname is defined before accessing its properties */
              >
                { account.fname ?account.fname[0].toUpperCase() :''} {/* Check if account.fname is defined before accessing its properties */}
    </Avatar>
          ) : (
            <Avatar className="avtar"
              id="basic-button"
              aria-controls={open ? "basic-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
              onClick={handleClick}
            ></Avatar>
          )}

          <div>
          
            <Menu
              id="basic-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "basic-button",
              }}
            >
             
              <MenuItem onClick={handleClose}>My account</MenuItem>
              {
                account ?  <MenuItem onClick={handleClose}  onChange={logoutuser}>
                <LogoutIcon  style={{fontSize:16,marginRight:3}}/>Logout
                </MenuItem> :''
              }
             
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;