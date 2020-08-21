const request = require('supertest')
const app = require('../src/app')
const bodyParser = require ('body-parser')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))


var user = {"username":"dr2p","email":"dr2p@hotmail.com","password": "201608062783"}
var token = {}
var id = {}

// tem que continuar a testar os erros quando tiver tempo...

// erro de signin, usuário não encontrado.
describe('app', () => {
  it('Test signin error user not found', (done) => {
    request (app)
      .post('/user/signin')
      .send(user)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        console.log(res.body)
        done()
      })
  })
})

// signup método, tem que estar com o database limpo.
describe('app', () => {
  it('Test signup method', (done) => {
    request (app)
      .post('/user/signup')
      .send(user)
      .expect(200)
      .expect('Content-Type', /json/)
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

// erro de signup, usuário já existe.
describe('app', () => {
  it('Test signup error user already exist', (done) => {
    request (app)
      .post('/user/signup')
      .send(user)
      .expect(400)
      .expect('Content-Type', /json/)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        console.log(res.body)
        done()
      })
  })
})

// signin método.
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
        token = res.body.token
        return ({token}, done())
      })
  })
})

//POST one
describe('app', () => {
  it('Test POST one', (done) => {
    request(app)
      .post('/manifest')
      .set('Authorization', 'Bearer ' + token)
      .expect('Content-Type', /json/)
      .expect(200)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        id = res.body._id
        return ({id}, done())
      })
  })
})

// GET all
describe('app', () => {
  it('Test GET all', (done) => {
    request(app)
      .get('/manifest')
      .set('Authorization', 'Bearer ' + token)
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

// GET ONE
describe('app', () => {
  it('Test GET one', (done) => {
    request(app)
      .get('/manifest/'+ id)
      .set('Authorization', 'Bearer ' + token)
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

// test error GET one
describe('app', () => {
  it('Test GET one error not valid token ', (done) => {
    request(app)
      .get('/manifest/'+ 'aaaaaaaaaaaaaaaa')
      .set('Authorization', 'Bearer ' + token)
      .expect(500)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        console.log(res.body)
        done()
      })
  })
})

// test error 2 GET one 
describe('app', () => {
  it('Test GET one error not found ', (done) => {
    request(app)
      .get('/manifest/'+ '5f3f2d9ec788b127a0fee45c')
      .set('Authorization', 'Bearer ' + token)
      .expect(404)
      .end(function(err, res){
        if(err){
          return done(err)
        }
        console.log(res.body)
        done()
      })
  })
})

//POST new order
describe('app', () => {
  it('Test POST a new order', (done) => {
    request(app)
      .post('/manifest/new_order/' + id)
      .set('Authorization', 'Bearer ' + token)
      .send({})
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

//UPDATE an order
describe('app', () => {
  it('Test UPDATE an order', (done) => {
    request(app)
      .put('/manifest/2/' + id)
      .set('Authorization', 'Bearer ' + token)
      .send({"last_access": ["2020-08-21T02:11:51.623Z"]})
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

// DELETE an order
describe('app', () => {
  it('Test DELETE an order', (done) => {
    request(app)
      .delete('/manifest/2/'+ id)
      .set('Authorization', 'Bearer ' + token)
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

// DELETE a manifest
describe('app', () => {
  it('Test DELETE a manifest', (done) => {
    request(app)
      .delete('/manifest/'+ id)
      .set('Authorization', 'Bearer ' + token)
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
