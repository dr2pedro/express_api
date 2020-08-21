const request = require('supertest')
const app = require('../src/app')
const bodyParser = require ('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

/* describe('app', () => {
  it('Test GET all', (done) => {
    request(app)
      .get('/')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        console.log(res.body)
        done()
      })
  })
}) */

var user = {"username":"dr2p","email":"dr2p@hotmail.com","password": "201608062783"}
var token = null

describe('app', () => {
  it('Test signup method', (done) => {
    request (app)
      .post('/user/signup')
      .send(user)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        token = res.body.token
        console.log(res.body)
        done()
      })
  })
})

describe('app', () => {
  it('Test signin method', (done) => {
    request (app)
      .post('/user/signin')
      .send(user)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        user = res.body
        console.log(user)
        done()
      })
  })
})

describe('app', () => {
  it('Test GET one', (done) => {
    request(app)
      .get('/manifest/'+ user._id)
      .set('Authorization', 'Bearer '+ token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        console.log(res.body)
        done()
      })
  })
})

/*
var user2 = JSON.stringify(user)
var user2 = JSON.parse(user2)
user2.last_access = [new Date]

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
        console.log(res.body)
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
        console.log('user deleted!')
        done()
      })
  })
})
 */