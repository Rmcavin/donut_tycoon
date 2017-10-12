//bring in express routing and knex for db access
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

//get all the donuts
router.get('/', (req, res, next) => {
  knex('donuts').select('*').then( (donuts) => {
    //format price correctly
    donuts.forEach( (donut) => {
      donut = priceCheck(donut);
    })
    res.render('../views/Donuts/index.ejs', {donuts:donuts});
  }).catch( (err) => {
    next(err);
  });
})

//get a page to create a new donut
router.get('/new', (req, res, next) => {
  res.render('../views/Donuts/new.ejs')
})

//create a new donut, then redirect to all donuts to see update
router.post('/', (req, res, next) => {
  knex('donuts').insert(req.body).then( () => {
    res.redirect('/donuts')
  }).catch( (err) => {
    next(err);
  });
})

//get a donut by id
router.get('/:id', (req, res, next) => {
  //get a particular donut
  knex('donuts').select('*').where({id:req.params.id}).first().then( (donut) => {
    donut = priceCheck(donut);
    shopsWithDonut(donut.id)
    .then(function (shops) {
      //console.log('donuts: ', availDonuts);
      res.render('../views/Donuts/show.ejs', {donut:donut, shops:shops})
    })
    }).catch( (err) => {
      console.error('the error is', err)
      next(err);
  })
});


//get a page to edit/update a particular donut with a form
router.get('/:id/edit', (req, res, next) => {
  knex('donuts').select('*').where({id:req.params.id}).first().then( (donut) => {
    res.render('../views/Donuts/edit.ejs', {donut: donut})
  }).catch( (err) => {
    next(err);
  });
});

//update an existing donut, then redirect to all donuts to see update
router.patch('/:id', (req, res, next) => {
  knex('donuts').where({id:req.params.id}).update(req.body).then( () => {
    res.redirect('/donuts')
  }).catch( (err) => {
    next(err);
  });
});

//delete an existing donut, then redirect to all donuts to see update
router.delete('/:id', (req, res, next) => {
  knex('donuts').where({id:req.params.id}).del().then( () => {
    res.redirect('/donuts');
  }).catch( (err) => {
    next(err);
  });
});

module.exports = router;

//===================Helpers=====================
function shopsWithDonut(donutID) {
  return knex('donuts').select('donuts.name', 'shops.name', 'shops.id').where('donuts.id', donutID)
  .innerJoin('shops_donuts', 'donut_id', 'donuts.id')
  .innerJoin('shops', 'shop_id', 'shops.id')
  .then( (shopDonuts) => {
    return shopDonuts;
  })
}

function priceCheck(product) {
  product.price = (product.price / 100);
  if (Number.isInteger(product.price)) {
    product.price = (product.price) + '.00';
  }
  if (product.price.toString().length == 3) {
    product.price = (product.price) + '0';
  }
  return product;
}
