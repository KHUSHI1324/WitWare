const express = require('express');
const router = express.Router();
const authen = require('../middleware/Authentication');
// const Products = require('../modules/ProductSchema');
const {getProduct,singlePro,getProduct2} = require('../controller/productController');
const {register,login,addcart,cartdetails,validuser,remove,logout,payment}=require('../controller/userController');
// api for allproducts
router.get('/getproducts',getProduct)
router.get('/getproducts2',getProduct2)

// api for indiv. product
router.get('/getproductsone/:id',singlePro)

//api for authen
router.post('/register',register)
router.post('/login',login)

// adding data into cart
router.post('/addcart/:id',authen,addcart)

// get cart details
router.get('/cartdetails',authen,cartdetails)

// get valid user
router.get('/validuser',authen,validuser)

// remove item from cart
router.delete('/remove/:id',authen,remove)

// for user logout
router.get('/logout',authen,logout)

// for payment
router.post('/payment',payment);
module.exports=router;