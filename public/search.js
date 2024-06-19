// Handle form submission
const searchForm = document.getElementById("searchForm");
searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  // Get the team name input value
  const teamName = document.getElementById("teamName").value.trim();
  console.log(teamName);

  try {
    const response = await fetch(
      `/api/search?teamName=${encodeURIComponent(teamName)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);

    displaySearchResults(data);
  } catch (error) {
    console.error("Error searching for team:", error);
    // Display an error message or handle the error appropriately
  }
});

let city_name;

// Display search results
const displaySearchResults = (data) => {
  const searchResults = document.getElementById("searchResults");
  searchResults.innerHTML = "";

  if (data.length === 0) {
    searchResults.innerHTML = "<p>No results found.</p>";
    return;
  }

  const team = data.data[0];
  console.log(team);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };
  
  city_name=team.venue.city_name;
  
  const search = `
        <h2>${team.name}</h2>
        <p><strong>Short Code:</strong> ${team.short_code}</p>
        <img src="${team.image_path}" alt="${team.name} Logo" class="team-logo">
        <p><strong>Country:</strong> ${team.country.name}</p>
        <p><strong>City:</strong> ${team.venue.city_name}</p>
        <p><strong>Stadium:</strong> ${team.venue.name}</p>
        <p><strong>Address:</strong> ${team.venue.address}</p>
        <img src="${team.venue.image_path}" alt="${
    team.name
  } Logo" class="team-logo" width="200">
        <p><strong>Latest Match:</strong> ${team.latest[0].name}</p>
        <p><strong>Starting At:</strong> ${formatDate(
          team.latest[0].starting_at
        )}</p>
        <p><strong>Result:</strong> ${team.latest[0].result_info}</p>
      `;

  searchResults.innerHTML = search;

  getWeather();
};


const getWeather = async () => {
  try {
    const response = await fetch(
      `/api/weather?city=${encodeURIComponent(city_name)}`
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
    const data = await response.json();
    console.log(data);
    displayWeather(data);
  } catch (error) {
    console.error("Error searching for team:", error);
    // Display an error message or handle the error appropriately
  }
};
const displayWeather = (data) => {
  const weatherDiv = document.getElementById("weather");
  const weatherHTML = `
      <h2>Weather in ${data.name}</h2>
      <p><strong>Temperature:</strong> ${data.main.temp} °C</p>
      <p><strong>Feels Like:</strong> ${data.main.feels_like} °C</p>
      <p><strong>Weather:</strong> ${data.weather[0].description}</p>
      <p><strong>Humidity:</strong> ${data.main.humidity}%</p>
      <p><strong>Wind Speed:</strong> ${data.wind.speed} m/s</p>
    `;
  weatherDiv.innerHTML = weatherHTML;
};
