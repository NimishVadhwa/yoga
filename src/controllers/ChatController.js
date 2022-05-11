const group = require('../models/GroupModel');
const groupuser = require('../models/GroupUserModel');
const message = require('../models/MessageModel');
const joi = require('joi');
const user = require('../models/UserModel');
const fs = require('fs');


exports.create_group = async (req, res, next) => {

    const schema = joi.object({
        name : joi.string().required()
    });

    try {
        
        await schema.validateAsync(req.body);

        let random = 'EQ_' + Math.random().toString(20).slice(2);

        const grp_id = await group.create({
            name : req.body.name,
            image : req.file.path,
            roomname: random
        });

        const dtta = await groupuser.create({
            is_admin:'1',
            group_id: grp_id.id,
            user_id: req.user_id
        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "Group created successfully"
        });

    } catch (err) {
        fs.unlinkSync(req.file.path);

        err.status = 400;
        next(err);
    }

}

exports.edit_group = async (req, res, next) => {

    const schema = joi.object({
        name: joi.string().required(),
        grp_id: joi.string().required()
    });

    try {

        await schema.validateAsync(req.body);

        const data = await group.findOne({ where: { id: req.body.grp_id } });

        data.name = req.body.name;

        if (req.file) {
            fs.unlinkSync(data.image);
            data.image = req.file.path;
        }

        await data.save();

        return res.status(200).json({
            data: [],
            status: true,
            message: "Group updated successfully"
        });

    } catch (err) {
        if (req.file) fs.unlinkSync(req.file.path);

        err.status = 400;
        next(err);
    }

}

exports.add_group_user = async(req, res, next)=>{

    const schema = joi.object({
        user_id : joi.number().required(),
        group_id : joi.number().required(),
        admin : joi.string().required().valid('0','1')
    });

    try {
        
        await schema.validateAsync(req.body);

        const check = await group.findOne({ where:{id:req.body.group_id} });

        if(!check) throw new Error('Group not found');

        const user_check = await user.findOne({ where:{id:req.body.user_id} });

        if(!user_check) throw new Error('User not found');

        const group_user = await groupuser.findOne({ where: { group_id: req.body.group_id, user_id: req.body.user_id } });

        if(group_user) throw new Error('User already exists in group');

        await groupuser.create({
            is_admin: req.body.admin,
            group_id: req.body.group_id,
            user_id: req.body.user_id
        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "user added successfully in group"
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.edit_group_user = async (req, res, next) => {

    const schema = joi.object({
        group_id : joi.number().required(),
        user_id: joi.number().required(),
        admin : joi.string().required().valid('0','1')
    });

    try {

        await schema.validateAsync(req.body);

        const check = await group.findOne({ where: { id: req.body.group_id } });

        if (!check) throw new Error('Group not found');

        const user_check = await user.findOne({ where: { id: req.body.user_id } });

        if (!user_check) throw new Error('User not found');

        await groupuser.update({ is_admin: req.body.admin },{
            where: { group_id: req.body.group_id, user_id: req.body.user_id }
        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "user edited successfully in group"
        });
        
    } catch (err) {
        err.status = 400;
        next(err);
    }
    
}

exports.group_user_list = async (req, res, next)=>{

    try {
        
        const data = await groupuser.findAll({
            where: { user_id : req.user_id }
        });

        if(!data) throw new Error('User not added in any group');

        return res.status(200).json({
            data: data,
            status: true,
            message: "All list of group by single user"
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }

}