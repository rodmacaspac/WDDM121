const apiKey = "pEfNJbOZOF8gFPG6wvNbsp1kKv7sIeKcIhCUp7z0ZhbxOcHpB3ysnH7BPbkF";

async function searchTeamMatches() {
  const teamId = document.getElementById("teamId").value;
  const apiUrl = `https://soccer.sportmonks.com/api/v2.0/teams/${teamId}/fixtures?api_token=${apiKey}`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
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
