const express = require('express')
const monk = require('monk')
const db = monk(process.env.MONGO_URI)
const manifest = db.get('manifest')
const cors = require('cors')
const schema = require('./schemas.js')
const middlewares = require('../middlewares')
const { request } = require('express')
const { string } = require('@hapi/joi')
const router = express.Router()
db.addMiddleware(require('monk-middleware-wrap-non-dollar-update'))


router.use(middlewares.guard)


// GET ALL MANIFESTS
router.get('/', /* aqui vai entrar um middleware checador de permissões: Anyone */ async (req, res, next) => {
  try {
    const items = await manifest.find({})
    const user = {_id, username, email}
    return res.json(items)
  } catch (error) {
    next(error)
  }
})

// GET YOURS MANIFEST
router.get('/:id', /* aqui vai entrar um middleware checador de permissões: Own */ async (req, res, next) => {
  try {
    const { id } = req.params
    const items = await manifest.find({_id: id})
    return res.json(items)
  } catch (error) {
    next(error)
  }
})

// POST NEW MANIFEST WITH THE FIRST ORDER 
router.post('/', /* aqui vai entrar um middleware checador de permissões: Own */ cors(), async (req, res, next) => {
  try {
    const user = {_id, username, email}
    user.manifest = {"order1": await schema.validateAsync(req.body)}
    const inserted = await manifest.insert(user)
    return res.json(inserted)
  } catch (error) {
    next(error)
  }
})

// POST NEW ORDER
router.post('/new_order/:id', /* aqui vai entrar um middleware checador de permissões: Own */ cors(), async (req, res, next) => {
  try {
    const user = {_id, username, email}
    const { id } = req.params
    const item = await manifest.findOne({
      _id: id,
    })
    if (!item) return res.status(404).json("No content, user not found.")
    let new_order_number= Object.keys(item.manifest).length +1
    let order = 'order'+ new_order_number
    let new_order={}
    new_order[order] = await schema.validateAsync(req.body)
    user.manifest = {...item.manifest, ...new_order}
    const new_resquest = await manifest.update({
      _id: id,
    },{
      $set: {
        manifest: user.manifest
      }
    })
    return res.json(new_resquest)
  } catch (error) {
    next(error)
  }
})

// DELETE A MANIFEST
router.delete('/:id', /* aqui vai entrar um middleware checador de permissões: Own */ cors(), async (req, res, next) => {
  try {
    const { id } = req.params
    await manifest.remove({
      _id: id
    })
    // o correto de um delete é mandar um status code. Não um json, já que foi deletado.
    res.status(200).send('Success, register deleted!')
  } catch (error) {
    next(error)
  }
})

// DELETE AN ORDER
router.delete('/:number/:id', /* aqui vai entrar um middleware checador de permissões: Own */ cors(), async (req, res, next) => {
  try {
    const user = {_id, username, email}
    const { id, number } = req.params
    const item = await manifest.findOne({_id: id})
    if (!item) return res.status(404).json("No content, user not found.")
    let order = `order${number}`
    user.manifest = {...item.manifest}
    if (!user.manifest[order]) return res.status(404).json("No content, order not found.")
    delete user.manifest[order]
    const new_resquest = await manifest.update({
      _id: id,
    },{
      $set: {
        manifest: user.manifest
      }
    })
    return res.json(new_resquest)
  } catch (error) {
    next(error)
  }
})

//UPDATE AN ORDER
router.put('/:number/:id', /* aqui vai entrar um middleware checador de permissões: Own */ cors(), async (req, res, next) => {
  try {
    const user = {_id, username, email}
    const { id, number } = req.params
    const item = await manifest.findOne({_id: id})
    if (!item) return res.status(404).json("No content, user not found.")
    var temp = await schema.validateAsync(req.body)
    let order = `order${number}`
    user.manifest = {...item.manifest}
    if (!user.manifest[order]) return res.status(404).json("No content, order not found.")
    user.manifest[order] = temp
    
    const new_resquest = await manifest.update({
      _id: id,
    },{
      $set: {
        manifest: user.manifest
      }
    })
    return res.json(new_resquest)
  } catch (error) {
    next(error)
  }
})


module.exports = router
