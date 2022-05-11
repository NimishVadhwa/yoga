const joi = require('joi');
const field = require('../models/Form_feildModel');
const category = require('../models/CategoryModel');

exports.add_form_column = async(req, res, next)=>{

    const schema = joi.object({
        cat_id: joi.string().required(),
        column : joi.array().required()
    });

    try {
        
        await schema.validateAsync(req.body);

        const check = await category.findOne({
            where: { id:req.body.cat_id,type:'form' }
        });

        if(!check) throw new Error('Category not found');

        req.body.column.forEach(async(element)=>{
            
            await field.create({
                column_name:element.column,
                column_type:element.type,
                min_value:element.min,
                max_value: element.max,
                category_id: req.body.cat_id
            });

        });


        return res.status(200).json({
            data: [],
            status: true,
            message: "Feilds added successfully"
        });


    } catch (err) {
        err.status = 404;
        next(err);
    }

}

