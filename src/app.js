const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const favicon = require('serve-favicon')

require('dotenv').config()

const middlewares = require('./middlewares')
const api = require('./api-db/routes')

const app = express()

app.use(morgan('dev'))
app.use(helmet())
app.use(express.json())
app.use(favicon('favicon.ico'))

// caso vire um proxy será preciso inserir uma subrota e ajustar os testes
app.use('/', api)

// lidando com os erros e retornando em códidos http. Pode ser necessário
// lidar com outros erros do jeito que está feito qualquer que não seja 200 (ok)
// vira erro 404 no desenvolvimento e 500 quando em produção.
app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

module.exports = app
