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
  const response = await fetch("/routes/users/me", {
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

export async function deleteRoutine(id) {
  const response = await fetch(`/routes/routines/${id}`, {
    method: "Delete",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const result = await response.json();
  return result;
}

export const createRoutine = async (is_public, name, goal) => {
  const response = await fetch("/routes/routines", {
    method: "Post",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_public,
      name,
      goal,
    }),
  });
  const result = await response.json();
  return result;
};

export const editRoutine = async (id, is_public, name, goal) => {
  const response = await fetch(`/routes/routines/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      is_public,
      name,
      goal,
    }),
  });
  const result = await response.json();

  return result;
};
