require("dotenv").config();
const app = require("./app");
const connectDB = require("./config/db");
const cron = require("node-cron");
const Job = require("./models/Job");

connectDB();

// Auto delete expired jobs daily
cron.schedule("0 0 * * *", async () => {
  await Job.deleteMany({ last_date: { $lt: new Date() } });
  console.log("Old jobs removed");
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Keep alive — must be here, after server starts
const https = require("https");
setInterval(() => {
  https.get("https://govtjobs-backend.onrender.com/api/health", (res) => {
    console.log("Keep-alive ping:", res.statusCode);
  }).on("error", (err) => {
    console.log("Keep-alive failed:", err.message);
  });
}, 10 * 60 * 1000);