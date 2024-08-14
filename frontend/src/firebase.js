// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDHPLwLIyvAXAbA22m4SD0PtMfxF86aqno",
  authDomain: "bookswap-1a809.firebaseapp.com",
  projectId: "bookswap-1a809",
  storageBucket: "bookswap-1a809.appspot.com",
  messagingSenderId: "914735304028",
  appId: "1:914735304028:web:a8a6fb30e5e297422ec599"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;