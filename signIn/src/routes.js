const express = require('express')
const monk = require('monk')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const cors = require('cors')

const db = monk(process.env.MONGO_URI)
const user = db.get('users')

const router = express.Router()
const {secret} = require('../../config/auth.json')
const {uri_gateway} = require('../../config/auth.json')

var corsOptions = {
  origin: uri_gateway,
  optionsSuccessStatus: 200
}

router.post('/signin', cors(corsOptions), async (req, res, next) => {
  try {
    const { email, password } = req.body
    const payload = await user.findOne({ email })
    if (!payload) { return res.status(404).json({ error: 'User not found' }) }
    if (!await bcrypt.compare(password, payload.password)) { return res.status(400).send({ error: 'Invalid password' }) }
    payload.password = undefined
    const token = jwt.sign({ _id: payload._id, username: payload.username, email: payload.email }, secret, { expiresIn: 14400 })
    res.json({ payload, token })
  } catch (error) {
    next(error)
  }
  return null
})

module.exports = router
