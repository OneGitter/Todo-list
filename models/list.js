const mongoose = require('mongoose');
const DateOnly = require('mongoose-dateonly')(mongoose);

const listSchema = new mongoose.Schema({

    task: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    due_date: {
        type: DateOnly,
        required: true
    }

})


const Todolist = mongoose.model('Todolist', listSchema);

module.exports = Todolist;