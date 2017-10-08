//bring in express routing and knex for db access
const express = require('express');
const router = express.Router();
const knex = require('../db/knex');

router.get('/shops', (req, res) => {
  res.send('all the shops')
})

module.exports = router;
