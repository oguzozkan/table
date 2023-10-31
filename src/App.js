import "./App.css";
import React from "react";

import UserDashboard from "./views/UserDashboard/UserDashboard";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <UserDashboard />
      </header>
    </div>
  );
}

export default App;
