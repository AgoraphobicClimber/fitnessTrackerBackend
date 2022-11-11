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
