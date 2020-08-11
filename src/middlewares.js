const jwt = require('jsonwebtoken')
const authConfig = require('./user-api/config/auth.json')

function notFound(req, res, next) {
  res.status(404)
  const error = new Error(`🔍 - Not Found - ${req.originalUrl}`)
  next(error)
}

/* eslint-disable no-unused-vars */
function errorHandler(err, req, res, next) {
  /* eslint-enable no-unused-vars */
  const statusCode = res.statusCode !== 200 ? res.statusCode : 500
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  })
}

function guard(req, res, next) {
  
  const authHeader = req.headers.authorization

  if (!authHeader) return res.status(401).send({ error: 'No token provided' })

  const parts = authHeader.split(" ")

  const [scheme, token] = parts

  if (!/^Bearer$/i.test(scheme)) return res.status(401).send({ error: 'This is not the kind of token expected' })

  jwt.verify(token, authConfig.secret, (err, decoded) => {
    if (err) return res.status(401).send({ error: 'Token invalid' })
    res.user_id = decoded.id

    return next()
  })
  return null
}

module.exports = {
  notFound,
  errorHandler,
  guard
}
