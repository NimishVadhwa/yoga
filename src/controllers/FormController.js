const joi = require('joi');
const field = require('../models/Form_feildModel');
const form_value = require('../models/Form_valueModel');
const category = require('../models/CategoryModel');
const checkbox = require('../models/Form_checkboxModel');
const role = require('../models/RoleModel');

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
            
            let dta = await field.create({
                label: element.label,
                column_name:element.column,
                column_type:element.type,
                category_id: req.body.cat_id
            });

            if(element.type == 'checkbox')
            {
                element.check.forEach(async(value)=>{
                    
                    await checkbox.create({
                        name:value,
                        field_id : dta.id
                    });

                })

            }

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

exports.edit_form_column = async (req, res, next) => {

    const schema = joi.object({
        column : joi.array().required()
    });

    try {
        
        await schema.validateAsync(req.body);

        req.body.column.forEach(async (element) => {


            await field.update({ label: element.label }, {
                where: { id: element.field_id }
            });

            if (element.type == 'checkbox') {

                element.check.forEach(async (value) => {

                    await checkbox.update({ name:value.label },{
                        where: { id: value.checkbox_id }
                    });

                })

            }

        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "Feilds updated successfully"
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.form_column_with_cat = async (req, res, next) => {

    const schema = joi.object({
        cat_id : joi.number().required()
    });

    try {
        
        await schema.validateAsync(req.params);

        const data = await field.findAll({
            where: { category_id : req.params.cat_id},
            include:[{
                model:checkbox
            }]
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "Form Feilds"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.block_field = async(req, res, next)=>{

    const schema = joi.object({
        field_id: joi.number().required(),
        block:joi.string().required().valid('0','1')
    });

    try {
        
        await schema.validateAsync(req.body);

        await field.update({is_block:req.body.block},{
            where:{id:req.body.field_id}
        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "successfull"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }


}

exports.add_field_value = async (req, res, next) => {

    const schema = joi.object({
        cat_id: joi.number().required(),
        trainer_req: joi.string().required().valid('0','1'),
        data : joi.array().required()
    });

    try {

        await schema.validateAsync(req.body);

        req.body.data.forEach(async (element) => {

            await form_value.create({
                field_id: element.field_id,
                user_id: req.user_id,
                value: element.value,
                checkbox_id: element.checkbox_id,
                category_id: req.body.cat_id
            });

        });

        if(req.body.trainer_req == '1')
        {
            await role.create({
                user_id : req.user_id,
                is_trainee : '1',
                request : 'pending'
            });
        }

        return res.status(200).json({
            data: [],
            status: true,
            message: "Data added successfully"
        });
        
    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.edit_field_value = async (req, res, next) => {

    const schema = joi.object({
        data: joi.array().required()
    });

    try {

        await schema.validateAsync(req.body);

        req.body.data.forEach(async (element) => {

            // const data = 

            await form_value.update({value: element.value},{
                 where:{ id:element.form__value_id } 
            });

        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "Data updated successfully"
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.image_upload = async (req, res, next) => {


    return res.status(200).json({
        data: req.files,
        status: true,
        message: "Image upload"
    });

}

