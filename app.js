// Import necessary modules
const express = require('express');
require('dotenv').config();
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./src/db/config/db.config')

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// for connecting to database
connectDB();

module.exports = app;