import { getAuth } from "firebase/auth";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAWXpwz4bf1CxK0LkBZ2LIWQzTfwDu9PzU",
  authDomain: "academy-djagora-project.firebaseapp.com",
  projectId: "academy-djagora-project",
  storageBucket: "academy-djagora-project.firebasestorage.app",
  messagingSenderId: "253081297502",
  appId: "1:253081297502:web:6f4ebfb9ef4d2ce9804acf",
  measurementId: "G-DBSCY50SLC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
export { auth , analytics, app as default};   
