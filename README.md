## Um modelo de Express API para CRUD em bancos de dados. 

Esse modelo de express API é um fork do respositório w3cj/express-api-starter que além do express contém:
- Morgan, um módulo de resquest/response http;
- Helmet, um middleware de segurança com diversas funções, como o pré-fetch;
- Dotenv, um organizador de variáveis para processos;
- Nodemon, para atualizar o servidor de dev em real-time;
- Eslint, para correção de código e boa práticas;
- Mocha e suptest, para ambiente de teste. _Pode ser abstraído em uma branch separada caso inclua o Docker na stack_. 


### Instalação
Após o fork (ou clone) instale: 
```
npm install
```

### Controle de qualidade de código
Verifique se não restaram inconsistências de código:
```
npm run lint
```

### Development
Inicie o servidor de desenvolvimento com:
```
npm run dev
```

____
Caso os testes não tenham sido removidos:
```
npm run test
```
____ 

