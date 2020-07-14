const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')

const app = express()
const server = require('http').createServer(app)

app.set('view engine', 'ejs')

app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(router)

router.get('/', (request, response) => {
    
    response.render('index')

})

server.listen(3000)