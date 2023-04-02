const express=require('express');
const app=express();
const path=require('path');
const mongoose = require('mongoose');
const methodOverroide=require('method-override');

const Product=require('./models/product');
mongoose.connect('mongodb://127.0.0.1:27017/farmApp');
const db = mongoose.connection;
//db.on('error',console.error.bind(console,'connection error:'));
//db.once('open',function(){
//console.log("connection error")
//});

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/farmApp');

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}
app.set('views',path.join(__dirname,'views'));
app.set('view engine','ejs');
//use this middleware for app.post 
app.use(express.urlencoded({extended:true}))
app.use(methodOverroide('_method'))
//to see all the matched products
app.get('/products',async (req,res)=>{
 const products=await  Product.find({})
 console.log(products)
   res.render('products/index',{products})
})
//to create new product
app.get('/products/new',(req,res)=>{res.render('products/new')})
app.post('/products',async (req,res)=>{
  const  newProduct = new Product(req.body);
  await newProduct.save();
  console.log(newProduct)
  res.redirect(`/products/${newProduct.__id}`)

})
//to get product by id
app.get('/products/:id', async (req,res)=>{
  const {id}=req.params;
  const product =await Product.findById(id)
  console.log(product)
  res.render('products/show',{product})
  
})
//to edit a product 
app.get('/products/:id/edit',async (req,res)=>{
  const {id}=req.params;
  const product= await Product.findById(id)
  res.render('products/edit',{product})
})
app.put('/products/:id',async (req,res)=>{
  const {id}=req.params;
  const product= await Product.findByIdAndUpdate(id,req.body,{runValidators:true,new:true})
  console.log(req.body);
  res.redirect(`/products/${product.__id}`)});
app.listen(3000,()=>{
    console.log("APP IS LISTENING ON PORT")
})
4