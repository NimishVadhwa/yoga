const joi = require('joi');
const plan = require('../models/PlanModel');
const category = require('../models/CategoryModel');
const fs = require('fs');

exports.add_plan = async(req,res, next)=>{

    const schema = joi.object({
        name: joi.string().required(),
        price: joi.string().required(),
        focus: joi.string().required(),
        duration:joi.string().required(),
        gender_allowed:joi.string().required(),
        mode: joi.string().required(),
        age_range: joi.string().required(),
        schedule: joi.string().required(),
        total_sessions: joi.string().required(),
        validity: joi.string().required(),
        description: joi.string().required(),
        cat_id : joi.string().required()
    });

    try {
        await schema.validateAsync(req.body);

        const check = await category.findOne({
            where:{type:'plan',id:req.body.cat_id}
        });

        if(!check) throw new Error('Category not found');

        await plan.create({
            name : req.body.name,
            image: req.file.path,
            price: req.body.price,
            focus: req.body.focus,
            duration: req.body.duration,
            gender_allowed: req.body.gender_allowed,
            mode: req.body.mode,
            age_range: req.body.age_range,
            schedule: req.body.schedule,
            total_sessions: req.body.total_sessions,
            validity: req.body.validity,
            description: req.body.description,
            CategoryId :req.body.cat_id
        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "Plan created successfully"
        });

    } catch (err) {

        fs.unlinkSync(req.file.path);

        err.status = 404;
        next(err);
    }

}

exports.cat_with_plan = async (req, res, next) => {

    const schema = joi.object({
        id: joi.string().required()
    });

    try {

        await schema.validateAsync(req.params);

        const data = await category.findOne({
            where: { id: req.params.id, type: 'plan' },
            include: [plan]
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

exports.plan_detail = async (req, res, next) => {

    const schema = joi.object({
        id : joi.string().required()
    });

    try {
        
        await schema.validateAsync(req.params);

        const data = await plan.findOne({ where: { id: req.params.id } });

        if(!data) throw new Error('Plan not found');

        return res.status(200).json({
            data: data,
            status: true,
            message: "Plans with detail"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.all_plans = async (req, res, next) => {

    try {

        const data = await plan.findAll();

        return res.status(200).json({
            data: data,
            status: true,
            message: "All Plans list"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.edit_plan = async (req, res, next) => {

    const schema = joi.object({
        name: joi.string().required(),
        price: joi.string().required(),
        focus: joi.string().required(),
        duration: joi.string().required(),
        gender_allowed: joi.string().required(),
        mode: joi.string().required(),
        age_range: joi.string().required(),
        schedule: joi.string().required(),
        total_sessions: joi.string().required(),
        validity: joi.string().required(),
        description: joi.string().required(),
        cat_id: joi.string().required(),
        plan_id: joi.string().required()
    });

    try {
        await schema.validateAsync(req.body);

        const check = await category.findOne({ where: { type: 'plan', id: req.body.cat_id } });

        if (!check) throw new Error('Category not found');

        const plans = await plan.findOne({where:{ id:req.body.plan_id }})

        if(!plans) throw new Error('Plan not found');

        plans.name =  req.body.name;
        if (req.file) plans.image = req.file.path; fs.unlinkSync(plans.image);
        plans.price = req.body.price;
        plans.focus = req.body.focus;
        plans.duration = req.body.duration;
        plans.gender_allowed = req.body.gender_allowed;
        plans.mode = req.body.mode;
        plans.age_range = req.body.age_range;
        plans.schedule = req.body.schedule;
        plans.total_sessions= req.body.total_sessions;
        plans.validity = req.body.validity;
        plans.description= req.body.description;
        plans.CategoryId= req.body.cat_id;
        
        await plans.save();
        await plans.reload();

        return res.status(200).json({
            data: plans,
            status: true,
            message: "Plan updated successfully"
        });

    } catch (err) {

        if(req.file) fs.unlinkSync(req.file.path);

        err.status = 404;
        next(err);
    }

}

exports.block_plan = async (req, res, next) => {

    const schema = joi.object({
        plan_id: joi.number().required(),
        block: joi.string().required(),
    });

    try {
        
        await schema.validateAsync(req.body);

        const check = await plan.findOne({ where:{id:req.body.plan_id} });

        if(!check) throw new Error('Plan not found');

        check.is_block = req.body.block;
        await check.save();

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