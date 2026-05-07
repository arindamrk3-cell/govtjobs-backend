const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
  
  pushToken: {
    type: String,
    default: null
  },

  qualification: {
    type:String,
    default:"All"
  },
  state: {
    type:String,
    default:"All"
  },

  role: {
    type: String,
    default: "user"
  },

  bookmarks: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Job"
    }
  ],
  appliedJobs: [
    {
      jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job" },
      appliedAt: { type: Date, default: Date.now },
      status: {
        type: String,
        enum: ["Applied", "Shortlisted", "Rejected"],
        default: "Applied"
      },
      note: { type: String, default: "" }
    }
  ]
});

module.exports = mongoose.model("User", userSchema);