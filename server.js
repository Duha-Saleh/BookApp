'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const agent = require('superagent');

const server = express();
server.use(cors());
const PORT = process.env.PORT || 3000;

//
server.use(express.static('./public'));
server.use(express.urlencoded({extended: true}));
server.set('view engine','ejs');



server.get('/hello',(req,res)=>{
    res.render('./pages/index');
});
server.get('*',(req,res)=>{
    res.render('./pages/error')
});

server.listen(PORT,() =>{
    console.log(`listening to port : ${PORT}`);
    });