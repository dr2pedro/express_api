const express = require('express')
const monk = require('monk')

const db = monk(process.env.MONGO_URI)
const bcrypt = require('bcrypt')

const user = db.get('users')

const cors = require('cors')
const schema = require('./schemas.js')

const router = express.Router()

router.post('/signup', cors(), async (req, res, next) => {
  try {
    const { email } = req.body

    if (await user.findOne({ email })) { return res.status(400).send({ error: 'User already exists' }) }

    const payload = await schema.validateAsync(req.body)
    const hash = await bcrypt.hash(payload.password, 10)

    payload.password = hash

    const inserted = await user.insert(payload)
    inserted.password = undefined

    return res.json(inserted)
  } catch (error) {
    next(error)
  }
  return null
})

module.exports = router
