const mongoose = require("mongoose");
const {Schema} = mongoose;// Create Schema

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    text: true,
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
  notes: [{type: mongoose.Schema.Types.ObjectId, ref: 'notes'}],
  requests: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}],
  friends: [{type: mongoose.Schema.Types.ObjectId, ref: 'users'}]
});

UserSchema.index({username : 'text'});

const User = mongoose.model('users', UserSchema);

module.exports = User;