const mongoose = require('mongoose');
const Note = mongoose.model('notes');

module.exports = (app) => {

  app.get(`/api/note`, (req, res) => {
    Note.find()
      .then(notes => res.json(notes));
  });

  app.get(`/api/note/:id`, (req, res) => {
    const {id} = req.params;
    Note.findById(id)
      .then(note => res.json(note));
  });

  app.post(`/api/note`, async (req, res) => {
    let note = await Note.create(req.body);
    return res.status(201).json(note);
  })

  app.put(`/api/note/:id`, async (req, res) => {
    const {id} = req.params;

    let note = await Note.findByIdAndUpdate(id, req.body);

    return res.status(202).json(note);
  });

  app.delete(`/api/note/:id`, async (req, res) => {
    const {id} = req.params;

    let note = await Note.findByIdAndDelete(id);

    return res.status(202).json(id);

  });

}
