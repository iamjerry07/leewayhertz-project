const jobModel = require('../model/job')


const createJob = async function (req, res) {
    try {
      let data = req.body;
  
      if (Object.keys(data).length == 0) {
        return res
          .status(400)
          .send({ status: false, msg: "Please enter job data" });
      }
      if(!data.job || typeof (data.job) != "string"){
        return res.status(400).send({ status: false, msg: "Please enter job" })
      }
      if(!data.jobDescription || typeof (data.jobDescription) != "string"){
        return res.status(400).send({ status: false, msg: "Please enter Job Description" })
      }


      let createdData = await jobModel.create(data);
      return res.status(200).send({status: true,msg: "Job created succesfully", jobData: createdData,
        });
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message });
    }
  };

  const getAllJob = async function (req, res) {
    try {
      let getJob = await jobModel.find({isDeleted:false}).sort({createdAt:1});
      if (getJob.length < 1) {
        return res.status(400).send({ status: false, msg: "No job found" });
      }
      return res.status(200).send({ status: true, jobData: getJob });
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message });
    }
  };

//   EXECUTE JOBS
const executeJob = async function (req, res) {
    try {
      let getJob = await jobModel.find({isDeleted:false}).sort({createdAt:1});
      await jobModel.findOneAndUpdate({_id: getJob[0]._id},{isDeleted:true})
      let getLatestJob = await jobModel.find({isDeleted:false}).sort({createdAt:1});
      return res.status(200).send({ status: true, jobData: getLatestJob });
    } catch (error) {
      return res.status(500).send({ status: false, msg: error.message });
    }
  };


  module.exports = { createJob, getAllJob, executeJob };