import React from "react";
import { useState } from "react";
import "./App.css";
import { Input } from "./components/Input";
import FrontPage from "./containers/FrontPage/FrontPage";
import ChatPage from "./containers/ChatPage/ChatPage";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

function App() {
  const [logged, setLogged] = useState("false");

  if (logged === "true") {
    return (
      <div className="App">
        <header className="App-header">
          <ChatPage />
        </header>
      </div>
    );
  } else {
    return (
      <div className="App">
        <header className="App-header">
          <FrontPage />
        </header>
      </div>
    );
  }
}

export default App;
