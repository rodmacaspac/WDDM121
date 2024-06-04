/*
const apiKey = "pEfNJbOZOF8gFPG6wvNbsp1kKv7sIeKcIhCUp7z0ZhbxOcHpB3ysnH7BPbkF";

async function searchTeamMatches() {
  const teamId = document.getElementById("teamId").value;
  //const apiUrl = `https://soccer.sportmonks.com/api/v2.0/teams/${teamId}/fixtures?api_token=${apiKey}`;

  //const apiUrl = `https://api.sportmonks.com/v3/football/fixtures?api_token=${apiKey}`;

  //const apiUrl = `https://cors-anywhere.herokuapp.com/https://api.sportmonks.com/v3/football/fixtures?api_token=${apiKey}`;

  const apiUrl = `https://api.sportmonks.com/v3/football/fixtures/search/${teamId}?api_token=${apiKey}`;

  

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log("Data: " + data);
    displayResults(data);
  } catch (error) {
    console.error("Error fetching team matches:", error);
  }
}

function displayResults(data) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";
  data.data.forEach((match) => {
    const matchElement = document.createElement("div");
    matchElement.innerHTML = `
                    <p>Match ID: ${match.id}</p>
                    <p>Date: ${match.time.starting_at.date_time}</p>
                    <p>Home Team: ${match.localTeam.data.name}</p>
                    <p>Away Team: ${match.visitorTeam.data.name}</p>
                    <hr>
                `;
    resultsDiv.appendChild(matchElement);
  });
}
*/

// Replace with your actual Sportmonks API key
const API_KEY = "pEfNJbOZOF8gFPG6wvNbsp1kKv7sIeKcIhCUp7z0ZhbxOcHpB3ysnH7BPbkF";

const getTeams = async () => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.sportmonks.com/v3/football/teams?api_token=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

// Fetch and log the teams to find the team ID
getTeams();
/////////////////////////////////////////////////////////////////////////////////////////
// Replace with the team ID you want to get fixtures for
const TEAM_ID = "your_team_id";

const getTeamFixtures = async (teamId) => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.sportmonks.com/v3/football/teams/${teamId}/fixtures?api_token=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    displayFixtures(data);
  } catch (error) {
    console.error("Error fetching team fixtures:", error);
  }
};

const displayFixtures = (data) => {
  const fixturesDiv = document.getElementById("fixtures");
  fixturesDiv.innerHTML = "";

  data.forEach((fixture) => {
    const fixtureElement = document.createElement("div");
    fixtureElement.innerHTML = `
            <p>Match: ${fixture.home_team.name} vs ${fixture.away_team.name}</p>
            <p>Date: ${new Date(fixture.start_time).toLocaleString()}</p>
        `;
    fixturesDiv.appendChild(fixtureElement);
  });
};

// Fetch and display the fixtures for the specified team
getTeamFixtures(TEAM_ID);
