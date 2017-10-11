//bring in express routing and knex for db access
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

//get all the donuts
router.get('/', (req, res) => {
  knex('donuts').select('*').then( (donuts) => {
    //format price correctly
    donuts.forEach( (donut) => {
      donut.price = (donut.price / 100);
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

//get a page to create a new donut
router.get('/new', (req, res) => {
  res.send('new donut')
})

//create a new donut, then redirect to all donuts to see update
router.post('/donuts', (req, res) => {
  knex('donuts').insert(req.body).then( () => {
    res.redirect('/shops')
  })
})

//get a donut by id
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

//get a page to edit/update a particular donut with a form
router.get('/:id/edit', (req, res) => {
  knex('donuts').select('*').where({id:req.params.id}).first().then( (donut) => {
    res.render('../views/Donuts/edit.ejs', {donut: donut})
  })
})

//update an existing donut, then redirect to all donuts to see update
router.patch('/:id', (req, res) => {
  knex('donuts').where({id:req.params.id}).update(req.body).then( () => {
    res.redirect('/donuts')
  })
})

//delete an existing donut, then redirect to all donuts to see update
router.delete('/:id', (req,res) => {
  knex('donuts').where({id:req.params.id}).del().then( () => {
    res.redirect('/donuts');
  })
})
module.exports = router;
