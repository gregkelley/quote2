import express from "express";
import Quote from '../models/quote.js';
const router = express.Router();


router.get('/', async (req, res) => {
  // res.send('Hello muh Bitches');
  let quotes;
  let selQuote;

  try {
    // get all the quotes. probably not efficient, will need to come up with 
    // something better. Maybe get all quotes when all loads and then just
    // pick from them
    // Math.floor(Math.random() * max);
    quotes = await Quote.find().limit(10).exec();
    const rando = Math.floor(Math.random() * quotes.length);

    // console.log('num quotes ', quotes.length)
    // console.log(quotes[rando].quote);
    selQuote = quotes[rando].quote;
    // console.log(quotes);

  } catch {
    // problem
    selQuote = "Error gettin quote for you."
  }
  res.render('index', {selQuote});  // render the index.ejs file from views folder
});

export default router;
