const joi = require('joi');
const product = require('../models/ProductModel');
const media = require('../models/MediaModel');
const fs = require('fs');

exports.all_products = async (req, res, next) => {

    try {
        
        const data = await product.findAll({
            order: [
                ['id', 'DESC']
            ],
            include: [{
                model:media,
                limit:1
            }]
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "All products"
        });

    } catch (err) {
        console.log(err);
        err.status =400;
        next(err);
    }

}

exports.add_product = async (req, res, next) => {

    const schema = joi.object({
        title:joi.string().required(),
        desc: joi.string().required(),
        qty: joi.string().required(),
        price: joi.string().required(),
        cat_id: joi.string().required(),
        gender: joi.string().required().valid('men','women','kid','all'),
    });

    try {
        
        await schema.validateAsync(req.body);

        const data = await product.create({
            name:req.body.title,
            description:req.body.desc,
            qty:req.body.qty,
            price:req.body.price,
            gender: req.body.gender,
            category_id : req.body.cat_id
        });

        req.files.forEach(async(element)=>{

            await media.create({
                path : element.path,
                type: 'product',
                product_id: data.id
            });

        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "Product added successfully"
        });

    } catch (err) {

        req.files.forEach(element => {

            fs.unlinkSync(element.path);
        });

        err.status = 400;
        next(err);
    }
    
}

exports.edit_product = async (req, res, next) => {

    const schema = joi.object({
        title: joi.string().required(),
        desc: joi.string().required(),
        qty: joi.string().required(),
        price: joi.string().required(),
        cat_id: joi.string().required(),
        gender: joi.string().required().valid('men', 'women', 'kid', 'all'),
        prdt_id : joi.string().required()
    });

    try {

        await schema.validateAsync(req.body);
 
        await product.update({
            name: req.body.title,
            description: req.body.desc,
            qty: req.body.qty,
            price: req.body.price,
            gender: req.body.gender,
            category_id: req.body.cat_id
        },{
            where: { id:req.body.prdt_id }
        });

        req.files.forEach(async (element) => {

            await media.create({
                path: element.path,
                type: 'product',
                product_id: req.body.prdt_id
            });

        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "Product updated successfully"
        });

    } catch (err) {

        req.files.forEach(element => {
            fs.unlinkSync(element.path);
        });

        err.status = 400;
        next(err);
    }

}

exports.block_product = async (req, res, next) => {

    const schema = joi.object({
        prdt_id : joi.number().required(),
        block: joi.string().required().valid('1','0')
    });

    try {
        
        await schema.validateAsync(req.body);

        await product.update({ is_block : req.body.block },{
            where : { id:req.body.prdt_id }
        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "Successfully"
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.remove_product_image = async (req, res, next) => {

    const schema = joi.object({
        prdt_id : joi.number().required(),
        image_id : joi.number().required()
    });
    
    try {
        
        await schema.validateAsync(req.body);

        const data = await media.findOne({
            where: { id: req.body.image_id, product_id : req.body.prdt_id}
        });

        if(!data) throw new Error('Image not found');

        fs.unlinkSync(data.path);

        await data.destroy();

        return res.status(200).json({
            data: [],
            status: true,
            message: "Product image remove successfully"
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.product_detail = async (req, res, next) => {
    
    try {
    
         const data = await product.findOne({
             where:{id:req.params.id},
             include: [{
                 model: media
             }]
         });

        return res.status(200).json({
            data: data,
            status: true,
            message: "Product detail"
        });

        
    } catch (err) {
        err.status = 400;
        next(err);
    }
}