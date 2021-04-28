import firebase from "firebase";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBn9RAruqH52g2DLBjw-VCDih9bp2n5EIM",
  authDomain: "bookbank-aba23.firebaseapp.com",
  projectId: "bookbank-aba23",
  storageBucket: "bookbank-aba23.appspot.com",
  messagingSenderId: "303147609406",
  appId: "1:303147609406:web:ad8636890f96c6f255506f"
};


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  
  const auth = firebase.auth();
  
  export { db, auth };