const request = require('supertest')
const bodyParser = require('body-parser')
const app = require('../app')

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

const user = { email: 'eu@meuemail.com', password: 'meupassword' }

// SIGN IN testes