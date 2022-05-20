const testimonial = require('../models/TestimonialModel');
const fs = require('fs');
const joi = require('joi');


exports.all_list = async (req, res, next) => {

    try {
        
        const data= await testimonial.findAll({
            order: [[ 'id','desc' ]]
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "All testimonials"
        });

    } catch (err) {
        err.status =400;
        next(err); 
    }

}

exports.add_testimonial = async(req, res, next)=>{

    const schema = joi.object({
        title:joi.string().required(),
        desc : joi.string().required()
    });

    try {
        
        await schema.validateAsync(req.body);

        await testimonial.create({
            title:req.body.title,
            desc:req.body.desc,
            image: req.file.path
        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "Testimonial added successfull"
        });


    } catch (err) {
        fs.unlinkSync(req.file.path);
        err.status = 400;
        next(err);
    }

}

exports.edit_testimonial = async (req, res, next) => {

    const schema = joi.object({
        title: joi.string().required(),
        desc: joi.string().required(),
        testimonial_id:joi.string().required()
    });

    try {

        await schema.validateAsync(req.body);

        const data = await testimonial.findOne({
            where: { id: req.body.testimonial_id }
        });

        if(!data) throw new Error('Testimonial not found');

        data.title = req.body.title;
        data.desc = req.body.desc;

        if(req.file)
        {
            fs.unlinkSync(data.image); 
            data.image = req.file.path;
        }

        await data.save();

        return res.status(200).json({
            data: [],
            status: true,
            message: "Testimonial edited successfull"
        });

    } catch (err) {

        if(req.file)
        {
            fs.unlinkSync(req.file.path);
        } 
        
        err.status = 400;
        next(err);
    }

}

exports.block_testimonial = async (req, res, next) => {

    const schema = joi.object({
        block : joi.string().required(),
        testimonial_id : joi.number().required()
    });

    try {
        
        await schema.validateAsync(req.body);

        const data = await testimonial.findOne({
            where: { id: req.body.testimonial_id }
        });

        if (!data) throw new Error('Testimonial not found');

        data.is_block = req.body.block;
        await data.save();

        return res.status(200).json({
            data: [],
            status: true,
            message: "Successfull"
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.testimonial_detail = async (req, res, next) => {

    try {

        const data = await testimonial.findOne({
            where: { id: req.params.id }
        });

        if (!data) throw new Error('Testimonial not found');

        return res.status(200).json({
            data: data,
            status: true,
            message: "Testimonials detail"
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }

}
