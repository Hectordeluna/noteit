const mongoose = require('mongoose');
const Comment = mongoose.model('comments');
const Note = mongoose.model('notes');
const User = mongoose.model('users');
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

module.exports = (app) => {

    app.use('/api/search/note', function(req, res, next) {
        var token = req.get("Authorization");
        if (!token) next({ auth: false, message: 'No token provided.' });
        jwt.verify(token, keys.secretOrKey, function(err, decoded) {
          if (err) next(err);
          
          req.user = decoded;
          next();
        });
      });

    app.get(`/api/search/note/`, (req, res, next) => {
        const Q = req.query.search;
        const userID = req.user.id;
        User.findById(userID).
        populate({
            path: 'notes',
            match: { $or: [{name: {$regex: Q, $options: 'i'}}, {tags: {$regex: Q, $options: 'i'}}, {description: {$regex: Q, $options: 'i'}}], }, 
          }).exec((err, notes) => {
            res.json(notes);
        });
    });

}
