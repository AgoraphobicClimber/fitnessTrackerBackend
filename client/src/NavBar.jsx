import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "./helpers";
import { useUsers } from "./hooks/useUsers";

export function NavBar() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, users } = useUsers();
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
        <Link to="/activities" className="routines">
          Activities
        </Link>

        {!loggedIn ? (
          <>
            <Link to="/login" className="login">
              Login
            </Link>

            <Link to="/Register" className="register">
              Register
            </Link>
          </>
        ) : null}
        {loggedIn ? (
          <>
            <Link to="/newroutine" className="newroutine">
              Create a Routine
            </Link>

            <Link to="/user" className="user">
              Your Profile
            </Link>
            <Link to="/myroutines" className="myroutines">
              My Routines
            </Link>
            <button
              className="logout"
              onClick={() => {
                logOutUser();
                setLoggedIn(false);

                navigate("/");
              }}
            >
              Logout
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
