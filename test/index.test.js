//bring in server, give supertest access to making requests,
//bring in chai, and bring in seeds to enable running seeds
const server = require('../server');
const request = require('supertest')(server)
const expect = require('Chai').expect;

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
