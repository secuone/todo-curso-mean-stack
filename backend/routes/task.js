const express = require('express')
const router = express.Router()
const Task = require('../models/task')
const { User } = require('../models/user')
const auth = require('../middleware/auth')
const upload = require('../middleware/file')

router.get('/list', auth, async(req, res) => {
    const user = await User.findById(req.user._id)
    if(!user) return res.status(400).send('El usuario no existe')

    const tasks = await Task
                    .find({"userId": req.user._id})

    res.status(200).send(tasks)
})

router.post('/upload', upload.single('image'),auth, async(req, res) => {
    const url = req.protocol + '://' + req.get('host')

    const user = await User.findById(req.user._id)
    if(!user) res.status(400).send('Usuario incorrecto')

    let imageUrl = null
    if(req.file.filename){
        imageUrl = url + '/public/images/' + req.file.filename;
    }

    const task = new Task({
        userId: user._id,
        name: req.body.name,
        status: 'to-do',
        imageUrl: imageUrl,
        description: req.body.description
    })

    const result = await task.save()
    res.status(201).send(result)
})

router.post('/', auth, async(req, res) => {
    const user = await User.findById(req.user._id)
    if(!user) res.status(400).send('Usuario incorrecto')

    const task = new Task({
        userId: user._id,
        name: req.body.name,
        status: 'to-do',
        description: req.body.description
    })

    const result = await task.save()
    res.status(201).send(result)
})

router.put('/', auth, async(req, res) => {
    const user = await User.findById(req.user._id)
    if(!user) return res.status(400).send('Usuario incorrecto')

    const task = await Task.findByIdAndUpdate(req.body._id, {
        userId: user._id,
        name: req.body.name,
        status: req.body.status,
        description: req.body.description
    },{
        new:true
    })

    if(!task){
        return res.status(404).send('La tarea no existe')
    }

    res.status(200).send(task)
})

router.delete('/:_id', auth, async(req, res) => {
    const user = await User.findById(req.user._id)
    if(!user) return res.status(400).send('Usuario incorrecto')

    const task = await Task.findByIdAndDelete(req.params._id)
    if(!task){
        return res.status(404).send('La tarea no existe')
    }

    return res.status(200).send({message: 'borrado'})
})

module.exports = router