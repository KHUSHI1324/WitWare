const mongoose=require('mongoose');

const productSchema=new mongoose.Schema({
    id:String,
    url:String,
    detailsUrl:String,
    title:Object,
    price:Object,
    description:String,
    discount:String,
    tagline:String
});

const data2 = mongoose.model('products2',productSchema);
module.exports=data2;