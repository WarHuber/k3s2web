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
  db.run('CREATE TABLE IF NOT EXISTS sessions (id INTEGER PRIMARY KEY AUTOINCREMENT, user_id INTEGER, title TEXT, description TEXT, start_time TEXT, end_time TEXT, length INTEGER, state TEXT)');
});

// Register new user
app.post('/api/register', async (req, res) => {
    const { name, email, gender, dob, password } = req.body;
  
    if (!name || !email || !password || !gender || !dob) {
      return res.status(400).send({ error: "All fields are required" });
    }
  
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      db.run('INSERT INTO users (name, email, password, gender, dob) VALUES (?, ?, ?, ?, ?)', 
      [name, email, hashedPassword, gender, dob], function(err) {
        if (err) {
          console.error('Database insert error:', err.message);
          return res.status(500).send({ error: "Database operation failed" });
        }
        res.status(201).send({ id: this.lastID, name, email, gender, dob });
      });
    } catch (error) {
      console.error('Hashing error:', error.message);
      res.status(500).send({ error: "Server error during hashing" });
    }
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

// Endpoint to add a new session
app.post('/api/sessions', (req, res) => {
    const { user_id, title, description, start_time, state } = req.body;
    db.run('INSERT INTO sessions (user_id, title, description, start_time, state) VALUES (?, ?, ?, ?, ?)',
      [user_id, title, description, start_time, state], function(err) {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        res.status(201).send({ id: this.lastID, user_id, title, description, start_time, state, length: 0 });
      });
  });
  
  // Endpoint to update session's state (Pause/Resume)
  app.put('/api/sessions/:id/state', (req, res) => {
    const { state, length } = req.body;
    const endTime = state === 'paused' ? new Date().toISOString() : null;
    
    db.run('UPDATE sessions SET state = ?, end_time = ?, length = ? WHERE id = ?',
      [state, endTime, length, req.params.id], function(err) {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        if (this.changes === 0) {
          return res.status(404).send({ error: 'Session not found' });
        }
        res.send({ message: 'Session updated successfully', state, endTime, length });
      });
  });
  
  // Endpoint to save session progress
  app.put('/api/sessions/:id/save', (req, res) => {
    const { description, length } = req.body;
    db.run('UPDATE sessions SET description = ?, length = ? WHERE id = ?',
      [description, length, req.params.id], function(err) {
        if (err) {
          return res.status(500).send({ error: err.message });
        }
        if (this.changes === 0) {
          return res.status(404).send({ error: 'Session not found' });
        }
        res.send({ message: 'Session saved successfully', description, length });
      });
  });
  
  // Endpoint to fetch all sessions
  app.get('/api/sessions', (req, res) => {
    db.all('SELECT * FROM sessions', [], (err, rows) => {
      if (err) {
        return res.status(500).send({ error: err.message });
      }
      res.send(rows);
    });
  });

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
