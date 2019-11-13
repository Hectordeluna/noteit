const mongoose = require('mongoose');
const Note = mongoose.model('notes');

module.exports = (app) => {

  app.get(`/api/note`, async (req, res) => {
    let notes = await Note.find();
    return res.status(200).send(notes);
  });

  app.post(`/api/note`, async (req, res) => {
    let note = await Note.create(req.body);
    return res.status(201).send({
      error: false,
      note
    })
  })

  app.put(`/api/note/:id`, async (req, res) => {
    const {id} = req.params;

    let note = await Note.findByIdAndUpdate(id, req.body);

    return res.status(202).send({
      error: false,
      note
    })

  });

  app.delete(`/api/note/:id`, async (req, res) => {
    const {id} = req.params;

    let note = await Note.findByIdAndDelete(id);

    return res.status(202).send({
      error: false,
      note
    })

  })

}
