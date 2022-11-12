import { useContext } from "react";
import UsersContext from "../context/UsersContext";

export const useUsers = () => {
  const { users, setUsers, loggedIn, setLoggedIn } = useContext(UsersContext);

  return { users, setUsers, loggedIn, setLoggedIn };
};
