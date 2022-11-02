const users = [
  { id: "1", username: "Randy", password: "1234" },
  { id: "2", username: "DjKhalid", password: "1234" },
  { id: "3", username: "JCena", password: "12345" },
];

const routines = [
  {
    id: "1",
    creator_id: "3",
    is_public: "true",
    name: "arms/chest",
    goal: "20",
  },
  { id: "2", creator_id: "2", is_public: "true", name: "Legs", goal: "15" },
  { id: "3", creator_id: "1", is_public: "false", name: "abs", goal: "999" },
];

const activities = [
  { id: "1", name: "pull ups", description: "do pull ups" },
  { id: "2", name: "bench", description: "bench press" },
  { id: "3", name: "curl", description: "do curls" },
  { id: "4", name: "leg press", description: "do leg press" },
  { id: "5", name: "squat", description: "do squats" },
  { id: "6", name: "sit ups", description: "do sit ups" },
  { id: "7", name: "leg lifts", description: "do leg lifts" },
  { id: "8", name: "L sit", description: "L sit" },
];

const routine_activities = [
  { id: "1", routine_id: "1", activity_id: "1", duration: "10", count: "5" },
  { id: "2", routine_id: "1", activity_id: "2", duration: "10", count: "5" },
  { id: "3", routine_id: "1", activity_id: "3", duration: "10", count: "5" },
  { id: "4", routine_id: "2", activity_id: "4", duration: "10", count: "5" },
  { id: "5", routine_id: "2", activity_id: "5", duration: "10", count: "5" },
  { id: "6", routine_id: "3", activity_id: "6", duration: "10", count: "5" },
  { id: "7", routine_id: "3", activity_id: "7", duration: "10", count: "5" },
  { id: "8", routine_id: "3", activity_id: "8", duration: "10", count: "5" },
];

module.exports = { users, activities, routines, routine_activities };
