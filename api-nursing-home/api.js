const express = require('express');

var app = express();
var cors = require('cors');
var bodyParser = require('body-parser');
var router = express.Router();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api', router);

// require route handlers.
const floors = require('./routes/floors');
const rooms = require('./routes/rooms');
const persons = require('./routes/persons');
const contacts = require('./routes/contacts');
const genders = require('./routes/genders');

// register routes
router.use('/floors', floors);
router.use('/rooms', rooms);
router.use('/persons', persons);
router.use('/contacts', contacts);
router.use('/genders', genders);

// No need to connect the pool
// Just start the web server
const server = app.listen(process.env.PORT || 8090, () => {
    const host = server.address().address
    const port = server.address().port

    console.log(`Example app listening at http://${host}:${port}`)
})