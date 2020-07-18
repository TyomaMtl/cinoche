require('dotenv').config()

const express = require('express')
const router = express.Router()
const session = require('express-session')
const bodyParser = require('body-parser')

const app = express()
const server = require('http').createServer(app)

const sha1 = require('sha1')

const { User, Movie, Genre, Distributor } = require('./database')

app.set('view engine', 'ejs')

app.use(session({
    secret: 'weshalors',
    cookie: {},
    resave: true,
    saveUninitialized: true
}))

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

router.post('/login', (request, response) => {

    User.findOne({ where: {
        email: request.body.email,
        password: sha1(request.body.password)
    }}).then((user) => {

        if (user) {
            request.session.user_id = user.id
            response.redirect('/movies')
        } else {
            response.send('Invalid credentials')
        }

    })

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

router.get('/movies', (request, response) => {
    
    if (request.session.id) {
        
        Movie.findAll().then((movies) => {
            response.render('movies', {
                movies: movies
            })
        }).catch((error) => {
            console.log('Error : ' + error)
        })

    } else {

        response.redirect('/login')
    
    }

})

router.get('/distributors', (request, response) => {
    
    if (request.session.id) {
        
        Distributor.findAll().then((distributors) => {
            response.render('distributors', {
                distributors: distributors
            })
        }).catch((error) => {
            console.log('Error : ' + error)
        })

    } else {

        response.redirect('/login')
    
    }

})

router.get('/genres', (request, response) => {
    
    if (request.session.id) {
        
        Genre.findAll().then((genres) => {
            response.render('genres', {
                genres: genres
            })
        }).catch((error) => {
            console.log('Error : ' + error)
        })

    } else {

        response.redirect('/login')
    
    }

})

router.get('/movie/:id(\\d+)', (request, response) => {

    let id = request.params.id

    Movie.findOne({ where: {
        id: id,
    }}).then((movie) => {

        response.render('movie', {
            movie: movie
        })

    })

})

server.listen(3000)