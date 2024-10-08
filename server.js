const express = require('express');
const cors = require('cors');
const path = require('path');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

// Replace with your actual Sportmonks API key
const API_KEY = "pEfNJbOZOF8gFPG6wvNbsp1kKv7sIeKcIhCUp7z0ZhbxOcHpB3ysnH7BPbkF";
const WEATHER_API_KEY = "bdaf16129d27ee10052d17781d9bbaf5";
const CURRENCY_API_KEY = "2424e51a1db349e9aaf9881485d65770";
const seasonId = "19735";

app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(cookieParser());
app.use(session({
  secret: 'b349e9aaf98',
  resave: false,
  saveUninitialized: true,
}));

// Middleware to check if user is authenticated
function isAuthenticated(req, res, next) {
  if (req.session.loggedin) {
    return next();
  } else {
    res.redirect('/page-6?message=You must log in to view this page');
  }
}

app.get('/api/fixtures', async (req, res) => {
  const fetch = (await import('node-fetch')).default; // Dynamic import
  try {
    // Get today's date
    const today = new Date();
    const endDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    // Set the start date to fetch matches from a week ago
    const startDate = new Date(today.setDate(today.getDate() - 28))
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

// Endpoint to fetch weather data
app.get('/api/weather', async (req, res) => {
  const { city } = req.query;

  try {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${WEATHER_API_KEY}&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching weather:', error);
    res.status(500).json({ error: 'Error fetching weather data' });
  }
});
const base = "CAD";
// Endpoint to fetch currency data
app.get('/api/currency', async (req, res) => {
  const { currency } = req.query;

  try {
    const response = await fetch(
      `https://api.currencyfreaks.com/v2.0/rates/latest?apikey=${CURRENCY_API_KEY}&symbols=${currency}`
    );
    
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('Error fetching currency:', error);
    res.status(500).json({ error: 'Error fetching currency data' });
  }
});

app.get('/test', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'test.html'));

});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});


app.get('/page-2', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-2.html'));
});

app.get('/page-3',isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-3.html'));
});
app.get('/page-4', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-4.html'));
});
app.get('/page-5', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-5.html'));
});

app.get('/page-6', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-6.html'));
});


app.get('/page-7', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-7.html'));
});

app.get('/page-8', isAuthenticated, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'page-8.html'));
});

app.get('/logged', (req, res) => {
  req.session.loggedin = true;
  res.sendFile(path.join(__dirname, 'public', 'logged.html'));
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
