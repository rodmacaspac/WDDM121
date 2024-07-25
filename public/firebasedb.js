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
            div.innerHTML = `${index}: <strong>Team Name:</strong> ${entry.team_name}, <strong>Date and Time:</strong> ${entry.date_Time}`;
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

// Call the function to fetch and display data
fetchData();
