const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

const QUOTE_FILE = path.join(__dirname, 'quotes.json');

function saveQuote(data) {
  let quotes = [];
  if (fs.existsSync(QUOTE_FILE)) {
    try {
      quotes = JSON.parse(fs.readFileSync(QUOTE_FILE));
    } catch {
      quotes = [];
    }
  }
  quotes.push({ ...data, date: new Date().toISOString() });
  fs.writeFileSync(QUOTE_FILE, JSON.stringify(quotes, null, 2));
}

app.post('/quote', (req, res) => {
  try {
    saveQuote(req.body);
    res.json({ status: 'ok' });
  } catch (e) {
    res.status(500).json({ status: 'error' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
