const express = require('express');
// npm package that parses the request body
const bodyParser = require('body-parser');
// npm package that 
const path = require('path');
const fs = require('fs');
// brings in our json file 
const db = require('./db/db.json');
const PORT = 3001;
// npm package that generates a unique id
var uniqid = require('uniqid'); 

const app = express();
app.use(bodyParser.json());
app.use(express.static('public'));

// GET request for index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// GET request for notes.html
app.get('/notes', (req, res) => {
  res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.get('/api/notes', (req, res) => res.json(db));

app.post('/api/notes', (req, res) =>{
  const { title, text } = req.body;
  const newnote = {
    title,
    text,
    id : uniqid(),
  }
  console.log(req.body);
  db.push(newnote);
  fs.writeFile('./db/db.json',JSON.stringify(db), (err) => console.log(err));

} );

app.delete('/api/notes/:id', (req, res) =>{
  console.log(req.params.id)
  let index = db.findIndex(item => item.id === req.params.id);
  db.splice(index, 1);
  res.sendStatus(200);
  fs.writeFile('./db/db.json',JSON.stringify(db), (err) => console.log(err));
} );

app.listen(PORT, () =>
  console.log(`Express server listening on port ${PORT}!`)
);
