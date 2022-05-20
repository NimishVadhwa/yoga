const user = require('../models/UserModel');
const joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { Op } = require("sequelize");
const { sendEmail } = require('../helper');
const user_profile = require('../models/User_profileModel');

exports.login = async(req,res, next)=>{

    const schema = joi.object({ 
        email: joi.string().required().email(),
        password: joi.string().required()
    });

    try {

        await schema.validateAsync(req.body);

        const check= await user.findOne({
            where:{email:req.body.email , type:"user"}
        });

        if(!check) throw new Error('Email not found');

        const passcheck = bcrypt.compareSync(req.body.password, check.password);
        
        if (!passcheck) throw new Error('password not matched');
        
        if (check.is_activated == '0') throw new Error('Please verify the email');

        const token = jwt.sign(
            { email: check.email, userId: check.id },
            process.env.AUTH_KEY
        );

        check.token = token;
        check.fcm_token = req.body.fcm_token;
        check.save();

        return res.status(200).json({
            data: check,
            status: true,
            message: "login successfully"
        });

    } catch (err) {
        err.status= 404;
        next(err); 
    }


}

exports.admin_login = async (req, res, next) => {

    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required()
    });

    try {

        await schema.validateAsync(req.body);

        const check = await user.findOne({
            where: { email: req.body.email, type: { [Op.ne]: 'user' } }
        });

        if (!check) throw new Error('Email not found');

        const passcheck = bcrypt.compareSync(req.body.password, check.password);

        if (!passcheck) throw new Error('password not matched');

        if (check.is_activated == '0') throw new Error('Please verify the email');

        const token = jwt.sign(
            { email: check.email, userId: check.id },
            process.env.AUTH_KEY
        );

        check.token = token;
        check.fcm_token = req.body.fcm_token;
        check.save();

        return res.status(200).json({
            data: check,
            status: true,
            message: "login successfully"
        });

    } catch (err) {
        err.status = 404;
        next(err);
    }

}

exports.register_user = async(req,res,next) => {

    const schema = joi.object({
        first_name : joi.string().required(),
        last_name : joi.string().required(),
        email : joi.string().required().email(),
        password: joi.string().required(),
        phone : joi.number().required()
    });

    try {
        await schema.validateAsync(req.body);

        const check = await user.findOne({where:{email:req.body.email}});
        if (check) throw new Error('Email already exists');
    
        await user.create({
            first_name:req.body.first_name,
            last_name:req.body.last_name,
            email : req.body.email,
            phone : req.body.phone,
            password: await bcrypt.hash(req.body.password, 12),
            type:'user'
        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "register successfully"
        });


    } catch (err) {
        err.status = 404;
        next(err); 
    }

}

exports.user_detail = async(req,res, next) => {

    const data = await user.findOne({
        where: { id: req.user_id},
        include: [{ 
            model: user_profile
         }]
    });

    return res.status(200).json({
        data: data,
        status: true,
        message: "User Detail"
    });

}

exports.forget_password = async(req,res, next) => {

    const schema = joi.object({
        email:joi.string().required().email()
    })

    try {
        
        await schema.validateAsync(req.body);

        const emailcheck = await user.findOne({
            where: { email: req.body.email }
        });

        if (!emailcheck) throw new Error('Email not found');

        const otp = Math.floor(Math.random() * (9999 - 999) + 999);

        // const data = `<strong>${otp} is your OTP for forget password </strong>`;
        // await sendEmail(emailcheck.email, 'Forget password OTP', data);


        return res.status(200).json({
            data: otp,
            status: true,
            message: "Otp for the user"
        });

    } catch (err) {
        err.status=404;
        next(err);
    }

}

exports.change_password = async (req, res, next) => {

    const schema = joi.object({
        email: joi.string().required().email(),
        password: joi.string().required()
    });

    try {
        await schema.validateAsync(req.body);

        const emailcheck = await user.findOne({
            where: { email: req.body.email }
        });

        if (!emailcheck) throw new Error('Email not found');

        emailcheck.password = await bcrypt.hash(req.body.password, 12)
        emailcheck.save();

        return res.status(200).json({
            data: emailcheck,
            status: true,
            message: "Password change successfully"
        });

    } catch (err) {
        err.status = 404;
        next(err);
    }


}

exports.logout = async (req, res, next) => {

    await user.update({token : null},{
        where:{
            id: req.user_id
        }    
    });

    return res.status(200).json({
        data: [],
        status: true,
        message: "Logout successfully"
    });

}
