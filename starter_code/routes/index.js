const express = require('express');
const router  = express.Router();
const Movie = require('../models/movie');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/movies', (req, res, next) => {
  let qsPage = req.query.page || 1;
  let prevPage = Number(qsPage) - 1;
  let nextPage = Number(qsPage) + 1;

  let qFilter = (req.query.q) ? {'title': new RegExp(`^${req.query.q}`, 'i')} : {};
 
  Movie.find(qFilter, null, {skip: (qsPage - 1) * 2, limit: 2})
  .then(movies => res.render('movies', {movies, prevPage, nextPage, q: req.query.q}))
    // if (movies.length > 1) {
    //   res.render('movies', {movies, prevPage, nextPage, q: req.query.q})
    // } else if (movies.length === 1) {
    //   let isUnique = true;
    //   let movie = movies[0];
    //   res.render('movie', {movie, isUnique});
    // } else {
    //   res.send(`no results`);
    // }
  // })
  .catch(err => res.status(500).send(err));
});

// router.post('/movies', (req, res, next) => {
//   console.log(`request body --> ${req.body.q}`);
//   let qInput = new RegExp(`^${req.body.q}`, 'i');

//   Movie.find({'title': qInput})
//   .then(movies => {
//     if (movies.length > 1) {
//       res.render('movies', {movies})
//     } else if (movies.length === 1) {
//       let movie = movies[0];
//       res.render('movie', {movie});
//     } else {
//       res.send(`no results`);
//     }
//   })
//   .catch(err => res.status(500).send(err));
// });


router.get('/movie/:movieId', (req, res, next) => {
  Movie.findById(req.params.movieId)
  .then(movie => res.render('movie', {movie}))
  .catch(err => res.status(500).send(err));
});

module.exports = router;
