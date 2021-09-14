//Express
const express = require('express')
const app = express()
//Morgan
const morgan = require('morgan')
//Cookie Parser
const CookieParser = require('cookie-parser')


//Server setting
app.set('port', 5000)
app.use(express.json()) //Especifico que voy a permitir JSON's
app.use(CookieParser()) //Especifico que voy a permitir cookies
//Morgan
app.use(morgan('dev'))

//Routes
app.use(require('./routes/tasks'),require('./routes/user'))


//Start Server
app.listen(app.get('port'),()=>{
    console.log('[+] Servidor iniciado en: http://localhost:'+app.get('port'))
})