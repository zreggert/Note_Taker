const express = require('express');
const app = express();
const port = 3000;
const noteDb = require(`./db/db.json`);
const path = require('path');
const fs = require('fs');

app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(express.static('./public'));

app.get(`/`, (req, res) => {
    res.sendFile(`${__dirname}/public/index.html`)
});

app.get(`/notes`, (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`)
});

app.get(`/api/notes`, (req, res) => {
    console.log(`Sent notes api to client.`);
    res.json(noteDb)
});

app.get(`*`, (req, res) => {
    res.sendFile(`${__dirname}/public/notes.html`)
});

app.post(`/api/notes`, (req, res) => {
    console.log(`You created a new note.`);
    const note = req.body;
    noteDb.push(note);
    fs.appendFileSync(
        path.join(note, "./db/db.json"),
        noteDb,
            (err) => err ? console.log(err) : console.log("Good to go!")
        )
    res.json(noteDb)
});

app.listen(port, () => {
    console.log(`Listening to port ${port}.`)
})