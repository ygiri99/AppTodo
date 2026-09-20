import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Navbar from "./components/Navbar";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <div>
              <Home />
            </div>
          }
        />
      </Routes>
    </>
  );
}

export default App;
