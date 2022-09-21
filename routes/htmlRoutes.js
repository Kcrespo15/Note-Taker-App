const path = require('path');
const router = require('express').Router();

// create route for notes.html
router.get('/notes', (req,res) =>{
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});



// Use * to send any other route hit back to home page
router.get('/', (req,res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'))
});


module.exports = router;