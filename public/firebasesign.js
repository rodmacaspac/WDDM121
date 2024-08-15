// Import the functions you need from the SDKs you need
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyBmgm8uG9CBHB8U4uVJNReSDh539kRO_Po",
  authDomain: "wddm121-project.firebaseapp.com",
  projectId: "wddm121-project",
  storageBucket: "wddm121-project.appspot.com",
  messagingSenderId: "511047255239",
  appId: "1:511047255239:web:c0f391bbbb9971c5da6ae2"
});

// Initialize Firebase
const auth = firebaseApp.auth();

const signUp = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  console.log(email, password);

  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then((result) => {
      //If successful
      
      alert("You are Signed up");
      window.location.href = "/";
      console.log(result);
    })
    .catch((error) => {
      //If error
      console.log(error.code);
      console.log(error.message);

      alert("Invalid Input");
    });
};

const signIn = () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then((result) => {
      //Signed in
      alert("You are Logged In");
      window.location.href = "/logged";
      
      console.log(result);

      saveEmailToCache(email);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);

      alert("Invalid Login Credentials");
    });
};

const saveEmailToCache = (email) => {
  localStorage.setItem('signedInUserEmail', email);
  console.log('User email saved to cache');
};

const signOut = () => {
  firebase.auth().signOut().then(() => {
      // Sign-out successful.
      alert("You are Signed Out");
      console.log("Signed out");
      clearCache();
  }).catch((error) => {
      // An error happened.
      alert(`Error: ${error.message}`);
      console.error("Error signing out:", error);
  });
};

const clearCache = () => {
  localStorage.removeItem('signedInUserEmail');
  console.log('Cache cleared');
};