const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000;

// Replace with your actual Sportmonks API key
const API_KEY = "pEfNJbOZOF8gFPG6wvNbsp1kKv7sIeKcIhCUp7z0ZhbxOcHpB3ysnH7BPbkF";
const seasonId = "19735";

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/fixtures', async (req, res) => {
  const fetch = (await import('node-fetch')).default; // Dynamic import
  try {
    // Get today's date
    const today = new Date();
    const endDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    // Set the start date to fetch matches from a week ago
    const startDate = new Date(today.setDate(today.getDate() - 24))
      .toISOString()
      .split("T")[0]; // Format: YYYY-MM-DD

    const response = await fetch(
      `https://api.sportmonks.com/v3/football/fixtures/between/${startDate}/${endDate}?api_token=${API_KEY}&include=venue;`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching latest fixtures:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/standings', async (req, res) => {
  const fetch = (await import('node-fetch')).default; // Dynamic import
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/standings/seasons/${seasonId}?api_token=${API_KEY}&include=participant`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error("Error fetching standings:", error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/search', async (req, res) => {
  const fetch = (await import('node-fetch')).default; // Dynamic import
  const { teamName } = req.query;
  
  try {
    const response = await fetch(
      `https://api.sportmonks.com/v3/football/teams/search/${teamName}?api_token=${API_KEY}&include=latest;country;venue`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();

    res.json(data);

  } catch (error) {
    console.error('Error searching for team:', error);
    res.status(500).json({ error: 'Error searching for team' });
  }
});



app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test.html'));

});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});
app.get('/page-2', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-2.html'));
});
app.get('/page-3', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-3.html'));
});
app.get('/page-4', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-4.html'));
});
app.get('/page-5', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-5.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
