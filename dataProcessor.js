require("dotenv").config();
const { workoutCalculator } = require("./workoutReader");
const { healthMetricsCounter } = require("./healthReader");

async function processFiles() {
  try {
    console.log(`Processing data for: ${process.env.USER_NAME}`);

    console.log("📁 Reading workout data...");
    const workoutData = await workoutCalculator("./data/workouts.csv");
    console.log("Total workouts:", workoutData.totalWorkouts);
    console.log("Total minutes:", workoutData.totalMinutes);

    console.log("📁 Reading health data...");
    const healthData = await healthMetricsCounter("./data/health.json");
    console.log("Total health entries:", healthData.totalEntries);

    console.log("\n=== SUMMARY ===");
    console.log("Workouts found:", workoutData.totalWorkouts);
    console.log("Total workout minutes:", workoutData.totalMinutes);
    console.log("Health entries found:", healthData.totalEntries);
    console.log("Weekly goal:", process.env.WEEKLY_GOAL);

    if (workoutData.totalMinutes >= Number(process.env.WEEKLY_GOAL)) {
      console.log(`🎉 Congratulations ${process.env.USER_NAME}! You have exceeded your weekly goal!`);
    } else {
      console.log(`Keep going ${process.env.USER_NAME}, you can do it!`);
    }

  } catch (err) {
    console.error("Error:", err.message);
  }
}

processFiles();
