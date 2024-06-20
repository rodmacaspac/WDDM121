const getLatestFixtures = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/fixtures");
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
  const fixtures = data.data;

  const fixtureListDiv = document.getElementById("fixture-list");

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  };

  fixtures.forEach((fixture) => {
    const fixtureDiv = document.createElement("div");
    fixtureDiv.classList.add("fixture");

    const fixtureHTML = `
        <h2>${fixture.name}</h2>
        <p><strong>Starting At:</strong> ${formatDate(fixture.starting_at)}</p>
        <p><strong>Result Info:</strong> ${fixture.result_info}</p>
        <p><strong>Venue:</strong> ${fixture.venue.name}</p>
        <p><strong>Address:</strong> ${fixture.venue.address}</p>
        <br>
      `;

    fixtureDiv.innerHTML = fixtureHTML;

    fixtureListDiv.appendChild(fixtureDiv);
  });
};
