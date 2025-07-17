// server.js
const express = require('express');
const cors = require('cors');
const db = require('./db');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Create Hotel
app.post('/hotels', (req, res) => {
  const { name, location, rating, price, description } = req.body;
  const sql = 'INSERT INTO hotels (name, location, rating, price, description) VALUES (?, ?, ?, ?, ?)';
  db.query(sql, [name, location, rating, price, description], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// Get All Hotels - Sorted by latest first
app.get('/hotels', (req, res) => {
  const sql = 'SELECT * FROM hotels ORDER BY id DESC'; // latest inserted hotel will come first
  db.query(sql, (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

// Update Hotel
app.put('/hotels/:id', (req, res) => {
  const { id } = req.params;
  const { name, location, rating, price, description } = req.body;
  const sql = 'UPDATE hotels SET name=?, location=?, rating=?, price=?, description=? WHERE id=?';
  db.query(sql, [name, location, rating, price, description, id], (err) => {
    if (err) return res.status(500).send(err);
    res.sendStatus(200);
  });
});

// ✅ Delete Hotel by Name
app.delete('/hotels/:name', (req, res) => {
  const { name } = req.params;
  const sql = 'DELETE FROM hotels WHERE name = ?';
  db.query(sql, [name], (err, result) => {
    if (err) return res.status(500).send(err);
    if (result.affectedRows === 0) return res.status(404).send('Hotel not found');
    res.sendStatus(200);
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
