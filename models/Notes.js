const mongoose = require('mongoose')
const { Schema } = mongoose

const NotesSchema = new Schema({
    user : {
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title:{
        type: 'string',
        required: true
    },
    description: {
        type: 'string',
        required: true
    },
    category: {
        type: 'string',
        default:"Personal Note"
    },
    
    date: {
        type: 'date',
        default: new Date
    }
})

const NotesModel = mongoose.model('notes',NotesSchema)

module.exports = NotesModel