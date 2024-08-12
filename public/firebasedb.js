// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBmgm8uG9CBHB8U4uVJNReSDh539kRO_Po",
  authDomain: "wddm121-project.firebaseapp.com",
  databaseURL: "https://wddm121-project-default-rtdb.firebaseio.com",
  projectId: "wddm121-project",
  storageBucket: "wddm121-project.appspot.com",
  messagingSenderId: "511047255239",
  appId: "1:511047255239:web:c0f391bbbb9971c5da6ae2",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();

// Function to read data from Firebase and display it
function fetchData() {
  const cachedEmail = localStorage.getItem("signedInUserEmail") || "";
  console.log("Cached email:", cachedEmail);

  if (!cachedEmail) {
    console.log('No cached email found.');
    return;
}

  const historyRef = database.ref("history");
  historyRef.on(
    "value",
    (snapshot) => {
      const data = snapshot.val();
      const dataDisplay = document.getElementById("dataDisplay");
      dataDisplay.innerHTML = ""; // Clear existing data

      let index = 1;
      for (const key in data) {
        if (data.hasOwnProperty(key) && cachedEmail == data[key].email) {
            const entry = data[key];
            const div = document.createElement("div");

            div.classList.add("data-row");
            div.innerHTML = `${index}: <strong>Team Name:</strong> ${entry.team_name}, 
                          <strong>Date and Time:</strong> ${entry.date_Time} 
                          <button class="delete-button" onclick="deleteEntry('${key}')">Delete</button>
                          <div class="update-section">
                            <input type="text" class="update-input" id="update-${key}" placeholder="New Team Name" />
                            <button class="update-button" onclick="updateTeamName('${key}')">Update</button>
                          </div>`;


            dataDisplay.appendChild(div);
            index++;
        }
    }
    },
    (error) => {
      console.error("Error reading data:", error);
      document.getElementById("dataDisplay").innerText = "Error loading data";
    }
  );
}


// Function to delete an entry from Firebase
function deleteEntry(key) {
  const historyRef = database.ref("history/" + key);
  historyRef.remove()
    .then(() => {
      console.log("Data removed successfully.");
      fetchData(); // Refresh the displayed data
    })
    .catch((error) => {
      console.error("Error deleting data:", error);
    });
}

// Function to update the team name in Firebase
function updateTeamName(key) {
  const newTeamName = document.getElementById(`update-${key}`).value.trim();

  if (newTeamName) {
    const historyRef = database.ref("history/" + key);
    historyRef.update({ team_name: newTeamName })
      .then(() => {
        console.log("Team name updated successfully.");
        fetchData(); // Refresh the displayed data
      })
      .catch((error) => {
        console.error("Error updating team name:", error);
      });
  } else {
    alert("Please enter a new team name.");
  }
}

// Call the function to fetch and display data
fetchData();
