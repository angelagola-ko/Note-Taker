const fs = require('fs');
const path = require('path');
const internal = require('stream');
const router = require('express').Router();
//npm package for creating a unique id
var uniqueId = require('uniqid');
var joinNotes = path.join(__dirname, '../db/notes.json');
var homepage = path.join(__dirname, '../public/index.html');
var storedNotes = path.join(__dirname, '../public/notes.html');
console.log('current directory = ' + __dirname)
console.log('pointing to: ' + path.join(__dirname, '../db/notes.json'))

// router.use('/api',require('./api');

// router.get('/notes',(req,res)=>{
//     res.sendFile(path.join(__dirname, '../public/notes.html'));
// });

router.get('/', (req, res) => {
    res.sendFile(homepage);
});

// router.get('*',(req,res)=>{
//     res.sendFile(path.join(__dirname, '../public/index.html'));
// });

//gets notes from file
router.get('/notes', (req, res) => {
    res.sendFile(storedNotes);
});

//write to file n print out
router.post('/api/notes', (req, res) => {

    //res.sendFile(joinNotes);
    let postNotes = fs.readFileSync(joinNotes);
    //Seperates the data
    postNotes = JSON.parse(postNotes);
    console.log(postNotes);
    console.log(req.body)
    let userNote = {
        title: req.body.title,
        text: req.body.text,
        id: uniqueId(),
    };
    //push the note to file
    postNotes.push(userNote);
    //strings back
    fs.writeFileSync(joinNotes, JSON.stringify(postNotes));
    //Stringifies
    res.json(postNotes);
});

router.get('/api/notes', (req, res) => {
    let postNotes = fs.readFileSync(joinNotes);
    postNotes = JSON.parse(postNotes);

    res.json(postNotes)

});
//DELETE notes NOT WORKING
router.delete('/api/notes/:id', (req,res) => {
    let deleteNotes= fs.readFileSync(joinNotes);
    //seperate data
    deleteNotes = JSON.parse(deleteNotes);
    let dNote = deleteNotes.filter( item => item.id != req.params.id);
    fs.writeFileSync(joinNotes, JSON.stringify(dNote));
    res.json(dNote);
    
});

// Open note after clicking on it.




module.exports = router;