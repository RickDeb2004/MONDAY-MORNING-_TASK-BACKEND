const mongoose = require('mongoose');
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
//const p=new Product({name:'ruby',price:'1.2',catagory:'fruit'});
//p.save().then(p=>console.log(p))
//.catch(e=>{
 //console.log(e)
//})
const seedProduct=[
  {
    name:'apple',
    price:'7.5',
    category:'fruit'
  },
  {
    name:'mango',
    price:'8.5',
    category:'fruit'
  },
  {
    name:'guava',
    price :'10',
    category:'fruit'

  },
  {
    name:'dairy milk',
    price:'15',
    category:'dairy'
  },
  { 
    name:'potato',
    price:'20',
    category:'vegetables'
  }


];
Product.insertMany(seedProduct)
       .then(res=>{
        console.log(res)
       })
       .catch(e=>{
        console.log(e)
       })
