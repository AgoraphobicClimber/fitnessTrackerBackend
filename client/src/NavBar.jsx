import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export function NavBar() {
  const navigate = useNavigate();
  return (
    <div className="container">
      <h2>Fitness Tracker</h2>
      <div className="links">
        <Link to="/" className="home">
          Home
        </Link>
        <Link to="/routines" className="routines">
          Routines
        </Link>
        <Link to="/newroutine" className="newroutine">
          Create a Routine
        </Link>
      </div>
    </div>
  );
}
