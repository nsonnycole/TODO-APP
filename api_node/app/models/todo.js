const mongoose = require('mongoose');

/* *** *** IMPORTS *** *** */

const Schema = mongoose.Schema;

const TodoSchema = new Schema({
    name: { type: String, required: true},
    description: String,
    priority: Number,
    status: Boolean,
    createdAt: { type: Date, default: Date.now },
    updatedAt: Date
});

module.exports = mongoose.model('Todo', TodoSchema);