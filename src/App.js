import React, { useEffect, useState } from "react";
import firebase from "firebase";
import getDataFromDataBase from "./utils/firebase";
import RenderedMap from "./components/map";

function App() {
  const [database, setDataBase] = useState(firebase);

  useEffect(() => {
    getDataFromDataBase("arvores", (databaseFromFirebase) => {
      const newDatabase = [];
      Object.entries(databaseFromFirebase).map((trees) => {
        newDatabase.push(trees[1]);
      });
      setDataBase(newDatabase);
    });
  }, []);

  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <RenderedMap trees={database} />
    </div>
  );
}

export default App;
