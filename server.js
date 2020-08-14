'use strict';

// const express = require('express');
// const cors = require('cors');
// require('dotenv').config();
// const superagent = require('superagent');

// const app = express();
// app.use(cors());
// const PORT = process.env.PORT || 3000;

// //
// app.use(express.static('./public'));
// app.use(express.urlencoded({extended: true}));
// app.set('view engine','ejs');





// //put new.ejs content when localhost:3000/search/new
// app.get('/search/new',(req,res)=>{
//     res.render('./pages/searches/new.ejs')
// });

// //put the content from API (https://developers.google.com/books/docs/v1/using ) 
// //by choosing from them using constructor when localhost:3000/search/new we see the what is inside new.ejs اللي فيها الفورم 
// //وبس أختار في السيرش والتايتل او الاوثر بتطلع 
// //lacalhost:3000/searches اللي فيها
// // الconstructorالمحتويات تاعت f مرتبة
// app.get('/search/new',(req,res)=>{
//     res.render('./pages/searches/new');
// });

// app.post('/searches', function (req, res) {  
//     //requests from the body from new.ejs about name = ..... 
//     let bookSearch = req.body.bookSearch;
//     let searchType = req.body.searchType;
//     let maxresults = 10;
  
//     let url = `https://www.googleapis.com/books/v1/volumes?q=in${bookSearch}:${searchType}&maxResults=${maxresults}`;
    
    
//     superagent.get(url)
//     .then(data => {
//         //becuase it's array
//     let x = data.body.items.map(element => {
//         return new Book(element);
//       })
//       res.render('./pages/searches/show', {arraybooks: x});
//     })
//   });


// function Book(data) {
//     this.bookImage = data.volumeInfo.imageLinks.thumbnail || "https://i.imgur.com/J5LVHEL.jpg" ;
//     this.bookName = data.volumeInfo.title || 'N/A';
//     this.bookAuthor = data.volumeInfo.authors || 'N/A'; 
//     this.bookDesc = data.volumeInfo.description || 'N/A';
// };
// //index.ejs is the home when localhost:3000
// app.get('/',(req,res)=>{
//     res.render('./pages/index.ejs');
// });

// // app.get('/hello',(req,res)=>{
// //     res.render('./pages/index');
// // });
// app.get('*',(req,res)=>{
//     res.render('./pages/error')
// });

// app.listen(PORT,() =>{
//     console.log(`listening to port : ${PORT}`);
//     });


//lab12

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
app.set('view engine','ejs');


//for the database setup always
const pg = require ('pg');
const client = new pg.Client(process.env.DATABASE_URL);
client.connect();
client.on('error', err => console.error(err));




/// API Routes
app.get('/', getTasks);
app.get('/searches/new', newSearch);
app.post('/searches', searchResult);
app.post('/books', addingBooks);
app.get('/books/:book_id', bookDetails);
app.get('*', (req, res) => res.status(404).send('This route does not exist'));
app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));



/// HELPER FUNCTIONS

//for localhost:3000
function getTasks(request, response) {
    let SQL = 'SELECT * from books;';
    
    //bring from index.ejs
    return client.query(SQL)
      .then(result => response.render('pages/index', { results: result.rows }))
      .catch(handleError);
  }


//to make it catch the error when I put it afer each ther
 function handleError(error, response) {
    response.render('pages/error', { error: 'Uh Oh' });
  }

//for localhost:3000s/searches/new
function newSearch(request, response){
    response.render('pages/searches/new');
};


//for localhost:3000/searches
function searchResult(req, res) {  
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
  };


  function addingBooks(request, response){
    let SQL = 'INSERT INTO books (image_url, title, author, description, isbn, bookshelf) VALUES ($1, $2, $3, $4, $5, $6);';
    let {image_url,title, author,description,isbn,bookshelf}=request.body;
    let values = [image_url,title,author,description,isbn,bookshelf];
   return client.query(SQL, values).then(() =>{
    response.redirect('/');
     })
    };

//when clicking on details
    function bookDetails(request, response){
    let SQL = 'SELECT * FROM books WHERE id=$1;';
    let value = [request.params.book_id];
  return  client.query(SQL, value).then(results =>{
        response.render('pages/book/detail', {book: results.rows[0]});
    });
};

  function Book(data) {
    this.bookImage = data.volumeInfo.imageLinks.thumbnail || "https://i.imgur.com/J5LVHEL.jpg" ;
    this.bookName = data.volumeInfo.title || 'N/A';
    this.bookAuthor = data.volumeInfo.authors || 'N/A'; 
    this.bookDesc = data.volumeInfo.description || 'N/A';
};


//


//sudu
//psql 
//\l
//\c
//\d

