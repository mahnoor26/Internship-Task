import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyBl8cPBQ8UUGyxN8QqGZdinb8_utcnsocM",
    authDomain: "fyp-signup.firebaseapp.com",
    projectId: "fyp-signup",
    storageBucket: "fyp-signup.appspot.com",
    messagingSenderId: "628853107598",
    appId: "1:628853107598:web:30a8017c328d49951dd2df",
    measurementId: "G-GNECNHB4GM"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export { auth, provider };