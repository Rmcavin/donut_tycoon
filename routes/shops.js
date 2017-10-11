//bring in express routing and knex for db access
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

//get all the shops
router.get('/', (req, res) => {
  knex('shops').select('*').then( (shops) => {
    res.render('../views/Shops/index.ejs',{ shops:shops})
  })
})

//get a page to create a new shop
router.get('/new', (req, res) => {
  res.render('../views/shops/NOTCREATEDYET')
})

//create a new shop, then redirect to all shops to see update
router.post('/shops', (req, res) => {
  knex('shops').insert(req.body).then( () => {
    res.redirect('/shops');
  })
})

//get one shop
router.get('/:id', (req, res) => {
  //get a particular donut
  knex('shops').select('*').where({id:req.params.id}).first().then( (shop) => {
    res.render('../views/Shops/show.ejs', {shop:shop})
  })
})

//get a page to edit/update a particular shop with a form
router.get('/:id/edit', (req, res) => {
  knex('shops').select('*').where({id:req.params.id}).first().then( (shop) => {
    res.render('../views/Shops/edit.ejs', {shop:shop})
  })
})

//update an existing shop, then redirect to all shops to see update
router.patch('/:id', (req, res) => {
  knex('shops').where({id:req.params.id}).update(req.body).then(() => {
    res.redirect('/shops');
  })
})

//delete an existing shop, then redirect to all shops to see update
router.delete('/:id', (req,res) => {
  knex('shops').where({id:req.params.id}).del().then( () => {
    res.redirect('/shops');
  })
})

module.exports = router;
