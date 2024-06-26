const getLeagueStandings = async () => {
  try {
    const response = await fetch('http://localhost:3000/api/standings');
    if (!response.ok) {
      throw new Error("Server responded with error: " + response.status);
    }
    const data = await response.json();
    displayStandings(data);
  } catch (error) {
    console.error("Error fetching league standings:", error);
  }
};

const displayStandings = (data) => {
  const standings = data.data;

  // Get the tbody element where the standings will be displayed
  const standingsTable = document.getElementById("standingsTable");

  // Clear any existing rows
  standingsTable.innerHTML = '';

  // Loop through standings data and create table rows
  standings.forEach((standing, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td><img src="${standing.participant.image_path}" alt="${standing.participant.name} Logo" class="team-logo"width="100"></td>
      <td>${standing.participant.name}</td>
      <td>${standing.points}</td>
    `;

    standingsTable.appendChild(row);
  });
};

// Fetch and display the league standings
getLeagueStandings();
