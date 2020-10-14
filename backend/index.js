require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')

const user = require('./routes/user')
const auth = require('./routes/auth')
const task = require('./routes/task')

const app = express()
app.use(cors())
app.use(express.json())

app.use('/api/user/', user)
app.use('/api/auth/', auth)
app.use('/api/task/', task)
app.use('/public/images', express.static('public/images'))

const port = process.env.PORT || 3004
app.listen(port, ()=> console.log('Escuchando Puerto: ' + port))

mongoose.connect('mongodb://localhost/task', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false, useCreateIndex: true})
    .then(() => console.log('Conectado a MongoDB'))
    .catch((err) => console.log('No se ha podido conectar a MongoDB.'))