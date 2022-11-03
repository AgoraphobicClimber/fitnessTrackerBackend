const users = [
  { username: "Randy", password: "1234" },
  { username: "DjKhalid", password: "1234" },
  { username: "JCena", password: "12345" },
  { username: "john", password: "12345" },
];

const routines = [
  {
    creator_id: "3",
    is_public: "true",
    name: "arms/chest",
    goal: "big arms",
  },
  {
    creator_id: "2",
    is_public: "true",
    name: "Legs",
    goal: "huge legs",
  },
  {
    creator_id: "1",
    is_public: "false",
    name: "abs",
    goal: "six pack",
  },
  {
    creator_id: "1",
    is_public: "true",
    name: "stretching",
    goal: "flexible",
  },
];

const activities = [
  { name: "pull ups", description: "do pull ups" },
  { name: "bench", description: "bench press" },
  { name: "curl", description: "do curls" },
  { name: "leg press", description: "do leg press" },
  { name: "squat", description: "do squats" },
  { name: "sit ups", description: "do sit ups" },
  { name: "leg lifts", description: "do leg lifts" },
  { name: "L sit", description: "L sit" },
  { name: "hamstring", description: "touch toes" },
  {
    name: "back",
    description: "lay down with back flat, cross knee to other side",
  },
];

const routine_activities = [
  { routine_id: "1", activity_id: "1", duration: "10", count: "5" },
  { routine_id: "1", activity_id: "2", duration: "10", count: "5" },
  { routine_id: "1", activity_id: "3", duration: "10", count: "5" },
  { routine_id: "2", activity_id: "4", duration: "10", count: "5" },
  { routine_id: "2", activity_id: "5", duration: "10", count: "5" },
  { routine_id: "3", activity_id: "6", duration: "10", count: "5" },
  { routine_id: "3", activity_id: "7", duration: "10", count: "5" },
  { routine_id: "3", activity_id: "8", duration: "10", count: "5" },
  { routine_id: "4", activity_id: "9", duration: "10", count: "5" },
  { routine_id: "4", activity_id: "9", duration: "10", count: "5" },
];

module.exports = { users, activities, routines, routine_activities };
