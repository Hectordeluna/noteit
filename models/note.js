const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    username: String,
    public: Boolean,
})

mongoose.model('notes', noteSchema);