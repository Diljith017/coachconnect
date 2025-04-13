// Import Firebase
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.6.0/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyAhzhUNH3dzWTAdFFii3SXbMk13jyGb93Y",
  authDomain: "coach-connect-69cdc.firebaseapp.com",
  projectId: "coach-connect-69cdc",
  storageBucket: "coach-connect-69cdc.appspot.com",
  messagingSenderId: "179828972083",
  appId: "1:179828972083:web:7b6a0deed2e58c61a42146"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Signup Function
window.signUp = function () {
  const email = document.getElementById("signupEmail").value;
  const password = document.getElementById("signupPassword").value;

  createUserWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Signup Successful");
      window.location.href = "home.html"; // redirect after login
    })
    .catch(error => {
      alert(error.message);
    });
};

// Login Function
window.login = function () {
  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  signInWithEmailAndPassword(auth, email, password)
    .then(userCredential => {
      alert("Login Successful");
      window.location.href = "home.html";
    })
    .catch(error => {
      alert(error.message);
    });
};
