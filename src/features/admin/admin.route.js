const express = require("express");
const Product = require("../products/product.model.js");
const authMiddleWare = require("../../authMiddleware/authMiddleware")
const app = express.Router();

app.get("/products" , async (req,res) => {
    const {limit=9 , page=1, sort} = req.query;
    let srt;

    try {
        const count = await Product.find().count()
        const product = await Product.find().limit(limit).skip((page-1) * limit);
        res.send({products:product, count});

        
       
    } catch (error) {
        res.status(404).send(error.message)
    }
});


module.exports = app;