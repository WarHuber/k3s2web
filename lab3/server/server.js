const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const cors = require('cors');

const app = express();
const db = new sqlite3.Database('./db/users.db');

app.use(cors());
app.use(bodyParser.json());

// Initialize the database
db.serialize(() => {
  db.run('CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT UNIQUE, password TEXT, gender TEXT, dob DATE)');
  db.run('CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, description TEXT, start_time TEXT, end_time TEXT, FOREIGN KEY(user_id) REFERENCES users(id))');
});

// Register new user
app.post('/api/register', async (req, res) => {
  const { name, email, gender, dob, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  db.run('INSERT INTO users (name, email, password, gender, dob) VALUES (?, ?, ?, ?, ?)', [name, email, hashedPassword, gender, dob], function(err) {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    res.send({ id: this.lastID, name, email, gender, dob });
  });
});

// Login user
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    if (user && await bcrypt.compare(password, user.password)) {
      res.send({ id: user.id, name: user.name, email: user.email, gender: user.gender, dob: user.dob });
    } else {
      res.status(401).send({ error: 'Invalid credentials' });
    }
  });
});

// Fetch user sessions
app.get('/api/sessions', (req, res) => {
  db.all('SELECT * FROM sessions', [], (err, sessions) => {
    if (err) {
      return res.status(400).send({ error: err.message });
    }
    res.send(sessions);
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
