const express = require('express');
const fetchUserMware = require('../middleware/fetchUserMware');
const Router = express.Router();
const NotesModel = require('../models/Notes')
const { body, validationResult } = require('express-validator');

// Router.get('/getall', fetchUserMware, async (req, res) => {
//     const getNotes = await NotesModel.find({ user: req.user.id })
//     res.send(getNotes)
//     // res.send("this is the endpoint to send all notes")
// })



// route: 1   ------ user specific notes fetching :    login required --------
Router.get('/getall', fetchUserMware, async (req, res) => {
    try {
        const getNotes = await NotesModel.find({ user: req.user.id })
        res.send(getNotes)
    } catch (error) {
        res.status(404).send(error.message)
    }
}


    // route: 2   ------ user specific note fetching :    login required --------
)
Router.get('/getone/:id', fetchUserMware, async (req, res) => {
    try {
        const id = req.params.id  // get note id to get it from database 
        // find note in db
        const note = await NotesModel.findById({ _id: id })

        const userId = req.user.id   // access user id from the specific note
        if (userId !== note.user.toString()) {
            // if user id not equals to the user present in saved note it sends error
            res.status(402).send("Unauthorized access")
        }

        if (!note) {
            // if note not found send not found response
            res.status(404).send("Not Found")
        }
        res.status(200).send(note)


    } catch (error) {
        res.status(404).send(error.message)
    }
})




// route: 3   ------ create user specific notes  :    login required --------
Router.post('/create', fetchUserMware, [
    body('title', 'title cannot empty').isLength({ min: 3 }),
    body('description', 'description cannot empty').isLength({ min: 1 }),
], async (req, res) => {
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { title, description, category } = req.body
        const note = await NotesModel.create({
            title,
            description,
            category,
            user: req.user.id
        })
        const NoteRes = await note.save()
        res.status(201).send(NoteRes)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

// route: 4   ------ edit existing user specific notes  :    login required --------
Router.put('/edit/:id', fetchUserMware, async (req, res) => {
    try {
        const id = req.params.id  // get note id to get it from database 
        // find note in db
        const note = await NotesModel.findById(id)
        if (!note) {
            // if note not found send not found response
            res.status(404).send("Not Found")
        }

        const userId = req.user.id   // access user id from the specific note
        if (userId !== note.user.toString()) {
            // if user id not equala to the user present in note it sends error
            res.status(402).send("Unauthorized access")
        }

        // if everything alright
        // destructure details from req.body
        const { title, description, category } = req.body
        const newNote = {
            title: title,
            description: description,
            category: category
        }

        const updatedNote = await NotesModel.findByIdAndUpdate(id, newNote)
        res.status(202).send(updatedNote)

    } catch (err) {
        res.status(404).send(err.mesage);
    }

})


// route: 5   ------ delete existing user specific notes  :    login required --------
Router.delete('/delete/:id', fetchUserMware, async (req, res) => {
    try {
        const id = req.params.id        // get note id to get it from database 
        // find note in db
        const note = await NotesModel.findById(id)
        if (!note) {
            // if note not found send not found response
            res.status(404).send("Not Found")
        }

        const userId = req.user.id   // access user id from the specific note
        if (userId !== note.user.toString()) {
            // if user id not equala to the user present in note it sends error
            res.status(402).send("Unauthorized access")
        }

        const deletedNote = await NotesModel.findByIdAndDelete(id)
        res.status(202).json({ deletedNote, message: 'Deleted Successfully' })

    } catch (err) {
        res.status(404).send(err.mesage);
    }
})

module.exports = Router