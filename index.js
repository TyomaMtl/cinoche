require('dotenv').config()

const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const app = express()
const server = require('http').createServer(app)

const sha1 = require('sha1')

const { sequelize, User } = require('./database')

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(router)

router.get('/', (request, response) => {
    
    response.render('index')

})

router.get('/login', (request, response) => {

    response.render('login')

})

router.get('/register', (request, response) => {

    response.render('register')

})

router.post('/register', (request, response) => {

    let data = request.body

    // verif email
    // verif password size

    let user = User.findOne({ where: {
        email: data.email,
    }})

    if (!user) {
        User.create({
            email: data.email,
            password: sha1(data.password)
        }).then(() => (
            response.redirect('/login')
        )).catch((error) => {
            console.log(error)
        })
    } else {
        response.status(400).send('E-Mail already used')
    }

})

server.listen(3000)