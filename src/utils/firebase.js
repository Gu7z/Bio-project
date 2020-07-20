import firebase from "firebase/app";
import "firebase/database";
import "firebase/analytics";

var firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  authDomain: process.env.AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: "G-BD9N0CTJNT",
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();

const getDataFromDataBase = (database, setResponse) => {
  const query = firebase.database().ref(database);
  
  query.on("value", (dataSnapshot) => {
    const data = dataSnapshot.val();
    setResponse(data);
  });
};

export default getDataFromDataBase;
