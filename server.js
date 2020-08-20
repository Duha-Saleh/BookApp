'use strict';

const express = require('express');
const cors = require('cors');
require('dotenv').config();
const superagent = require('superagent');

const app = express();
app.use(cors());
const PORT = process.env.PORT || 3000;

//
app.use(express.static('./public'));
app.use(express.urlencoded({extended: true}));
//to make cutting for the paths (no.ejs)
app.set('view engine','ejs');
app.use(express.json());
app.use(express.static('./public'));

//for the css

//put new.ejs content when localhost:3000/search/new
app.get('/search/new',(req,res)=>{
    res.render('./pages/searches/new.ejs')
});

//put the content from API (https://developers.google.com/books/docs/v1/using ) 
//by choosing from them using constructor when localhost:3000/search/new we see the what is inside new.ejs اللي فيها الفورم 
//وبس أختار في السيرش والتايتل او الاوثر بتطلع 
//lacalhost:3000/searches اللي فيها
// الconstructorالمحتويات تاعت  مرتبة
app.get('/search/new',(req,res)=>{
    res.render('./pages/searches/new');
});

app.post('/searches', function (req, res) {  
    //requests from the body from new.ejs about name = ..... 
    let bookSearch = req.body.bookSearch;
    let searchType = req.body.searchType;
    let maxresults = 10;
  
    let url = `https://www.googleapis.com/books/v1/volumes?q=in${bookSearch}:${searchType}&maxResults=${maxresults}`;
    
    
    superagent.get(url)
    .then(data => {
        //becuase it's array
    let x = data.body.items.map(element => {
        return new Book(element);
      })
      res.render('./pages/searches/show', {arraybooks: x});
    })
  });


function Book(data) {
    this.bookImage = data.volumeInfo.imageLinks.thumbnail || "https://i.imgur.com/J5LVHEL.jpg" ;
    this.bookName = data.volumeInfo.title || 'N/A';
    this.bookAuthor = data.volumeInfo.authors || 'N/A'; 
    this.bookDesc = data.volumeInfo.description || 'N/A';
};
//index.ejs is the home when localhost:3000

// app.get('/hello',(req,res)=>{
//     res.render('./pages/index');
// });


app.get('/',(req,res)=>{ res.render('./pages/index.ejs');});

 app.get('*', (req, res) => res.status(404).render('./pages/error'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));
