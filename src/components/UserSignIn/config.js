import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
    apiKey: "AIzaSyDPhYRBv9v2Wn9VFS1h325gnFawpeV4EDI",
    authDomain: "signup-auth-68e74.firebaseapp.com",
    projectId: "signup-auth-68e74",
    storageBucket: "signup-auth-68e74.appspot.com",
    messagingSenderId: "1000345210591",
    appId: "1:1000345210591:web:454080d8ba97dbfcf1e36a",
    measurementId: "G-NHZPWMZGQ2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
const auth = getAuth(app)
const provider = new GoogleAuthProvider();
export { auth, provider };