const express = require('express');
const app = express();
const db = require('./src/database');
require('dotenv').config()
const port = process.env.PORT || 7000;
const cors = require('cors');
const route = require('./src/routes'); 
const { send_msg } = require('./src/helper');

app.use(express.json());
app.use(cors());
app.use("/public/images", express.static("public/images"));

app.use('/api',route);

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS,GET,POST');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Accept');
    next();
})

//error handling
app.use((err, req, res, next) => {
    res.status(err.status || 500).json({ status: false, message: err.message });
});

db
    .sync()
    .then((result) => {
        const server = app.listen(port);

        const io = require('socket.io')(server, { cors: { origin: "*" } });

        io.on('connection', (socket) => {
            console.log('=============socket call');

            // socket.broadcast.emit('connectionss','asdf');
            // socket.broadcast.emit('connection1','asdf1');


            socket.on('send-single-msg', (sender,receiver,msg,msg_type) => {
                console.log('send====', sender, '====from', receiver,'====msg',msg);
                send_msg(sender,receiver,msg,msg_type,'single');
            });

            socket.on('send-group-msg', (sender,receiver, group, msg,msg_type) => {
                console.log('send====', sender, '====from', group, '====msg', msg);
                send_msg(sender, receiver, msg, msg_type, 'group');

            });
            
            socket.broadcast.emit('receive-msg', data);

        });

        console.log('Db connected===',port);
    }).catch((err) => {
        console.log('db not connected');
        console.log(err);
    });

