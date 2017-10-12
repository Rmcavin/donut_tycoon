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

  //receive a page to add a new donut record
  it('should show a page for adding a new donut', (done) => {
    request.get('/donuts/new')
    .expect(200)
    .end( (err,res) => {
      expect(res.text).to.contain('new donut')
      done()
    })
  })

  //add a new donut record, then redirect to donuts page to show update
  it('should add a new donut record', (done) => {
    let newDonut = {name: 'blueberry filled', topping: 'none', price: 200}
    request.post('/donuts')
    .send(newDonut)
    .end( (err, res) => {
      request.get('/donuts')
      .expect(200)
      .end( (err,res) => {
        expect(res.text).to.contain('All Available Donuts');
        expect(res.text).to.not.contain('blueberry filled')
        done()
      })
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
      let updateDonut = {name: 'raspberry filled', topping: 'none', price: 200}
      request.patch('/donuts/2')
      .send(updateDonut)
      .end( (err, res) => {
        request.get('/donuts')
        .expect(200)
        .end( (err, res) => {
          expect(res.text).to.contain('All Available Donuts');
          expect(res.text).to.contain('raspberry filled')
          done()
        })
      })
    })

//delete a donut record, then redirect to donuts page to see update
  it('should delete a donut record', (done) => {
    request.delete('/donuts/2')
    .end( (err, res) => {
      request.get('/donuts')
      .expect(200)
      .end( (err, res) => {
        expect(res.text).to.contain('All Available Donuts');
        expect(res.text).to.not.contain('raspberry filled')
        done()
      })
    })
  })

})
