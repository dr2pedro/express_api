const request = require('supertest')
const app = require('../src/app')



describe('app', () => {
  it('Test GET all', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

var user = {"username":"dr2p","email":"dr2p@hotmail.com","created_at":"2020-08-04T22:52:33.619Z","last_access":["2020-08-04T22:52:33.619Z"]}

describe('app', () => {
  it('Test POST method for /', (done) => {
    request (app)
      .post('/')
      .send(user)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        user = res.body
        done()
      })
  })
})

describe('app', () => {
  it('Test GET one', (done) => {
    request(app)
      .get('/'+ user._id)
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done)
  })
})

var user2 = {"username":"dr2p","email":"pedoidin@gmail.com","created_at":"2020-08-04T22:52:33.619Z","last_access":["2020-08-04T22:52:33.619Z"]}

describe('app', () => {
  it('Test PUT one', (done) => {
    request(app)
      .put('/'+ user._id)
      .send(user2)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        done()
      })
  })
})

describe('app', () => {
  it('Test DELETE all', (done) => {
    request(app)
      .delete('/'+ user._id)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        done()
      })
  })
})
