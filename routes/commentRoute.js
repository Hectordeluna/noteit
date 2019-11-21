const mongoose = require('mongoose');
const Comment = mongoose.model('comments');
const Note = mongoose.model('notes');

module.exports = (app) => {

  app.get(`/api/:noteid/comments`, (req, res) => {
    const {noteid} = req.params;
    Note.findById(noteid).populate({
      path: "comments",
      populate: { path: 'users' }
    }).exec((err, comments) => res.json(comments.comments));
  });

  app.get(`/api/comment/:id`, (req, res) => {
    const {id} = req.params;
    Comment.findById(id)
      .then(note => res.json(note));
  });

  app.post(`/api/:noteid/comment`, (req, res) => {
    const {noteid} = req.params;
    Comment.create(req.body).then(newComment => {
      Note.findById(noteid).then(note => {
        note.comments.push(newComment);
        note.save();
      });
      return res.status(201).json(newComment);
    }).catch(function(err) {
      return res.json(err);
    });

    return res.status(401);
  })
}
