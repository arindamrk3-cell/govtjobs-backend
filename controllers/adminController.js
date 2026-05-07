const Job =require("../models/Job");
const User =require("../models/User");
exports.getStats=async(req,res)=>{
    try{
        const totalJobs=await Job.countDocuments();
        const totalUsers=await User.countDocuments();
        const activeJobs=await Job.countDocuments({
            last_date:{$gte:new Date()}
        });
        res.json({
            totalJobs,
            totalUsers,
            activeJobs
        });
    }catch(err){
        console.error(err);
        res.status(500).json({message:"Server Error"});
    }
};
exports.getUsers=async(req,res)=>{
    try{
        const users=User.find().select("-password");
        res.json(users);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};
exports.updateJob=async(req,res)=>{
    try{
        const job=await Job.findByIdAndUpdate(
            req.params.id,
            req.body,
            {new:true}
        );
        res.json(job);
    }
    catch(err){
        res.status(500).json({error:err.message});
    }
};
exports.deleteJob=async(req,res)=>{
    try{
        await Job.findByIdAndDelete(req.params.id);
        await User.updateMany(
      {},
      {
        $pull: {
          bookmarks: req.params.id,
          appliedJobs: { jobId: req.params.id }
        }
      }
    );
        res.json({message:"Job deleted successfully"});
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
exports.searchUsers=async(req,res)=>{
    try{
        const {keyword}=req.query;
        const users=await User.find({
            email:{$regex:keyword,$options:"i"}
        }).select("-password");
        res.json(users);
    }catch(err){
        res.status(500).json({error:err.message});
    }
};
exports.getAllJobsAdmin = async (req, res) => {
  try {
    const jobs = await Job.find().sort({ created_at: -1 });
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};