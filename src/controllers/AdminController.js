const menu = require('../models/Menu_barModel');
const media = require('../models/MediaModel');
const { Op } = require("sequelize");

exports.all_menu = async(req,res, next) => {

    try {

        const data = await menu.findAll({
            where: { is_parent:0},
            order: [
                ['id', 'ASC']
            ],
            include: [{
                model:menu,
                as:'sub_menu', 
                required:false,
                where:{
                    id: {
                        [Op.ne]: '9' 
                    }
                }    
            }]
        });

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

