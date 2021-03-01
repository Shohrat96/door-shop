import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/database";
import "firebase/storage";

var firebaseConfig = {
    apiKey: "AIzaSyBX7smDm6KUkyspveI7jOvLlFUVPrXUGDw",
    authDomain: "door-project-d255b.firebaseapp.com",
    projectId: "door-project-d255b",
    storageBucket: "door-project-d255b.appspot.com",
    messagingSenderId: "670649459192",
    appId: "1:670649459192:web:aa0cf47136df937223360d",
    measurementId: "G-ZV1L1QNM8M"
  };
  // Initialize Firebase
firebase.initializeApp(firebaseConfig);
const App = {
    root: firebase,
    db: firebase.database(),
    auth: firebase.auth(),
    storage: firebase.storage(),
  };
export default App;