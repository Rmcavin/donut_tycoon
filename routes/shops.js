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

//get one shop
router.get('/:id', (req, res) => {
  //get a particular donut
  knex('shops').select('*').where({id:req.params.id}).first().then( (shop) => {
    res.render('../views/Shops/show.ejs', {shop:shop})
  })
})

//get a page to edit/update a particular shop with a form
router.get('/:id/edit', (req, res) => {
  res.send(`you are editing ${req.params.id}`)
})

//update an existing shop, then redirect to all shops to see update

//delete an existing shop, then redirect to all shops to see update

//get a page to create a new shop

//create a new shop, then redirect to all shops to see update

module.exports = router;
