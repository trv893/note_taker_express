const express = require('express');
const uniqid = require('uniqid');
const path = require('path');
const PORT = process.env.PORT || 3001;
const db = require('./db/db.json');
const fs = require('fs');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));



// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(dirname, '/index.html'))
);
app.get('/notes', (req, res) =>
  res.sendFile(path.join(dirname, 'public/notes.html'))
);
app.get('/api/notes', (req, res) => res.json(db));
app.post('/api/notes', (req, res) => {
    const {title, text} = req.body;

    if (title && text) {

      const newNote = {
        title,
        text
      };
      console.log(req.body);


      db.push(newNote);
      fs.writefile('./db/db.json',JSON.stringify(db), (err) => console.log(db));



    //   const response = {
    //     status: 'success',
    //     body: newNote,
    //   };

    //   console.log(response);
    //   res.status(201).json(response);
    // } else {
    //   res.status(500).json('Error in posting note');
    // }
 } });

app.listen(PORT, () => console.log(App listening on port http://localhost:${PORT}));