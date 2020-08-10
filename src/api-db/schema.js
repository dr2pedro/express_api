// validador, defina o schema de entrada no banco de dados, dependendo do tamanho vale a pena inserir em um file separado.
const joi = require('@hapi/joi')

/* Esse é o validador do joi. Para uma simples API de Sign up precisa-se de ao menos três campos no form: username, password, e-email. */
const schema = joi.object({
  username: joi.string().trim().required(),
  email: joi.string().trim().required().email(),
  created_at: joi.date().default(new Date),
  last_access: joi.array().default([
    new Date 
  ])
})

/*
  Esse é o modelo de inserção.

  {
  "username":"dr2p",
  "password":MDUxMzA0Nzkx",
  "email":"dr2p@hotmail.com",
  "created_at":2020-08-04T22:52:33.619Z",
  "last_access":["2020-08-04T22:52:33.619Z"]}
  }

*/

module.exports = schema
