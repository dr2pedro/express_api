const express = require('express')
const monk = require('monk')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const db = monk(process.env.MONGO_URI)
const user = db.get('users')
const schema = require('./schema.js')

const router = express.Router()
const authConfig = require('./config/auth.json')

//SIGN IN

module.exports = router
