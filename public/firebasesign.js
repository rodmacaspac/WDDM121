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
      document.write("You are Signed up");
      console.log(result);
    })
    .catch((error) => {
      //If error
      console.log(error.code);
      console.log(error.message);
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
      document.write("You are Signed In");
      console.log(result);

      saveEmailToCache(email);
    })
    .catch((error) => {
      console.log(error.code);
      console.log(error.message);
    });
};

const saveEmailToCache = (email) => {
  localStorage.setItem('signedInUserEmail', email);
  console.log('User email saved to cache');
};
