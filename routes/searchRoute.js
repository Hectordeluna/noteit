const mongoose = require('mongoose');
const Comment = mongoose.model('comments');
const Note = mongoose.model('notes');
const User = mongoose.model('users');
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

module.exports = (app) => {

    app.use('/api/search/', function(req, res, next) {
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

    app.get(`/api/search/users/`, (req, res, next) => {
        const Q = req.query.search;
        const userID = req.user.id;
        User.findById(userID).then(user => {
            User.find({username: {$regex: Q, $options: 'i'}}).where('_id').nin(user.friends).where('_id').ne(userID).select('-password').exec((err,users) => {
                return res.json(users);
            });
        });
 
    });

    app.get(`/api/search/friends/notes/`, (req, res, next) => {
        const Q = req.query.search;
        const userID = req.user.id;
        User.findById({_id : userID}).then(user => {
          Note.find({ username : {$in : user.friends}, public : true, $or : [{name: { $regex: Q, $options: 'i'}}, {tags: { $regex: Q, $options: 'i'}},{description: { $regex: Q, $options: 'i'}}]}).populate([{ path: 'username', select: 'username' },{ path: 'comments', populate : {path: 'user', select: 'username' }}]).then(notes => {
            return res.json(notes);
          })
        });
    
      });

}
