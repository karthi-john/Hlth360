const Product = require('../models/HealthcareProduct');
const mongoose = require('mongoose');

exports.getProducts = async (req, res , next) => {
    try{
       
        const products = await Product.find();


        res.status(200).json({
            success: true,
            count: products.length,
            data: products
        });
    }catch(error){
        next(error);
    }
}

exports.getProductByID = async (req, res, next) => {
    try{

        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
            success: false,
            error: 'Invalid patient ID'
            });
        }

        const product = await Product.findById(id);

        if(!product){
            return res.status(404).json({
                success: false,
                error: "product Not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    }catch(error){
        next(error);
    }
}

exports.createProduct = async (req, res, next) => {
    try{

        const product = await Product.insertMany(req.body);

        res.status(201).json({
            success: true,
            data: product
        });
    }catch(error){
        next(error);
    }
}

exports.updateProduct = async (req, res, next) => {
    try{
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
            success: false,
            error: 'Invalid patient ID'
            });
        }

        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    }catch(error){
        next(error);
    }
}



exports.deleteProduct = async (req, res, next) => {
    try{
        const id = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({
            success: false,
            error: 'Invalid patient ID'
            });
        }

        const product = await Product.findByIdAndDelete(id, req.body);

        if(!product){
            return res.status(404).json({
                success: false,
                error: "Product not found"
            });
        }

        res.status(200).json({
            success: true,
            data: product
        });
    }catch(error){
        next(error);
    }
}