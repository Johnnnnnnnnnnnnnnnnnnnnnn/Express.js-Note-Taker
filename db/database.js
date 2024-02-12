const util = require("util");
const fs = require("fs");
const uuid = require("uuid");
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);

class Database {
    read() {
        return readFile('db/db.json', 'utf-8');
    }
    write(note) {
        return writeFile('db/db.json', JSON.stringify(note));
    }
    getNotes() {
        return this.read().then((notes) => {
            let parsedNotes;

            try {
                parsedNotes = [].concat(JSON.parse(notes))
            } catch(err) {
                parsedNotes = []
            }

            return parsedNotes;
        })
    }
    postNote(note) {
        const {title, text} = note;
        if(!title || !text) {
            throw new Error("Title and text cannot be empty.")
        }

        const newNote = {title, text, id: uuid()};
        return this.getNotes().then((notes) => [...notes, newNote])
        .then((updatedNotes) => this.write(updatedNotes))
        .then(() => newNote)
    }
    deleteNote(id) {
        return this.getNotes().then((notes) => notes.filter((note) => note.id !== id))
        .then((filteredNotes) => this.write(filteredNotes));
    }
}

module.exports = new Database()

