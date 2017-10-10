//bring in express routing and knex for db access
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/', (req, res) => {
  //get the donuts
  knex('donuts').select('*').then( (donuts) => {
    donuts.forEach( (donut) => {
      donut.price = (donut.price / 100);
      //donut.price = donut.price.toString();
      if (Number.isInteger(donut.price)) {
        donut.price = (donut.price) + '.00';
      }
      if (donut.price.toString().length == 3) {
        donut.price = (donut.price) + '0';
      }
    })
    res.render('../views/Donuts/index.ejs', {donuts:donuts});
  })
})

router.get('/:id', (req, res) => {
  //get a particular donut
  knex('donuts').select('*').where({id:req.params.id}).first().then( (donut) => {
    donut.price = (donut.price / 100);
    if (Number.isInteger(donut.price)) {
      donut.price = (donut.price) + '.00';
    }
    if (donut.price.toString().length == 3) {
      donut.price = (donut.price) + '0';
    }
    res.render('../views/Donuts/show.ejs', {donut:donut});
  })
})

router.get('/:id/edit', (req, res) => {
  knex('donuts').select('*').where({id:req.params.id}).first().then( (donut) => {
    res.render('../views/Donuts/edit.ejs', {donut: donut})
  })
})

module.exports = router;
