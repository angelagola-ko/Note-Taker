const fs = require('fs');
const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 3006;
const app = express();

//parsing
// app.use(express.static('./public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//require routs
app.use(require('./routes'));

//setup listener
app.listen(PORT, () => {
    console.log(`API server now on http://localhost:${PORT}!`)
});