const notesCtrl = {};

const Note = require('../models/Note');



notesCtrl.getNotes = async (req, res) => {
    console.log(req.query.id);
    const notes = await Note.find({author: req.query.id});
    res.json(notes);
};

notesCtrl.createNote = async (req, res) => {
    const { title, content, date, author, imagen } = req.body;
    const newNote = new Note({
        title,
        content,
        date,
        author,
        imagen
    });
    await newNote.save();
    res.json('New Note added');
};

notesCtrl.getNote = async (req, res) => {
    const note = await Note.findById(req.params.id);
    res.json(note);
}

notesCtrl.deleteNote = async (req, res) => {
    await Note.findByIdAndDelete(req.params.id)
    res.json('Note Deleted');
}

notesCtrl.updateNote = async (req, res) => {
    const { title, content, date, author, imagen } = req.body;
    await Note.findByIdAndUpdate(req.params.id, {
        title,
        content,
        date,
        author,
        imagen
    });
    res.json('Note Updated');
}

module.exports = notesCtrl;