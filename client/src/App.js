import React from "react";
import { Header } from "./components/Header";
import { Row } from "./components/Row";
import "./App.css";

function App() {
  return (
    <div className="container-fluid p-0">
      <Header />
      <Row />
    </div>
  );
}

export default App;
