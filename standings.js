/////////////////////////////////////////////////////////
// Replace with your actual Sportmonks API key
const API_KEY = "pEfNJbOZOF8gFPG6wvNbsp1kKv7sIeKcIhCUp7z0ZhbxOcHpB3ysnH7BPbkF";

const seasonId = "1161";

const getStandings = async () => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.sportmonks.com/v3/football/standings/?api_token=${API_KEY}`
      //`https://cors-anywhere.herokuapp.com/https://api.sportmonks.com/v3/football/standings/season/${seasonId}?api_token=${API_KEY}``

    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log("Standings: " + data);
    displayStandings(data);
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

function displayStandings(data) {
  const standingsTable = document.getElementById("standingsTable");
  data.data[0].standings.data.forEach((team) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${team.position}</td>
      <td>${team.team.data.name}</td>
      <td>${team.overall.games_played}</td>
      <td>${team.overall.won}</td>
      <td>${team.overall.draw}</td>
      <td>${team.overall.lost}</td>
      <td>${team.overall.goals_scored}</td>
      <td>${team.overall.goals_against}</td>
      <td>${team.points}</td>
    `;
    standingsTable.appendChild(row);
  });
}

getStandings();
