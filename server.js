const express = require('express');
const cors = require('cors');
const configDatabase = require('./configurations/database.js');
// const todo = require('./routes/todo.routes.js');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const app = express();

const PORT = process.env.PORT || 8000;

// connect to mongodb
configDatabase();

app.use(cors({ origin: true, credentials: true }));

// middleware
app.use(express.json({ extended: false }));
app.use(express.static(path.join(__dirname, './client', 'build')));
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, './client', 'build', 'index.html'));
});

// routes
app.use('/api/todoapp', require(path.join(__dirname, './routes/todo.routes.js')));

// listener
app.listen(PORT, () =>
  console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
);
