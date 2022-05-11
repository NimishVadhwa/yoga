const express = require('express');
const route = express.Router();
const auth = require('./middleware/auth');
const multer = require('multer');

const AuthController = require('./controllers/AuthController');
const TrainerController = require('./controllers/TrainerController');
const CategoryController = require('./controllers/CategoryController');
const FormController = require('./controllers/FormController');
const AdminController = require('./controllers/AdminController');
const PlanController = require('./controllers/PlanController');
const ChatController = require('./controllers/ChatController');
const testimonialController = require('./controllers/TestimonialController');
const ProductController = require('./controllers/ProductController');

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/plan');
    },
    filename: function (req, file, cb) {
        cb(null, Math.random() + file.originalname);
    }
});

let storage_chat = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/chat');
    },
    filename: function (req, file, cb) {
        cb(null, Math.random() + file.originalname);
    }
});

let storage_testimonial = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/testimonials');
    },
    filename: function (req, file, cb) {
        cb(null, Math.random() + file.originalname);
    }
});

let storage_product = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './public/images/product');
    },
    filename: function (req, file, cb) {
        cb(null, Math.random() + file.originalname);
    }
});

let imageFilter = function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
};

let upload = multer({
    storage: storage,
    limits: { fileSize: 5*1024 * 1024 }, // 5 mb size
    fileFilter: imageFilter
});

let upload_chat = multer({
    storage: storage_chat,
    limits: { fileSize: 10 * 1024 * 1024 } // 10 mb size
});

let upload_testimonal = multer({
    storage: storage_testimonial,
    fileFilter: imageFilter,
    limits: { fileSize: 2 * 1024 * 1024 } // 2 mb size
});

let upload_product = multer({
    fileFilter: imageFilter,
    limits: { fileSize: 10 * 1024 * 1024, files: 10 }, // 10 mb size
    storage: storage_product
});


//auth 
route.post('/auth/login', AuthController.login);
route.post('/auth/register_user', AuthController.register_user);
route.post('/auth/forget-password', AuthController.forget_password);
route.post('/auth/change-password', AuthController.change_password);
route.get('/auth/logout',auth, AuthController.logout);

route.post('/auth/admin-login', AuthController.admin_login); // Admin auth 

route.get('/menu/menu-bar', auth, AdminController.all_menu); //Menu bar

route.get('/auth/detail', auth, AuthController.user_detail); // User detail

//Trainer
// route.get('/trainer/all-list', TrainerController.trainer_list);

//Category
route.post('/cat/all-cat', CategoryController.all_categories);
route.post('/cat/add-cat',auth, CategoryController.add_category);
route.post('/cat/block-cat', auth, CategoryController.block_category);
route.get('/cat/cat_plan', CategoryController.cat_plan);
route.post('/cat/edit-cat', CategoryController.edit_category);


//Plan
route.post('/plan/add-plan', upload.single('image'), PlanController.add_plan);
route.post('/plan/edit-plan', upload.single('image'), PlanController.edit_plan);
route.post('/plan/cat_with_plan/:id', PlanController.cat_with_plan);
route.get('/plan/plan-detail/:id', PlanController.plan_detail);
route.get('/plan/all-plans', PlanController.all_plans);
route.post('/plan/block-plans', PlanController.block_plan);

//Testimonials
route.get('/testimonial/all-list', testimonialController.all_list);
route.post('/testimonial/add-testimonial', upload_testimonal.single('image'), testimonialController.add_testimonial);
route.post('/testimonial/edit-testimonial', upload_testimonal.single('image'), testimonialController.edit_testimonial);
route.post('/testimonial/block-testimonial', testimonialController.block_testimonial);


//Products
route.get('/product/all-products', ProductController.all_products);
route.post('/product/add-product', upload_product.array('image',10), ProductController.add_product);


//Form
route.post('/form/add-form-field', auth, FormController.add_form_column);

//Group 
route.post('/group/create-group',auth, upload_chat.single('image'), ChatController.create_group);
route.post('/group/edit-group', auth, upload_chat.single('image'), ChatController.edit_group);
route.post('/group/add-group-user',auth, ChatController.add_group_user);
route.post('/group/edit-group-user', auth, ChatController.edit_group_user);
route.post('/group/group-user-list', auth, ChatController.group_user_list);




module.exports = route;
 