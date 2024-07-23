
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

//Create a location on database called contactForm
var contactFormDB = firebase.database().ref("contactForm");

document.getElementById("contactForm").addEventListener("submit", submitForm);

//When we submit the form
//Get the values that were entered in the form
function submitForm(e) {
  e.preventDefault(); //stop my form from submitting
  //stay on same page

  //extract the values
  var name = getElementVal("name");
  var emailid = getElementVal("emailid");
  var msgContent = getElementVal("msgContent");

  //save the values in firebase
  saveMessages(name, emailid, msgContent);

  document.querySelector(".alert").style.display = "block";

  setTimeout(() => {
    document.querySelector(".alert").style.display = "none";
  }, 3000);

  document.getElementById("contactForm").reset(); //clear the contact form
}

//Save the values entered to Firebase
const saveMessages = (name, emailid, msgContent) => {
  //Pushing to our database ref on firebase
  var newContactForm = contactFormDB.push();

  //Set the values to push
  newContactForm.set({
    name: name,
    emailid: emailid,
    msgContent: msgContent,
  });
};

//Get the value that was entered within the input
const getElementVal = (id) => {
  return document.getElementById(id).value;
};
