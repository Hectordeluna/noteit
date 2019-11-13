const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    name: String,
    description: String,
})

mongoose.model('notes', noteSchema);