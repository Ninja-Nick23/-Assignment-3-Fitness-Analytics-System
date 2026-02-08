const { workoutCalculator } = require("./workoutReader");

test("reads valid CSV file", async () => {
  const result = await workoutCalculator("./data/workouts.csv");
  expect(result.totalWorkouts).toBeGreaterThan(0);
});

test("throws error for missing CSV", async () => {
  await expect(workoutCalculator("missing.csv"))
    .rejects
    .toThrow();
});
