import { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Home";
import Routines from "./Routines";
import SingleRoutine from "./SingleRoutine";
import { NavBar } from "./NavBar";
import NewRoutine from "./NewRoutine";
import { Login } from "./Login";
import { Register } from "./Register";
import { EditRoutine } from "./EditRoutine";
import Activities from "./Activities";
import MyRoutines from "./MyRoutines";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="App">
      <NavBar />
      <Routes>
        <Route>
          <Route path="/" element={<Home />} />
          <Route path="/routines" element={<Routines />} />
          <Route path="/routines/:id" element={<SingleRoutine />} />
          <Route path="/newroutine" element={<NewRoutine />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/editroutine/:id" element={<EditRoutine />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/myroutines" element={<MyRoutines />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
