const mongoose = require('mongoose');
const {Schema} = mongoose;

const commentSchema = new Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    username: String,
    comment: String,
    likes: Number
})

mongoose.model('comments', commentSchema);