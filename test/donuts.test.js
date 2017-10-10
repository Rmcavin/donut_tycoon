//bring in server, give supertest access to making requests,
//bring in chai, and bring in seeds to enable running seeds
const server = require('../server');
const request = require('supertest')(server)
const expect = require('Chai').expect;

//bring in knex with config variables
var knexConfig = require('../knexfile.js')["test"];
var knex = require('knex')(knexConfig);

const donutRecords = [
  {name: 'cherry icing', topping: 'none', price: 100},
  {name: 'cherry icing', topping: 'sprinkles', price: 125},
  {name: 'blueberry cake', topping: 'none', price: 150}
]

//test to ensure the donuts pages are received
 describe('Donuts Pages', () => {
   let donuts;
   //populate the database
     before( (done) => {
       knex('donuts').del()
       .then( ()=> {
         knex('donuts')
         .insert(donutRecords)
         .returning('*')
         .then( (records) => {
           donuts = records;
           console.log(donuts[0].id);
           done()
         })
       })
     })

  //receive all the donuts
  it('should return a page with all the donuts', (done) => {
    request.get('/donuts')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('All Available Donuts');
      done()
    })
  })

  //receive a particular donuts by id
  it('should return a page with a single donut', (done) => {
    request.get('/donuts/1')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('Topping:')
      done()
    })
  })

  //receive a page to edit a donut (by id)
  it('should return a page for editing a donut', (done) => {
    request.get('/donuts/1/edit')
    .expect(200)
    .end( (err, res) => {
      expect(res.text).to.contain('Edit a Donut');
      done()
    })
  })

  //send an update for a particular donut
  it('should update a page for a donut', (done) => {
      //write this test!
    })

})
