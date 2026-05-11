const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");

const app = express();

app.use(cors());
app.use(express.json());

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100
  })
);

app.get("/api/health", (req, res) => res.json({ status: "ok" }));
app.use("/api/jobs", require("./routes/jobRoutes"));
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));
app.use("/api/user",require("./routes/userRoutes"));
app.use("/api/updates", require("./routes/admitCardRoutes"));
app.use("/api/current-affairs",require("./routes/currentAffairRoutes"));
app.use("/api/quizzes",require("./routes/quizRoutes"));
app.use("/api/notes",require("./routes/noteRoutes"));
module.exports = app;