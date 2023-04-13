const express = require('express');
const dbConnect = require('./config/dbConnect');
const app = express();
require('dotenv').config;

const PORT = process.env.PORT || 4000;

dbConnect()

app.use('/', (req, res) => {
    res.send('Hello World');
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})
