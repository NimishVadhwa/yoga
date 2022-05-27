const menu = require('../models/Menu_barModel');
const media = require('../models/MediaModel');
const joi = require('joi');
const fs = require('fs');
const user = require('../models/UserModel');
const user_profile = require('../models/User_profileModel');
const category = require('../models/CategoryModel');
const role = require('../models/RoleModel');
const role_access = require('../models/RoleAccessModel');

exports.all_menu = async(req,res, next) => {

    try {

        const role_dat = await role.findOne({ where:{ user_id : req.user_id } });

        const data = await role_access.findAll({ 
            where: { category_id : role_dat.category_id},
            include:[{
                model:menu,
                order: [
                    ['id', 'ASC']
                ],
                include: [{
                    model:menu,
                    as:'sub_menu', 
                    required:false   
                }]
            }]
        })

        // console.log(data);


        // const data = await menu.findAll({
        //     where: { is_parent:0},
        //     order: [
        //         ['id', 'ASC']
        //     ],
        //     include: [{
        //         model:menu,
        //         as:'sub_menu', 
        //         required:false   
        //     }]
        // });

        return res.status(200).json({
            data: data,
            status: true,
            message: "All menu"
        });
        
    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.parent_menu = async(req, res, next)=>{

    try {
        
        const data = await menu.findAll({
            where: { is_parent:0},
            order: [
                ['id', 'ASC']
            ]
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "Menu"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.dashboard = async(req, res,next)=> {

    return res.status(200).json({
        data: [],
        status: true,
        message: "Dashboard"
    });
    
}

exports.influencer = async (req, res, next) => {

    const schema = joi.object({
        is_influence:joi.string().required().valid('0','1'),
        user_id : joi.number().required()
    });

    try {

        await schema.validateAsync(req.body);

        await user.update({ is_influence : req.body.is_influence},{
            where: { id: req.body.user_id }
        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "Successfully"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.all_clients = async (req, res, next) => {

    try {

        if (req.type == 'user') throw new Error('Something went wrong');

        const data = await user.findAll({
            where: { type: 'user' },
            order:[
                ['id', 'DESC']
            ]
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "All clients list"
        });


    } catch (err) {
        err.status = 500;
        next(err);
    }

}

exports.gallery_list = async (req, res, next) => {

    try {
        
        const data = await media.findAll({
            where : { type:'gallery' },
            include: [{
                model: category
            }]
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "All gallery"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.add_gallery = async (req, res, next) => {

    try {
        
        if(!req.files) throw new Error('Please select image');

        req.files.forEach( async(element)=>{

            await media.create({
                path:element.path,
                type:'gallery',
                category_id : req.body.cat_id
            });

        });

        return res.status(200).json({
            data: [],
            status: true,
            message: "image added successfully"
        });


    } catch (err) {

        req.files.forEach(element => {

            fs.unlinkSync(element.path);
        });

        err.status = 400;
        next(err);
    }

}

exports.remove_image = async(req, res, next)=>{

    const schema = joi.object({
        image_id: joi.number().required()
    });

    try {

        await schema.validateAsync(req.body);

        const data = await media.findOne({
            where: { id: req.body.image_id, type:'gallery' }
        });

        if (!data) throw new Error('Image not found');

        fs.unlinkSync(data.path);

        await data.destroy();

        return res.status(200).json({
            data: [],
            status: true,
            message: "Gallery image remove successfully"
        });

    } catch (err) {
        err.status = 400;
        next(err);
    }


}

exports.gallery_with_cat = async (req, res, next) => {

    try {
     
        const data = await category.findAll({
            where: { type: 'gallery' },
            include: [
                {
                    model: media,
                    where:{type:'gallery'},
                    required: false,
                    limit: 5
                }
            ]
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "Gallery image with category"
        });


    } catch (err) {
        err.status = 400;
        next(err);
    }

}

exports.edit_user_profile = async (req, res, next) => {

    const schema = joi.object({
        first_name : joi.string().required(),
        last_name: joi.string().required(),
        email: joi.string().required().email(),
        phone: joi.string().required(),
        insta: joi.string().required(),
        fb: joi.string().required(),
        youtube: joi.string().required(),
        address: joi.string().required()
    });

    try {
        
        await schema.validateAsync(req.body);

        const data = await user.findByPk(req.user_id);

        data.first_name = req.body.first_name;
        data.last_name = req.body.last_name;
        data.email = req.body.email;
        data.phone = req.body.phone;

        if(req.file)
        {
            if(data.image)
            {
                fs.unlinkSync(data.image);
            }

            data.image = req.file.path;
        }

        await data.save();

        const profile = await user_profile.findByPk(req.user_id);

        profile.insta = req.body.insta;
        profile.fb = req.body.fb;
        profile.address = req.body.address;
        profile.youtube = req.body.youtube;

        await profile.save();

        return res.status(200).json({
            data: [],
            status: true,
            message: "User profile updated successfully"
        });


    } catch (err) {

        if (req.file) fs.unlinkSync(req.file.path);

        err.status = 400;
        next(err);
    }

}

exports.edit_banner = async (req, res, next) => {


    try {

        if (!req.file) throw new Error('Please select image');

        const data = await media.findOne({ where: { type: 'banner' } });
        
        fs.unlinkSync(data.path);
        
        data.path = req.file.path;
        data.save();

        return res.status(200).json({
            data: [],
            status: true,
            message: "Banner Updated"
        });

    } catch (err) {
        if (req.file) fs.unlinkSync(req.file.path);

        err.status = 400;
        next(err);
    }

}

exports.get_banner = async (req, res, next) => {

    try {

        const data = await media.findAll({
            where: { type: 'banner' }
        });

        return res.status(200).json({
            data: data,
            status: true,
            message: "Banner list"
        });
    }
    catch (err) {
        err.status = 400;
        next(err);
    }

}

