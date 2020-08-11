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




// API Routes
app.get('/', getTasks);

// app.get('/tasks/:task_id', getOneTask);

// app.get('/add', showForm);

// app.post('/add', addTask);

app.get('*', (req, res) => res.status(404).send('This route does not exist'));

app.listen(PORT, () => console.log(`Listening on port: ${PORT}`));

// HELPER FUNCTIONS

function getTasks(request, response) {
    let SQL = 'SELECT * from books;';
  
    return client.query(SQL)
      .then(result => response.render('pages/index', { results: result.rows }))
      .catch(handleError);
  }

 function handleError(error, response) {
    response.render('pages/error', { error: 'Uh Oh' });
  }

//   function getOneTask(request, response) {
//     let SQL = 'SELECT * FROM tasks WHERE id=$1;';
//     let values = [request.params.task_id];
  
//     return client.query(SQL, values)
//       .then(result => {
//         // console.log('single', result.rows[0]);
//         return response.render('pages/detail-view', { task: result.rows[0] });
//       })
//       .catch(err => handleError(err, response));
//   }
  
//   function showForm(request, response) {
//     response.render('pages/add-view');
//   }
  
//   function addTask(request, response) {
//     console.log(request.body);
//     let { title, description, category, contact, status } = request.body;
  
//     let SQL = 'INSERT INTO tasks(title, description, category, contact, status) VALUES ($1, $2, $3, $4, $5);';
//     let values = [title, description, category, contact, status];
  
//     return client.query(SQL, values)
//       .then(response.redirect('/'))
//       .catch(err => handleError(err, response));
//   }
  
