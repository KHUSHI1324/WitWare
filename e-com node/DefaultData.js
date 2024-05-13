const Products=require('./modules/ProductSchema');
const Products2=require('./modules/ProductSchema2');
const Allproducts =require ('./constant/ProductData')
const Product2 = require('./constant/Product2') 
const Default=async()=>{
    try {

        await Products.deleteMany({});
      const storeData=await Products.insertMany(Allproducts);
     
      await Products2.deleteMany({});
      const storeData2=await Products2.insertMany(Product2);
       
        // console.log(storeData);
    } catch (error) {
        console.log('error'+error.msg);
    }
};

module.exports=Default;