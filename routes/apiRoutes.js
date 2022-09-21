// require router and store 
const router = require("express").Router();
const notes = require("../db/db.json");
const fs = require('fs');

// get route to get all notes from db
router.get('/notes', (req,res) => {
    res.json(notes);
})


// post route to add the notes
router.post('/notes',(req,res) =>{
   req.body.id = Math.floor(Math.random() * 10000);
   notes.push(req.body);
   fs.writeFile('./db/db.json', JSON.stringify(notes) ,(err) => {
    if (err) {
        throw err;
    }
   });
   res.json(notes);
})

// delete route to delete notes
router.delete('/notes/:id', (req,res) =>{
for (let i = 0; i < notes.length; i++) {
    if (req.params.id = notes[i].id) {
        notes.splice(i, 1)
    }
}
fs.writeFile('./db/db.json', JSON.stringify(notes), (err) => {
    if (err) {
        throw err;
    }
})
res.json(notes);
})


// expore my module
module.exports = router;