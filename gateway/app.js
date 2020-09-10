const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')

require('dotenv').config()

const app = express()

const authentication = require('./routes')

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())

app.use('/', authentication)

module.exports = app
