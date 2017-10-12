//bring in express routing and knex for db access
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

//get all the shops
router.get('/', (req, res, next) => {
  knex('shops').select('*').then( (shops) => {
    res.render('../views/Shops/index.ejs',{ shops:shops})
  }).catch( (err) => {
    next(err);
  });
})

//get a page to create a new shop
router.get('/new', (req, res) => {
  res.render('../views/Shops/new.ejs')
})

//create a new shop, then redirect to all shops to see update
router.post('/', (req, res, next) => {
  knex('shops').insert(req.body).then( () => {
    res.redirect('/shops');
  }).catch( (err) => {
    next(err);
  });
})

//get a shop by id
router.get('/:id', (req, res, next) => {
  //get a particular donut
  knex('shops').select('*').where({id:req.params.id}).first().then( (shop) => {
    donutsAtAShop(shop.id)
    .then(function (donuts) {
      res.render('../views/Shops/show.ejs', {shop:shop, donuts:donuts})
    });
  }).catch( (err) => {
    next(err);
  });
})

//get a page to edit/update a particular shop with a form
router.get('/:id/edit', (req, res, next) => {
  knex('shops').select('*').where({id:req.params.id}).first().then( (shop) => {
    res.render('../views/Shops/edit.ejs', {shop:shop})
  }).catch( (err) => {
    next(err);
  });
})

//update an existing shop, then redirect to all shops to see update
router.patch('/:id', (req, res, next) => {
  knex('shops').where({id:req.params.id}).update(req.body).then(() => {
    res.redirect('/shops');
  }).catch( (err) => {
    next(err);
  });
})

//delete an existing shop, then redirect to all shops to see update
router.delete('/:id', (req,res, next) => {
  knex('shops').where({id:req.params.id}).del().then( () => {
    res.redirect('/shops');
  }).catch( (err) => {
    next(err);
  });
})

module.exports = router;


//===================Helpers=====================
function donutsAtAShop(shopID) {
  return knex('shops').select('shops.name as shop_name', 'donuts.name', 'donuts.id').where('shops.id', shopID)
  .innerJoin('shops_donuts', 'shop_id', 'shops.id')
  .innerJoin('donuts', 'donut_id', 'donuts.id')
  .then( (shopDonuts) => {
    return shopDonuts;
  })
}
