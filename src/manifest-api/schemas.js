// validador, defina o manifest de entrada no banco de dados, dependendo do tamanho vale a pena inserir em um file separado.
const joi = require('@hapi/joi')

/* Esse é o validador do joi. Para uma simples API de Sign up precisa-se de ao menos três campos no form: username, password, e-email. */
const manifest_schema = joi.object({
  username: joi.string().trim(),
  email: joi.string().trim().email(),
  created_at: joi.date().default(new Date()),
  last_access: joi.array().default([
    new Date()
  ])
})

module.exports = manifest_schema
