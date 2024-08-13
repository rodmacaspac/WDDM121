// Your web app's Firebase configuration
var firebaseConfig = {
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
var storage = firebase.storage();

document.getElementById("uploadButton").addEventListener("click", function () {
  var file = document.getElementById("imageUpload").files[0];
  if (!file) {
    alert("Please select an image to upload.");
    return;
  }

  var storageRef = storage.ref("newstadiumrequest/" + file.name);
  var uploadTask = storageRef.put(file);

  uploadTask.on(
    "state_changed",
    function (snapshot) {
      // Handle upload progress
    },
    function (error) {
      // Handle unsuccessful uploads
      console.error("Upload failed:", error);
    },
    function () {
      // Handle successful uploads
      uploadTask.snapshot.ref.getDownloadURL().then(function (downloadURL) {
        console.log("File available at", downloadURL);
      });
      alert('New stadium request sent');
    }
  );
});
