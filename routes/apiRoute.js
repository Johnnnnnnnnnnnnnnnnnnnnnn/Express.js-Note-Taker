const router = require("express").Router();
const database = require("../db/database");

router.get('/notes', (req, res) => {
    database.getNotes().then((notes) => {
        return res.json(notes)
    }).catch((err) => res.status(500).json(err))
});
router.post("/notes", (req, res)=> {
    database.addNote(req.body).then((note) => res.json(note))
    .catch((err) => res.status(500).json(err));
}) 
router.delete("/notes/:id", (req, res) => {
    database.removeNote(req.params.id).then(() => res.json({ok: true}))
    .catch((err) => res.status(500).json(err))
})

module.exports = router;