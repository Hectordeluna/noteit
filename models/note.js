const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    name: String,
    description: String,
    date: Date,
    username: String,
    public: Boolean,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
    canEdit : [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
})

mongoose.model('notes', noteSchema);