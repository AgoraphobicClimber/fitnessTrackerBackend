async function fetchRoutines() {
  const response = await fetch("/routes/routines"),
    result = await response.json();
  return result;
}
export default fetchRoutines;

export async function fetchRoutine(id) {
  const response = await fetch(`/routes/routines/${id}`),
    result = await response.json();
  return result;
}

export async function fetchMe() {
  const response = await fetch("/api/users/me", {
    headers: {
      "Content-Type": "application.json",
    },
  });
  const result = await response.json();
  return result;
}

export async function registerUser(username, password) {
  const response = await fetch("/routes/users/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const result = await response.json();
  return result;
}

export async function loginUser(username, password) {
  const response = await fetch("/routes/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username,
      password,
    }),
  });
  const result = await response.json();
  return result;
}

export async function logOutUser() {
  const response = await fetch("/routes/users/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export async function deleteRoutine() {
  const response = await fetch("routes/routine_activities/:routineActivityId", {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}
