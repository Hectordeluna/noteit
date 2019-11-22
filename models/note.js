const mongoose = require('mongoose');
const {Schema} = mongoose;

const noteSchema = new Schema({
    name: {type: String, text: true},
    description: {type: String, text: true},
    date: Date,
    username: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    public: Boolean,
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'comments'}],
    canEdit : [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
    tags: {type : [String], text: true}
})

noteSchema.index({'$**' : 'text'});

mongoose.model('notes', noteSchema);