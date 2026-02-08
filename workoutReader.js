const fs = require("fs");
const csv = require("csv-parser");

async function workoutCalculator(path) {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(path)
      .pipe(csv())
      .on("data", (row) => results.push(row))
      .on("end", () => {
        let totalMinutes = 0;

        for (let workout of results) {
          totalMinutes += Number(workout.minutes);
        }

        resolve({
          totalWorkouts: results.length,
          totalMinutes
        });
      })
      .on("error", (err) => {
        reject(new Error("Error reading workout CSV: " + err.message));
      });
  });
}

module.exports = { workoutCalculator };
