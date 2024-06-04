// Replace with your actual Sportmonks API key
const API_KEY = "pEfNJbOZOF8gFPG6wvNbsp1kKv7sIeKcIhCUp7z0ZhbxOcHpB3ysnH7BPbkF";

const countryid = "1161";
const getTeams = async () => {
  try {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.sportmonks.com/v3/football/fixtures?page=10?api_token=${API_KEY}`
      //`https://cors-anywhere.herokuapp.com/https://api.sportmonks.com/v3/football/teams/countries/${countryid}?api_token=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(data);
    displayFixtures(data);
  } catch (error) {
    console.error("Error fetching teams:", error);
  }
};

// Fetch and log the teams to find the team ID
//getTeams();

const getLatestFixtures = async () => {
  try {
    // Get today's date
    const today = new Date();
    const endDate = today.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    // Set the start date to fetch matches from a week ago
    const startDate = new Date(today.setDate(today.getDate() - 50))
      .toISOString()
      .split("T")[0]; // Format: YYYY-MM-DD

    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://api.sportmonks.com/v3/football/fixtures/between/${startDate}/${endDate}?api_token=${API_KEY}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok " + response.statusText);
    }
    const data = await response.json();
    console.log(data);
    displayFixtures(data);
  } catch (error) {
    console.error("Error fetching latest fixtures:", error);
  }
};

// Fetch and display the latest fixtures
getLatestFixtures();

const displayFixtures = (data) => {
  //const fixtures = JSON.parse(jsonResponse).data;
  const fixtures = data.data;

  // Get the div where fixture list will be displayed
  const fixtureListDiv = document.getElementById("fixture-list");

  // Function to format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  // Loop through fixture data and create HTML elements
  fixtures.forEach((fixture) => {
    // Create a div for each fixture
    const fixtureDiv = document.createElement("div");
    fixtureDiv.classList.add("fixture");

    // Create HTML content for the fixture
    const fixtureHTML = `
                <h2>${fixture.name}</h2>
                <p><strong>Starting At:</strong> ${formatDate(
                  fixture.starting_at
                )}</p>
                <p><strong>Result Info:</strong> ${fixture.result_info}</p>
            `;

    // Set the HTML content to the fixture div
    fixtureDiv.innerHTML = fixtureHTML;

    // Append the fixture div to the fixture list div
    fixtureListDiv.appendChild(fixtureDiv);
  });
};
