const joi = require('joi');
const category = require('../models/CategoryModel');
const team = require('../models/TeamModel')
const plan = require('../models/PlanModel');

exports.all_categories = async(req,res, next) => {

    const schema = joi.object({
        type: joi.string().required().valid('plan','department')
    });

    try {
        
        await schema.validateAsync(req.body);

        const data = await category.findAll({
            where: { type:req.body.type }
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
        type : joi.string().required().valid('plan','department')
    });
    
    try {

        await schema.validateAsync(req.body);

        const [data, created]  = await category.findOrCreate({
            where: { name:req.body.name },
            defaults: {
                type: req.body.type
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
        err.status = 409;
        next(err);
    }

}

exports.block_category = async (req, res, next) => {

    const schema = joi.object({
        block: joi.string().required().valid('0','1'),
        cat_id: joi.string().required()
    });

    try {
        
        await schema.validateAsync(req.body);

        const check =  await category.findOne({
            where:{id:req.body.cat_id}
        });

        if(!check) throw new Error('Not found');

        if(check.type == 'department')
        {
            let check_type = team.findOne({ where: { CategoryId : req.body.cat_id } })

            if(check_type) throw new Error('Department is already in use');
        }
        else if(check_type == 'plan')
        {
            let check_type = plan.findOne({ where: { CategoryId: req.body.cat_id } })

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
