const express = require('express');
const cors = require('cors');
const configDatabase = require('./configurations/database.js');
const todo = require('./routes/todo.routes.js');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

// connect to mongodb
configDatabase();

app.use(cors({ origin: true, credentials: true }));
app.use(express.static('public'))

// middleware
app.use(express.json({ extended: false }));
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: path.join(__dirname, 'public') });
});

// routes
app.use('/api/todoapp', todo);

// listener
app.listen(PORT, () =>
  console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
);

module.exports = app;
