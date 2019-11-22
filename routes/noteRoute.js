const mongoose = require('mongoose');
const passport = require("passport");
const Note = mongoose.model('notes');
const User = mongoose.model('users');
const keys = require("../config/keys");
const jwt = require("jsonwebtoken");

module.exports = (app) => {

  app.use('/api/note/', function(req, res, next) {
    var token = req.get("Authorization");
    if (!token) next({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, keys.secretOrKey, function(err, decoded) {
      if (err) next(err);
      
      req.user = decoded;
      next();
    });
  });

  app.get(`/api/note`, (req, res) => {
    const userID = req.user.id;
    User.findById(userID).
    populate(
      {path: 'notes', 
      populate: {path: "comments", populate: "user"},
      options: {sort: {date: -1}}
      }).exec((err, notes) => res.json(notes.notes));
  });

  app.use('/api/friends/', function(req, res, next) {
    var token = req.get("Authorization");
    if (!token) next({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, keys.secretOrKey, function(err, decoded) {
      if (err) next(err);
      
      req.user = decoded;
      next();
    });
  });


  app.get(`/api/friends/notes`, (req, res) => {
    const userID = req.user.id;

    User.findById({_id : userID}).then(user => {
      Note.find({ username : {$in : user.friends}, public : true}).sort([["date",-1]]).populate([{ path: 'username', select: 'username' },{ path: 'comments', populate : {path: 'user', select: 'username' }}]).then(notes => {
        return res.json(notes);
      })
    });

  });


  app.get(`/api/note/:id`, (req, res) => {
    const {id} = req.params;
    Note.findById(id)
      .then(note => res.json(note));
  });

  app.post(`/api/note`, async (req, res) => {

    Note.create(req.body).then(newNote => {
      User.findById(req.body.username).then(user => {
        user.notes.push(newNote);
        user.save();
      });
      return res.status(201).json(newNote);
    }).catch(function(err) {
      return res.json(err);
    });

    return res.status(401);
  })

  app.put(`/api/note/:id`, async (req, res) => {
    const {id} = req.params;
    const userID = req.user.id;

    Note.findById(id).then(note => {
      if (note.username === userID || note.canEdit.includes(userID)) {
        note.set(req.body);
        note.save();
        return res.status(202).json(note);
      }
      return res.status(404);
    });
  });

  app.delete(`/api/note/:id`, async (req, res) => {
    const {id} = req.params;
    const userID = req.user.id;
    Note.deleteOne({ '_id' : id})
    .then((note) => {
      return res.status(202).json(id);
    }).catch(function(err) {
      return res.json(err);
    });
  });

}
