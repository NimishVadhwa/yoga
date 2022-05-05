const express = require('express');
const route = express.Router();
const auth = require('./middleware/auth');

const AuthController = require('./controllers/AuthController');
const TrainerController = require('./controllers/TrainerController');
const CategoryController = require('./controllers/CategoryController');

//auth 
route.post('/auth/login', AuthController.login);
route.post('/auth/register_user', AuthController.register_user);
route.post('/auth/forget-password', AuthController.forget_password);
route.post('/auth/change-password', AuthController.change_password);
route.get('/auth/logout',auth, AuthController.logout);

//User detail
route.get('/auth/detail',auth, AuthController.user_detail);

//Trainer
route.get('/trainer/all-list', TrainerController.trainer_list);

//Category
route.post('/cat/all-cat', CategoryController.all_categories);
route.post('/cat/add-cat',auth, CategoryController.add_category);
route.post('/cat/block-cat', auth, CategoryController.block_category);


//Admin 
route.post('/auth/admin-login', AuthController.admin_login);

module.exports = route;
 