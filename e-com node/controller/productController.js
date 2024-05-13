const products=require('../modules/ProductSchema');
const products2=require('../modules/ProductSchema2');
module.exports.getProduct= async(req,res)=>{
  try {
      let collection=await products.find();
      console.log('clg'+collection);
    res.status(200).json(collection);
  } catch (error) {
    console.log('Error:'+ error.message);
    res.status(500).send(error.message);
  }
};

module.exports.getProduct2= async(req,res)=>{
  try {
      let collection=await products2.find();
      console.log('clg'+collection);
    res.status(200).json(collection);
  } catch (error) {
    console.log('Error:', error.message);
    res.status(500).send(error.message);
  }
};

// for single product
module.exports.singlePro= async(req,res)=>{
try {
  const {id} = req.params;
  // const id=req.params.id;
  console.log(id);

  const individualdata =await products.findOne({id:id})
  console.log(individualdata + 'individual data');

  res.status(200).json(individualdata);
} catch (error) {
  res.status(400).json(individualdata);
   console.log('Error:', error.message);
}

// try {
//   const {id} = req.params;
//   // const id=req.params.id;
//   console.log(id);

//   const individualdata =await products2.findOne({id:id})
//   console.log(individualdata + 'individual data');

//   res.status(200).json(individualdata);
// } catch (error) {
//   res.status(400).json(individualdata);
//    console.log('Error:', error.message);
// }
}


// module.exports={
//     getProduct
// }