//bring in express and body parser
const express = require('express');
const app = express();
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8080;

//set up body parser, methodoverride, and public directory
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(methodOverride('_method'))
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

app.use(function (err, req, res, next) {
  if (err) {
    console.error(err.stack)
    res.status(500).send('Something broke! <br /> ' + err)
  }
})


//listen on the port
app.listen(PORT);

module.exports = app;
