const mongoose = require("mongoose");
const {Schema} = mongoose;// Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'notes'}]
});

const User = mongoose.model('users', UserSchema);

module.exports = User;