import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Routines from "./Routines";
import SingleRoutine from "./SingleRoutine";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/routines/:id" element={<SingleRoutine />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
