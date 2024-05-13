// const Allproducts = require('../constant/ProductData');
const USER=require('../modules/UserSchema');
const products = require('../modules/ProductSchema');
const bcrypt = require('bcryptjs');
const stripe=require('stripe')('sk_test_51P5nQrSE06XCOnqkUN3B28DmPqX7bWz1DglpffiPoN0Yye6Sn1d92kTqTuRJpKlvawGzlaEWMFQ5MhCXXILOZMWi00ZyJTBU5L')

module.exports.register=async(req,res)=>{
//   console.log(req.body);
    
//   if data is not filled
  const {fname,email,mobile,password,cpassword} = req.body;
  if(!fname || !email || !mobile|| !password || !cpassword){
    res.status(422).json({error:'Fill all the data'});
    console.log('not data available');
  };

//   is user unique 
  try {
    const preUser = await USER.findOne({email:email});
    if(preUser){
        res.status(422).json({error:'User already exist'});
        console.log('user already exist');
    }else if(password !== cpassword){
        res.status(422).json({error:'Password is not valid'});
        console.log('pswd is not valid');
    }else{
        // if user is unique ,add the user
        const finalUser = new USER({
            fname,email,mobile,password,cpassword
        });

// password hashing process

        // save()-->it is a method of mongoDb
        const storedata = await finalUser.save();
        console.log(storedata);
        res.status(200).json(storedata);
    }
  } catch (error) {
    res.status(400).send(error +'in register page');
  }
}

module.exports.login= async(req,res)=>{
  
  const {email,password} = req.body;
  // if data is not filled
  if( !email || !password ){
    res.status(400).json({error:'Fill all the data'});
 };

 try {
  // is email are valid/same
  const userLogin = await USER.findOne({email:email});
  console.log(userLogin +'user value');

// user ka email match hoga to data milega uski help se password check krenge
  if(userLogin){
    // is password same/valid            frontend psswrd,database psswrd
    const isMatch = await bcrypt.compare(password,userLogin.password);
    console.log(isMatch +'password match');

   
// const token = await userLogin.generateAuthToken();
// console.log(token);

// res.cookie("WitWare", token,{
//     expires: new Date(Date.now() + 900000),
//     // httpOnly: true,
//   //   domain: 'http://localhost:3000', // Corrected domain declaration
//     path: '/'
//   //   secure: true,
//   //   sameSite: 'strict' // Optional, for better security
//   });

    if(!isMatch){
      res.status(400).json({error:'Invalid details'})
    }else{
       // token genrate
      const token = await userLogin.generateAuthToken();
      console.log(token);

    res.cookie("WitWare", token,{
            expires: new Date(Date.now() + 900000),
            httpOnly: true,
           //   domain: 'http://localhost:3000', // Corrected domain declaration
            //  path: '/'
           //   secure: true,
           //   sameSite: 'strict' // Optional, for better security
          });
      // console.log(cookies)
      const result={
        userLogin,
        token
      }
      // console.log(res);
      res.status(200).json({result});
    }
  }else{
    res.status(400).json({error:'user not exist'})
  }
 } catch (error) {
  res.status(400).json({error:'Invalid details'})
  console.log(error.msg+'error in login');
 }
}

module.exports.addcart= async(req,res)=>{
try {
  const {id} = req.params;
  const cart = await products.findOne({id:id});
  console.log('cart value'+cart);

  const userContact = await USER.findOne({_id:req.userId});
  console.log('userConatact' + userContact);

  if(userContact){
    const cartData = await userContact.addcartdata(cart);
    await userContact.save();
    console.log('look card item' + cartData);
    console.log('user contact' + userContact);
    res.status(201).json(userContact);
  }else{
    res.status(401).json({error:"Invalid users in addcart"}); 
  }
} catch (error) {
  res.status(401).json({error:"Invalid users in catrs by adding"});
}
}


module.exports.cartdetails = async(req,res)=>{
  try {
    const buyuser = await USER.findOne({_id:req.userId});
    res.status(201).json(buyuser);
  } catch (error) {
    console.log('error'+error)
  }
}

module.exports.validuser = async(req,res)=>{
  try {
    const validuserone = await USER.findOne({_id:req.userId});
    res.status(201).json({status:201,validuserone});
    console.log('user valid' + validuserone)
  } catch (error) {
    console.log(error+'user is not valid')
  }
}

module.exports.remove = async(req,res)=>{
  try {
    const {id} =req.params;

    req.rootUser.carts = req.rootUser.carts.filter((cruval)=>{
      // jo id match na kre wo return kre
      return cruval.id != id;
    });

    req.rootUser.save();
    res.status(200).json(req.rootUser);
    console.log('item remove');
  } catch (error) {
    res.status(400).json(req.rootUser);
    console.log('error' + error);
  }
}

module.exports.logout = async(req,res)=>{
  try {
    req.rootUser.tokens=req.rootUser.tokens.filter((curelem)=>{
      return curelem.token !== req.token
    });

res.clearCookie('WitWare',{path:'/'});

res.rootUser.save();
res.status(200).json(req.rootUser.tokens);
console.log('user logout');
  } catch (error) {
    console.log(error+'error for user logout');
  }
}
module.exports.payment = async(req,res)=>{
const {products}=req.body;
console.log(products);

const lineItems=products.map((product)=>({
  price_data:{
    currency:'INR',
    product_data:{
      name:product.title.shortTitle,
      name:product.title.longTitle
      // images:product.url
    },
    unit_amount:product.price.cost * 100,
  },
  quantity:1
}));

const session=await stripe.checkout.sessions.create({
  payment_method_types:['card'],
  line_items:lineItems,
  mode:'payment',
  success_url:'http://localhost:3000/success',
  cancel_url:'http://localhost:3000/cancel',
});
res.json({id:session.id})
}