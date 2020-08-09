'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const agent = require('superagent');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

//
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
app.set('view engine','ejs');

app.get('/search/new',(req,res)=>{
    res.render('./pages/searches/new.ejs')
});


app.get('/hello',(req,res)=>{
    res.render('./pages/index');
});
app.get('*',(req,res)=>{
    res.render('./pages/error')
});

app.listen(PORT,() =>{
    console.log(`listening to port : ${PORT}`);
    });