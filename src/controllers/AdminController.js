const menu = require('../models/Menu_barModel');

exports.all_menu = async(req,res, next) => {

    try {

        const data = await menu.findAll({
            where: { is_parent:0},
            order: [
                ['id', 'ASC']
            ],
            include: ['sub_menu']
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

