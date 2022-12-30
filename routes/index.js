import express from "express";
const router = express.Router();


router.get('/', (req, res) => {
  // res.send('Hello muh Bitches');
  res.render('index');  // render the index.ejs file from views folder
});

export default router;
