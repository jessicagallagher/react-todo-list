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

// middleware
app.use(express.json({ extended: false }));

// routes
app.use('/api/todoapp', todo);

// only when ready to deploy
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, './client/build', 'index.html'))
})


// listener
app.listen(PORT, () =>
  console.log(`SERVER IS RUNNING ON http://localhost:${PORT}`)
);
