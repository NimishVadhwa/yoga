const joi = require('joi');
const product = require('../models/ProductModel');

exports.all_products = async (req, res, next) => {

    try {
        
        const data = await product.findOne({
            where:{ is_block : "0" },
            order: [
                ['id', 'DESC']
            ],
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "All menu"
        });

    } catch (err) {
        err.status =400;
        next(err);
    }

}

exports.add_product = async (req, res, next) => {

    console.log(req.files);

    

}