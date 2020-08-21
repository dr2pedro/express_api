const express = require('express')
const monk = require('monk')
const db = monk(process.env.MONGO_URI)
const bcrypt = require('bcrypt')
const user = db.get('users')
const jwt = require('jsonwebtoken')
const schema = require('./schemas.js')
const router = express.Router()
const authConfig = require('./config/auth.json')


router.post('/signup', async (req, res, next) => {
  try {
    const { email } = req.body
    if (await user.findOne({ email })) { return res.status(400).json({ error: 'User already exists' }) }
    const load = await schema.validateAsync(req.body)
    const hash = await bcrypt.hash(load.password, 10)
    load.password = hash
    const payload = await user.insert(load)
    const token = jwt.sign({ _id: payload._id, username: payload.username, email: payload.email }, authConfig.secret, { expiresIn: 14400 })
    payload.password = undefined
    res.json({ payload, token })
  } catch (error) {
    next(error)
  }
  return null
})

router.post('/signin', async (req, res, next) => {
  try {
    const { email, password } = req.body
    const payload = await user.findOne({ email })
    if (!payload) return res.status(400).json({ error: 'User not found' })
    if (!await bcrypt.compare(password, payload.password)) return res.status(400).send({ error: 'Invalid password' })
    payload.password = undefined
    const token = jwt.sign({ _id: payload._id, username: payload.username, email: payload.email }, authConfig.secret, { expiresIn: 14400 })
    return res.send({ payload, token })
  } catch (error) {
    next(error)
  }
  return null
})

module.exports = router
