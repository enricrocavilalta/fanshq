const express = require('express');
const router = express.Router();
const dbPromise = require('../db'); // changed from require('../db') to match the new promise-based connection

// CREATE
router.post('/', async (req, res) => {
  const db = await dbPromise;

  const {
    user_id,
    type,
    title,
    description,
    url,
    external_link,
    thumbnail_url,
    price,
    visibility
  } = req.body;

  try {
    const [result] = await db.execute(
      `INSERT INTO posts
        (user_id, type, title, description, url, external_link, thumbnail_url, price, visibility, created_at, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, NOW(), NOW())`,
      [user_id, type, title, description, url, external_link, thumbnail_url, price, visibility]
    );

    const [checkRows] = await db.execute('SELECT * FROM posts ORDER BY created_at DESC LIMIT 5');
    console.log('📋 Last 5 posts after insert:', checkRows);

    res.status(201).json({ id: result.insertId });
  } catch (err) {
    console.error('Insert error:', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router; // <- ❗ Don't forget this line!
