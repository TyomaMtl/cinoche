require('dotenv').config()

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const app = express()
const server = require('http').createServer(app)

const { sequelize, User } = require('./database')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

router.get('/', (request, response) => {
    
    response.render('index')

})

router.get('/login', (request, response) => {

    response.render('login')

})

server.listen(3000)