//bring in express and body parser
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

//set up body parser
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//bring in the routes file
const shops = require('./routes/shops');

//bring in static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  res.render('../views/index.ejs')
});

app.get('/shops', shops);

//listen on the port
app.listen(PORT);

module.exports = app;
