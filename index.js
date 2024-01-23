// Import necessary modules
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/db/config/db.config')

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// for connecting to database
connectDB();

app.use('/auth',require('./src/routes/userauth'))
app.use('/profile',require('./src/routes/userprofile'))

app.listen(PORT,()=>{
    console.log(`Server listening on PORT ${PORT}`)
})