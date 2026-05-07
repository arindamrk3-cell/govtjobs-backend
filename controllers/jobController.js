const Job = require("../models/Job");
const User = require("../models/User");
const sendPush = require("../services/pushService");
// Get jobs
exports.getJobs = async (req, res) => {
  try {
    const { state, qualification, page = 1, limit = 10 } = req.query;

    let filter = {
      verified: true,
      last_date: { $gte: new Date() }
    };

    if (state) filter.state = state;
    if (qualification) filter.qualification = qualification;

    const jobs = await Job.find(filter)
      .sort({ created_at: -1 })
      .skip((page - 1) * limit)
      .limit(parseInt(limit));

    res.json(jobs);
    console.log("job data taken");
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.addJob = async (req, res) => {
  try {
    const exists = await Job.findOne({ link: req.body.link });

    if (exists) {
      return res.json({ message: "Job already exists" });
    }

    const job = new Job(req.body);
    await job.save();

    // 🔥 PERSONALIZED USERS
    const users = await User.find({
      pushToken: { $ne: null },
      $and: [
        {
          $or: [
            { state: job.state },
            { state: "All" }
          ]
        },
        {
          $or: [
            { qualification: job.qualification },
            { qualification: "All" }
          ]
        }
      ]
    });

    const tokens = users.map(u => u.pushToken);

    if (tokens.length > 0) {
      await sendPush(
        tokens,
        "🔥 New Govt Job",
        `${job.title} released!`
      );
    }

    res.json({ message: "Job added + notification sent" });
    console.log("job added + personalized notification sent");

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.searchJobs = async (req, res) => {
  try {
    const { keyword } = req.query;

    const jobs = await Job.find({
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { organization: { $regex: keyword, $options: "i" } },
        { qualification: { $regex: keyword, $options: "i" } },
        { state: { $regex: keyword, $options: "i" } }
      ]
    });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Bookmark
exports.bookmarkJob = async (req, res) => {
  const user = await User.findById(req.user.id);
  console.log("USER in bookmrk:", req.user);

  if (!user.bookmarks.some(id => id.toString() === req.params.jobId)) {

    user.bookmarks.push(req.params.jobId);
    await user.save();
  }

  res.json({ message: "Bookmarked" });
  console.log("bookmarked");
};

// Get bookmarks
exports.getBookmarks = async (req, res) => {
  const user = await User.findById(req.user.id).populate("bookmarks");
  const valid=user.bookmarks.filter(b => b !== null);
  res.json(valid);
};
exports.getCategories = async (req, res) => {
  try {
    const states = await Job.aggregate([
      { $group: { _id: "$state", count: { $sum: 1 } } }
    ]);

    const organizations = await Job.aggregate([
      { $group: { _id: "$organization", count: { $sum: 1 } } }
    ]);

    const qualifications = await Job.aggregate([
      { $group: { _id: "$qualification", count: { $sum: 1 } } }
    ]);

    res.json({
      states,
      organizations,
      qualifications
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// GET /jobs/foryou
exports.getForYou = async (req, res) => {
  try {
    console.log("getForYou hit");
    console.log("getForYou hit, user:", req.user?.id); 
    const user = await User.findById(req.user.id);
    console.log("user found:", user?.name);
    console.log("user state:", user.state, "qual:", user.qualification);

    let filter = {
      verified: true,
      last_date: { $gte: new Date() }
    };

    if (user.state && user.state !== "All") filter.state = user.state;
    if (user.qualification && user.qualification !== "All") filter.qualification = user.qualification;
    console.log("filter applied:", filter);

    const jobs = await Job.find(filter)
      .sort({ created_at: -1 })
      .limit(10);
    console.log("jobs found:", jobs.length);

    res.json(jobs);
  } catch (err) {
    console.log("getForYou error:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// POST /jobs/apply/:jobId
exports.applyJob = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    const alreadyApplied = user.appliedJobs?.some(
      a => a.jobId.toString() === req.params.jobId
    );

    if (!alreadyApplied) {
      user.appliedJobs.push({
        jobId: req.params.jobId,
        appliedAt: new Date(),
        status: "Applied"
      });
      user.markModified("appliedJobs");
      await user.save();
    }

    res.json({ message: "Marked as applied" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// PATCH /jobs/apply/:jobId/status
exports.updateApplyStatus = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const entry = user.appliedJobs?.find(
      a => a.jobId.toString() === req.params.jobId
    );

    if (entry) {
      entry.status = req.body.status; // "Applied" | "Shortlisted" | "Rejected"
      if (req.body.note !== undefined) entry.note = req.body.note;
      user.markModified("appliedJobs"); // ← ADD THIS LINE
      await user.save();
    }

    res.json({ message: "Status updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getAppliedJobs = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).populate("appliedJobs.jobId");
    const valid=user.appliedJobs.filter(e => e.jobId !==null);
    res.json(valid);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getCalendarJobs = async (req, res) => {
  try {
    const { month, year } = req.query;

    const m = parseInt(month);
    const y = parseInt(year);

    // Start and end of requested month
    const start = new Date(y, m - 1, 1);
    const end   = new Date(y, m, 1);

    const jobs = await Job.find({
      examDate: { $gte: start, $lt: end },
      verified: true,
    }).sort({ examDate: 1 });

    // Group by date string "YYYY-MM-DD"
    const grouped = {};
    jobs.forEach(job => {
      const dateKey = job.examDate.toISOString().split("T")[0];
      if (!grouped[dateKey]) grouped[dateKey] = [];
      grouped[dateKey].push(job);
    });

    res.json(grouped);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.getUpcomingExams = async (req, res) => {
  try {
    const now = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);

    const jobs = await Job.find({
      examDate: { $gte: now, $lte: threeMonthsLater },
      verified: true,
    })
      .sort({ examDate: 1 })
      .limit(3);

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};