// toda nova rota precisa importar a API do express.
const express = require('express')
// já que lidamos com uma api de databases, o monk é uma ORM que lida com várias delas de um jeito simples.
const monk = require('monk')

// esse é o equivalente ao db.connect no monk. process.env faz com que leia no .env a variável.
const db = monk(process.env.MONGO_URI)
/* esse CRUD é baseado no MongoDB então o connect acima não é direto em uma table e sim em uma coleção.
abaixo selecionamos o que seria a tabela */
const users = db.get('users')

// liberando acesso irrestrito apenas para algumas rotas.
const cors = require('cors')

/* Esse é o validador do joi. Para uma simples API de Sign up precisa-se de ao menos três campos no form: username, password, e-email. */
const schema = require('./schema_db.js')

// resumindo o express.Router para um nome só.
const router = express.Router()

// READ ALL
router.get('/', async (req, res, next) => {
  // como a comunicação com a base de dados é assíncrona o async, await em um trycatch é a opção escolhida para lidar com o retornos corretamente
  try {
    // dar um find vazio, sem paramêtros traz o retorno de toda a base.
    const items = await users.find({})
    // a transfêrencia de dados está em json. Existem outras alternativas.
    res.json(items)
  } catch (error) {
    // next error, permite cair nos middlewares definidos na pasta root.
    next(error)
  }
})

// CREATE ONE
router.post('/', cors(), async (req, res, next) => {
  try {
    // aqui entra o validador, não se pode admitir inserções diferentes do que foi planejado de entrada na base de dados.
    const user = await schema.validateAsync(req.body)
    // insert é a função do Monk para inserção de dados em bancos de dados (tanto SQL quanto noSQL)
    const inserted = await users.insert(user)
    res.json(inserted)
  } catch (error) {
    next(error)
  }
})

// READ ONE
router.get('/:id', cors(), async (req, res, next) => {
  // repare que a agora existe um parâmetro id ao final da URI.
  try {
    // esse parâmetro precisa ser capturado aqui.
    const { id } = req.params
    // e passado a função findOne, também de responsbilidade do Monk, entretando, no MongoDB as variáveis possuem underline na frente.
    const item = await users.findOne({
      _id: id,
    })
    // se não retornar item, manda pro next=middlewares.
    if (!item) return next()
    // se retonar algo, emite um json.
    return res.json(item)
  } catch (error) {
    next(error)
  }
  /* considerando que existe parâmetros, parte-se do nulo para inserção de algum parâmetro.
  Caso seja inserido algum parâmetro não reconhecido, vira erro. Caso insera um válido tem-se o retorno
  válido. Caso continue sem inserir nada, nada será feito */
  return null
})

// UPDATE ONE
router.put('/:id', cors(), async (req, res, next) => {
  try {
    // exatamente a mesma coisa do read one.
    const { id } = req.params
    const user = await schema.validateAsync(req.body)
    const item = await users.findOne({
      _id: id,
    })
    if (!item) return next()
    /* ao invés de retornar um json, precisa mudar. A função update é do ORM monk precisa do parâmetro
    e do que vai ser mudado, que no caso é todo o usuário. É possível desconstrui isso para mudar apenas um campo, todo. */
    await users.update({
      _id: id,
    }, {
      $set: user,
    })
    // retorne o novo json.
    res.json(user)
  } catch (error) {
    next(error)
  }
  return null
})

// DELETE ONE
router.delete('/:id', async (req, res, next) => {
  try {
    const { id } = req.params
    await users.remove({
      _id: id
    })
    // o correto de um delete é mandar um status code. Não um json, já que foi deletado.
    res.status(200).send('Success, register deleted!')
  } catch (error) {
    next(error)
  }
})

module.exports = router
