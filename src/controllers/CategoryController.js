const joi = require('joi');
const category = require('../models/CategoryModel');
const plan = require('../models/PlanModel');
const role_access = require('../models/RoleAccessModel');
const role = require('../models/RoleModel');
const fs = require('fs');

exports.all_categories = async(req,res, next) => {

    const schema = joi.object({
        type: joi.string().required().valid('plan', 'department','product','gallery','form')
    });

    try {
        
        await schema.validateAsync(req.body);

        const data = await category.findAll({
            where: { type:req.body.type },
            include: [{
                model:role_access
            }]
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "All list"
        });

    } catch (err) {
        err.status = 404;
        next(err);
    }

}

exports.add_category = async (req, res, next) => {

    const schema = joi.object({
        name: joi.string().required(),
        type: joi.string().required().valid('plan','product','gallery')
    });
    
    try {

        await schema.validateAsync(req.body);

        const [data, created]  = await category.findOrCreate({
            where: { name:req.body.name },
            defaults: {
                type: req.body.type,
                image:req.file.path
            }
        });

        if(!created){
            throw new Error('Already exists');
        }

        return res.status(200).json({
            data: [],
            status: true,
            message: "created successfully"
        });

        
    } catch (err) {
        if (req.file) fs.unlinkSync(req.file.path);

        err.status = 409;
        next(err);
    }

}

exports.add_department = async (req, res, next) => {

    const schema = joi.object({
        name : joi.string().required(),
        column : joi.array().required()
    });

    try {
       
        await schema.validateAsync(req.body);
        
        const [data, created] = await category.findOrCreate({
            where: { name: req.body.name },
            defaults: {
                type: 'department'
            }
        });

        if (!created) {
            throw new Error('Already exists');
        }

        req.body.column.forEach(async (element) => {
        
            await role_access.create({
                menubar_id: element.menu_id,
                category_id : data.id,
                status : element.status
            });

        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "Team category successfully"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.block_category = async (req, res, next) => {

    const schema = joi.object({
        block: joi.string().required().valid('0','1'),
        cat_id: joi.number().required()
    });

    try {
        
        await schema.validateAsync(req.body);

        const check =  await category.findOne({
            where:{id:req.body.cat_id}
        });

        if(!check) throw new Error('Not found');

        if(check.type == 'department')
        {
            let check_type = await role.findOne({ where: { category_id: req.body.cat_id } })

            if(check_type) throw new Error('Team category is already in use');
        }
        else if(check.type == 'plan')
        {
            let check_type = await plan.findOne({ where: { category_id: req.body.cat_id } })

            if (check_type) throw new Error('Plan is already in use');
        }

        await category.update({is_block : req.body.block},{
            where:{id:req.body.cat_id}
        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "success"
        });
        

    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.cat_plan = async(req, res, next)=>{

    try {

        const data = await category.findAll({
            where: { type: 'plan' },
            include: [
                {
                    model :plan,
                    required: false,
                    limit: 5   
                }
            ]
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "All plans with plan category"
        });

    } catch (err) {
        err.status = 404;
        next(err);
    }

}

exports.edit_category = async (req, res, next) => {

    const schema = joi.object({
        name: joi.string().required(),
        cat_id: joi.number().required()
    });

    try {

        await schema.validateAsync(req.body);

        const data = await category.findOne({
            where: { id: req.body.cat_id }
        });

        data.name = req.body.name;

        if(req.file){
            fs.unlinkSync(data.image);
            data.image = req.file.path;
        }
        await data.save();

        return res.status(200).json({
            data: [],
            status: true,
            message: "updated successfully"
        });


    } catch (err) {
        err.status = 409;
        next(err);
    }

}