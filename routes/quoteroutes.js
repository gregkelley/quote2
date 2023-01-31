import express from 'express';
import Quote from '../models/quote.js';

const router = express.Router();

// get all authors
router.get('/', async (req, res) => {
  // set up search options
  let searchOptions = {};
  // if (req.query.name != null && req.query.name !== '') {
  //   searchOptions.name = new RegExp(req.query.name, 'i');
  // }
  try {
    // find({where conditions here}) see mongoose docs
    const quotes = await Quote.find(searchOptions); // get all
    res.render('quotes/index', { 
      quotes: quotes, 
      // searchOptions: req.query 
    });
  } catch {
    res.redirect('/');
  }

  // temporary
  // res.send('Hello muh Bitches');
});

// get new quotes
router.get('/new', (req, res) => {
  res.render('quotes/new', { quote: new Quote() });
});

// create a new quote
router.post('/', async (req, res) => {
  // res.send('Create a quote you did');
  // res.send(`${req.body.contributor} created  ${req.body.quote}`);
  const quote = new Quote({
    quote: req.body.quote,
    name: req.body.contributor,
  });

  try {
    const newQuote = await quote.save();
    // res.redirect(`quotes/${newQuote.id}`)
      res.redirect(`quotes`);
  } catch {
    res.render('quotes/new', {
      quote: quote,
      errorMessage: 'Error creating quote',
    });
  }
});

export default router;
