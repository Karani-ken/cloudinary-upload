const express = require('express')
const upload = require('../middleware/upload')
const {uploadToCloudinary, removeFromCloudinary} = require('../services/cloudinary')
const router = new express.Router()
const Product = require('../models/productModel')
//create a product
router.post('/product', async (req, res)=>{
    try {
        const product = new Product(req.body)
        await product.save();
        res.status(201).send(product);
        
    } catch (error) {
        res.status(400).send(error)
    }
});

// upload product Image
router.post('/image/:id', upload.single("productImage") ,async (req,res)=>{
    try {
        //upload Image to cloudinary
        const data = await uploadToCloudinary(req.file.path, "test-one")
        //save Image url and publicID to the database
        const saveImg = await Product.updateOne(
            { _id: req.params.id},
            {
                $set:{
                    imageUrl: data.url,
                    publicId: data.public_id,
                },
            }
        );

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