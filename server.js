//bring in express and body parser
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

//set up body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('public'))

//bring in the routes file
const shops = require('./routes/shops');
const donuts = require('./routes/donuts');

//bring in static files

app.get('/', (req, res) => {
  res.render('../views/index.ejs')
});

app.use('/shops', shops);
app.use('/donuts', donuts)

//listen on the port
app.listen(PORT);

module.exports = app;
