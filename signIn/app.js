const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

require('dotenv').config()

const signIn = require('./src/routes')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())

app.use('/', signIn)

module.exports = app
