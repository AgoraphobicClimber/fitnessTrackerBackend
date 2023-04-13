import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { logOutUser } from "./helpers";
import { useUsers } from "./hooks/useUsers";
import styles from "./componentCss/Navbar.module.css";

export function NavBar() {
  const navigate = useNavigate();
  const { loggedIn, setLoggedIn, users } = useUsers();
  return (
    <div className={styles.container}>
      <div className={styles.links}>
        <Link className={styles.link} to="/">
          Home
        </Link>
        <Link to="/routines" className={styles.link}>
          Routines
        </Link>
        <Link to="/activities" className={styles.link}>
          Activities
        </Link>

        {!loggedIn ? (
          <>
            <Link to="/login" className={styles.link}>
              Login
            </Link>

            <Link to="/Register" className={styles.link}>
              Register
            </Link>
          </>
        ) : null}
        {loggedIn ? (
          <>
            <Link to="/newroutine" className={styles.link}>
              Create a Routine
            </Link>

            <Link to="/myroutines" className={styles.link}>
              My Routines
            </Link>
            <button
              className={styles.logout}
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
