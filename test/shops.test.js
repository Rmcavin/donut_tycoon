//bring in server, give supertest access to making requests,
//bring in chai, and bring in seeds to enable running seeds
const server = require('../server');
const request = require('supertest')(server)
const expect = require('Chai').expect;
const seeds = require('../seeds/addShops')

//bring in knex with config variables
var knexConfig = require('../knexfile.js')["test"];
var knex = require('knex')(knexConfig);

//test to ensure the home page is received
describe('Home Page', () => {
  //receive the home page

  it('should return the home page', (done) => {
    request.get('/')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('donut')
      done()
    })
  })
})
//test to ensure the shops pages are received
 describe('Shops Page', () => {

  //receive all the shops
  it('should return a page with all the shops', (done) => {
    request.get('/shops')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('shops');
      done()
    })
  })

  //receive a particular shop by id
  it('should return a page with a single shop', (done) => {
    request.get('./shops/1')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('one shop')
      done()
    })
  })

  //receive a page to edit a shop (by id)
  it('should return a page for editing a shop', (done) => {
    request.get('./shops/1/edit')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('edit');
      done()
    })
  })

  //send an update for a particular shop
  it('should update a page for a shop', (done) => {
      //write this test!
    })
  })
})
