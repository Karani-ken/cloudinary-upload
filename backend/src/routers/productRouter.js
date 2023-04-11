const express = require('express')
const upload = require('../middleware/upload')
const {uploadToCloudinary, removeFromCloudinary} = require('../services/cloudinary')
const router = new express.Router()
const Product = require('../models/productModel')
//create a product
/*router.post('/product', async (req, res)=>{
    try {
        const product = new Product(req.body)
        await product.save();
        res.status(201).send(product);
        
    } catch (error) {
        res.status(400).send(error)
    }
});*/

// upload product Image
router.post('/createproduct', upload.single("image") ,async (req,res)=>{
    try {
        //upload Image to cloudinary
        const data = await uploadToCloudinary(req.file.path, "test-one")
        //save Image url and publicID to the database
        const imageUrl = data.url;
        //save form data and imageurl to the database
        const product = new Product({
            name:req.body.name,
            email: req.body.email,
            image: imageUrl,
        })
       
        await product.save();

        res.status(200).send("product image was uploaded successfully")

    } catch (error) {
        res.status(400).send(error);
    }
})
//get images
router.get('/allproducts', async (req, res)=> {
try {
    const Products = await Product.find()
    res.status(201).json(Products)
} catch (error) {
    
}

})





module.exports = router