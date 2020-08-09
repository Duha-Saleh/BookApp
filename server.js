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


//put new.ejs content when localhost:3000/search/new
app.get('/search/new',(req,res)=>{
    res.render('./pages/searches/new.ejs')
});

//put the content from API (https://developers.google.com/books/docs/v1/using ) 
//by choosing from them using constructor when localhost:3000/searches

server.post('/searches',(req,res)=>{
  var  url = `https://www.googleapis.com/books/v1/volumes?q=${searchKey}+intitle`;
});

function Book(data) {
    this.bookImage = data.volumeInfo.imageLinks.thumbnail || data.volumeInfo.imageLinks.large || "https://i.imgur.com/J5LVHEL.jpg" ;
    this.bookName = data.volumeInfo.title,
    this.bookAuthor = data.volumeInfo.authors,
    this.bookDesc = data.volumeInfo.description
};
//index.ejs is the home when localhost:3000
server.get('/',(req,res)=>{
    res.render('./pages/index.ejs');
});

// app.get('/hello',(req,res)=>{
//     res.render('./pages/index');
// });
app.get('*',(req,res)=>{
    res.render('./pages/error')
});

app.listen(PORT,() =>{
    console.log(`listening to port : ${PORT}`);
    });