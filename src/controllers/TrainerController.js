const joi = require('joi');
const user = require('../models/UserModel');
const category = require('../models/CategoryModel');
const role = require('../models/RoleModel');
const bcrypt = require('bcryptjs');
const { sendEmail } = require('../helper');
const role = require('../models/RoleModel');

exports.trainer_list = async(req,res, next)=>{
    
    try {
        
        const data = await user.findAll({
            where:{ type:"team" },
            include: [{
                model:role,
                where: { is_trainee: "0" }
            }]
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "All traineer list"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.add_trainer = async (req, res, next) => {

    const schema = joi.object({
        first_name : joi.string().required(),
        last_name : joi.string().required(),
        email : joi.string().required().email(),
        password : joi.string().required(),
        cat_id : joi.number().required(),
        phone: joi.string().required()
    });

    try {
        
        await schema.validateAsync(req.body);

        const check = await user.findOne({ where: { email: req.body.email } });
        if (check) throw new Error('Email already exists');

        const data = await user.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            phone: req.body.phone,
            password: await bcrypt.hash(req.body.password, 12),
            type: 'team'
        });


        await role.create({
            is_trainee : '0',
            user_id : data.id,
            category_id : req.body.cat_id
        });

        // const data = `<strong>${otp} is your OTP for forget password </strong>`;
        // await sendEmail(emailcheck.email, 'Forget password OTP', data);

        return res.status(200).json({
            data: data,
            status: true,
            message: "Mail sent to trainer successfully"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.trainer_request_list = async (req, res, next) => {


}