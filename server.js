const express = require('express');
const htmlRoutes = require('./routes/htmlRoutes');
const fs = require('fs');
const path = require('path');
const { get } = require('http');
const {notes} = require('./db/db.json');

// initialize the app and creating port
const app = express();
const PORT = process.env.PORT || 3001;

// import our routes
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('public'));
app.use('/', htmlRoutes);



function createNotes(body, notesArray) {
    const note = body
    notesArray.push(note)
    fs.writeFileSync(path.join(__dirname, './db/db.json'), 
        JSON.stringify({
            notes: notesArray
        }, null, 2),
    )
    return note;
};

function filterByQuery(query, notesArray){
    let filtered = notesArray
    if(query.title) {
        filtered = filtered.filter(
            (note) => note.title === query.title, 
        )
    }
    return filtered
}

function findById(id, notesArray) {
    const data = notesArray.filter((notes) => notes.id === id)
    return data
}


app.get('/api/notes', (req, res) =>{
    let results = notes;
    if(req.query){
        results = filterByQuery(req.query, results)
    } res.json(results)
})

app.get('/api/notes/:id', (req,res) => {
    const result = findById(req.params.id, notes)
    if(result){
        res.json(result)
    }  
    else {
        res.send(404)
    }
})


app.post('/api/notes', (req,res) =>{
    req.body.id = notes.length.toString()
    const note = createNotes(req.body, notes) 
    res.json(note)
})

app.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})

app.get('/notes', (req,res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'))
})

app.get('*', (req,res) => {
    res.sendFile(path.join(__dirname, './public/index.html'))
})



























// Staring server on port
app.listen(PORT , () => console.log(`Listening to server on ${PORT}`))