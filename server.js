const express = require("express");
const mongoose = require("mongoose");
const app = express();
const Product = require("./models/productmodels")
// const router = express.Router();

app.use(express.json());



 
// to Fetch the products
app.get('/products', async(req,res) =>{
    try {
        const products = await Product.find({})
        res.status(200).json(products)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }

})

// to Fetch the products by ID
app.get('/products/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }

})

// update a product
app.put('/products/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id ,req.body);
        if(!product){
            return res.status(404).json({message:`id not found ${id}`})
        }
        const updatedData = await Product.findById(id)
        res.status(200).json(updatedData)
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }

})

// Upload a product
app.post('/products', async(req,res) =>{
    try {
        const product= await Product.create(req.body)
        res.status(200).json(product);
        
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }

})

// Delete a Product
app.delete('/products/:id', async(req,res) =>{
    try {
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id );
        if(!product){
            return res.status(404).json({message:`id not found ${id}`})
        }
        res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).json({message:error.message})
        
    }

})

app.listen(3000)
 
mongoose.set("strictQuery",false);
mongoose.connect('mongodb+srv://enjoeroot:enjoeroot@cluster0.eqlsred.mongodb.net/Node-API?retryWrites=true&w=majority')
.then(()=>{
    console.log("connected to mongoDB")
}).catch(()=> {
    console.log(error)
})