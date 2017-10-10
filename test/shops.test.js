//bring in server, give supertest access to making requests,
//bring in chai, and bring in seeds to enable running seeds
const server = require('../server');
const request = require('supertest')(server)
const expect = require('Chai').expect;

//bring in knex with config variables
var knexConfig = require('../knexfile.js')["test"];
var knex = require('knex')(knexConfig);

const shopRecords = [
  {name: 'Donut Tycoon', city: 'Austin'},
  {name: 'Donut Tycoon', city: 'San Marcos'},
  {name: 'Donut Tycoon', city: 'Round Rock'}
]

//test to ensure the shops pages are received
 describe('Shops Pages', () => {
   let shops;
   //populate the database
     before( (done) => {
       knex('shops').del()
       .then( ()=> {
         knex('shops')
         .insert(shopRecords)
         .returning('*')
         .then( (records) => {
           shops = records;
           done()
         })
       })
     })

  //receive all the shops
  it('should return a page with all the shops', (done) => {
    request.get('/shops')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('All Shop Locations');
      done()
    })
  })

  //receive a particular shop by id
  it('should return a page with a single shop', (done) => {
    request.get('/shops/1')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('Location:')
      done()
    })
  })

  //receive a page to edit a shop (by id)
  it('should return a page for editing a shop', (done) => {
    request.get('/shops/1/edit')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('Edit a Shop');
      done()
    })
  })

  //send an update for a particular shop
  it('should update a page for a shop', (done) => {
      //write this test!
    })

})
