const group = require('../models/GroupModel');
const groupchat = require('../models/GroupChatModel');
const groupuser = require('../models/GroupUserModel');
const message = require('../models/MessageModel');
const joi = require('joi');
const user = require('../models/UserModel');

exports.create_group = async (req, res, next) => {

    const schema = joi.object({
        name : joi.string().required(),
        user_id: joi.string().required()
    });

    try {
        
        await schema.validateAsync(req.body);

        let random = 'EQ_' + Math.random().toString(20).slice(2);

        const grp_id = await group.create({
            name : req.body.name,
            image : req.file.path,
            roomname: random
        });

        await groupuser.create({
            is_admin:'1',
            GroupId : grp_id.id,
            UserId : req.body.user_id
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

exports.add_group_user = async(req, res, next)=>{

    const schema = joi.object({
        user_id : joi.string().required(),
        group_id : joi.string().required(),
        admin : joi.string().required().valid('0','1')
    });

    try {
        
        await schema.validateAsync(req.body);

        const check = await group.findOne({ where:{id:req.body.group_id} });

        if(!check) throw new Error('Group not found');

        const user_check = await user.findOne({ where:{id:req.body.user_id} });

        if(!user_check) throw new Error('User not found');

        const group_user = await groupuser.findOne({ where: { GroupId: req.body.group_id, UserId: req.body.user_id } });

        if(group_user) throw new Error('User already exists in group');

        await groupuser.create({
            is_admin: req.body.admin,
            GroupId: req.body.group_id,
            UserId: req.body.user_id
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

}

