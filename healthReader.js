const fs = require("fs").promises;

async function healthMetricsCounter(path) {
  try {
    const data = await fs.readFile(path, "utf-8");
    const json = JSON.parse(data);

    return {
      totalEntries: json.length
    };
  } catch (err) {
    throw new Error("Error reading health data: " + err.message);
  }
}

module.exports = { healthMetricsCounter };
