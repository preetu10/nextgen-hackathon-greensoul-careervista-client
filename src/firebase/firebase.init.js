// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAhUp0ou__KbI6PlSNW8ow4IZOh-AXlevI",
  authDomain: "hackathon-39f93.firebaseapp.com",
  projectId: "hackathon-39f93",
  storageBucket: "hackathon-39f93.firebasestorage.app",
  messagingSenderId: "507547086875",
  appId: "1:507547086875:web:6a9dbdbb6b297a0e6548be"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
export default auth;