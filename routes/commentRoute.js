const mongoose = require('mongoose');
const Comment = mongoose.model('comments');

module.exports = (app) => {

  app.get(`/api/comments`, (req, res) => {
    const {noteid} = req.params;
    Comment.find({note: noteid})
      .then(comments => res.json(comments));
  });

  app.get(`/api/comment/:id`, (req, res) => {
    const {id} = req.params;
    Comment.findById(id)
      .then(note => res.json(note));
  });

  app.post(`/api/comment`, async (req, res) => {
    let comment = await Comment.create(req.body);
    return res.status(201).json(comment);
  })

//   app.put(`/api/note/:id`, async (req, res) => {
//     const {id} = req.params;

//     let note = await Note.findByIdAndUpdate(id, req.body);

//     return res.status(202).json(note);
//   });

//   app.delete(`/api/note/:id`, async (req, res) => {
//     const {id} = req.params;

//     let note = await Note.findByIdAndDelete(id);

//     return res.status(202).json(id);

//   });

}
