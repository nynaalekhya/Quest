/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysqlConnection = require('../mysqlConnection');
const { secret } = require('../config');
const Company = require('../model/Company');
const Student = require('../model/Student');
const Static = require('../model/Static');
const Job = require('../model/Job');
const General = require('../model/GeneralReview');
// get the profile for the company
const getCompanyProfile = async (req, res) => {
  const ID = req.query.CompanyID;
  try {
    Company.findOne({ CompanyID: ID }, (err, results) => {
      if (results) {
        res.status(200).end(JSON.stringify(results));
      } else {
        res.writeHead(403, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Information Not Found'));
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// update the company profile
const companyProfileUpdate = async (req, res) => {
  // eslint-disable-next-line no-console
  try {
    const { CompanyID } = req.body;
    Company.findOneAndUpdate(
      { CompanyID },
      {
        ...req.body,
      },
      (e, output) => {
        if (e) {
          // eslint-disable-next-line no-console
          res.writeHead(404, {
            'Content-Type': 'text/plain',
          });
          res.end('Entry Not Found');
        } else {
          res.writeHead(201, {
            'Content-Type': 'text/plain',
          });
          res.end(JSON.stringify('Profile Updated'));
        }
      }
    );
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
// get the Company Review for the company
const companyReviews = async (req, res) => {
  // eslint-disable-next-line no-console
  const { CompanyID, PageNo } = req.query;
  // eslint-disable-next-line no-console
  try {
    const results = await General.find({ CompanyID })
      .limit(10)
      .skip(PageNo * 10);
    const count2 = await General.countDocuments({ CompanyID });
    const count = count2;
    const resultData = { results, count };
    if (results) {
      // eslint-disable-next-line no-console
      res.writeHead(200, { 'content-type': 'text/json' });
      res.end(JSON.stringify(resultData));
    } else {
      res.writeHead(403, { 'content-type': 'text/json' });
      res.end(JSON.stringify('No Reviews Found'));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
// Post Job to the company
const postJob = async (req, res) => {
  // eslint-disable-next-line no-console
  const {
    CompanyID,
    CompanyName,
    Title,
    JobDescription,
    Responsibilities,
    Qualifications,
    ExpectedSalary,
    Industry,
    Country,
    Remote,
    StreetAddress,
    City,
    State,
    Zip,
  } = req.body;
  // eslint-disable-next-line no-console
  let con = null;
  try {
    const Jobs = await Job.countDocuments({});
    let JobID = null;
    if (Jobs) {
      JobID = Jobs + 1;
    } else {
      JobID = 0;
    }

    const job = new Job({
      JobID,
      Title,
      CompanyID,
      CompanyName,
      CurrentStatus: 'Open',
      Industry,
      Remote,
      StreetAddress,
      City,
      State,
      Country,
      Zip,
      PostedDate: Date.now(),
      JobDescription,
      Responsibilities,
      Qualifications,
      ExpectedSalary,
      Votes: 0,
    });
    await job.save((e, data) => {
      if (e) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Network Error');
      }
    });
    const querynew =
      'INSERT INTO APPLICATION_JOB (JobID,CompanyName, CompanyID, PostedDate,StreetAddress,City,State) VALUES (?,?,?,CURDATE(),?,?,?);';
    const userInsertProcedure = 'CALL jobInsert(?,?,?,CURDATE(),?,?,?)';
    // eslint-disable-next-line no-underscore-dangle
    const ID = job._id.toString();
    con = await mysqlConnection();
    const [results, fields] = await con.query(querynew, [
      ID,
      CompanyName,
      CompanyID,
      StreetAddress,
      City,
      State,
    ]);
    con.end();
    res.writeHead(201, {
      'Content-Type': 'text/plain',
    });
    res.end(JSON.stringify('Job Created'));
    // eslint-disable-next-line no-console
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  } finally {
    if (con) {
      con.end();
    }
  }
  return res;
};

const favoriteReview = async (req, res) => {
  // eslint-disable-next-line no-console
  const { ID, Favorite } = req.body;
  // eslint-disable-next-line no-console
  try {
    const results = await General.findOneAndUpdate({ ID }, Favorite);

    if (results) {
      res.writeHead(201, { 'content-type': 'text/json' });
      res.end(JSON.stringify('response submitted'));
    } else {
      res.writeHead(500, { 'content-type': 'text/json' });
      res.end(JSON.stringify('error'));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
const reviewResponse = async (req, res) => {
  // eslint-disable-next-line no-console
  const { ID, Response } = req.body;
  // eslint-disable-next-line no-console
  try {
    const results = await General.findOneAndUpdate({ ID }, Response);
    if (results) {
      res.writeHead(201, { 'content-type': 'text/json' });
      res.end(JSON.stringify('response submitted'));
    } else {
      res.writeHead(500, { 'content-type': 'text/json' });
      res.end(JSON.stringify('error'));
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
const featuredReview = async (req, res) => {
  // eslint-disable-next-line no-console
  const { CompanyID, ID } = req.body;
  // eslint-disable-next-line no-console
  try {
    const results = await General.findOne({ ID });

    Company.findOneAndUpdate({ CompanyID }, { FeaturedReview: results }, (e, output) => {
      if (e) {
        // eslint-disable-next-line no-console
        res.writeHead(404, {
          'Content-Type': 'text/plain',
        });
        res.end('Entry Not Found');
      } else {
        res.writeHead(201, {
          'Content-Type': 'text/plain',
        });
        res.end(JSON.stringify('Review Updated'));
      }
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log(error);
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// get the profile for the company
const getJobs = async (req, res) => {
  const { CompanyID, PageNo } = req.query;
  try {
    const Jobs = await Job.countDocuments({ CompanyID });
    const count = Jobs;
    const noOfPages = Math.ceil(count / 10);
    const resultObj = {};
    const Jobresult = await Job.find({ CompanyID })
      .limit(10)
      .skip(PageNo * 10);
    resultObj.jobs = Jobresult;
    resultObj.count = count;
    resultObj.noOfPages = noOfPages;
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultObj));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// get the applications received for a job
const jobsApplications = async (req, res) => {
  const { JobID, applicationPageNo } = req.query;
  let con = null;
  const limit = 10;
  const offset = applicationPageNo * 10;
  try {
    const fetchApplicationsQuery = 'CALL getApplications(?,?,?)';
    con = await mysqlConnection();
    const [results, fields] = await con.query(fetchApplicationsQuery, [JobID, limit, offset]);
    con.end();
    if (results[1][0].TotalCount === 0) {
      res.writeHead(404, { 'content-type': 'text/json' });
      res.end(JSON.stringify('No Applications found'));
    } else {
      const resultdata = [];
      resultdata.push(results[0]);
      resultdata.push(results[1]);
      // eslint-disable-next-line no-console
      res.writeHead(200, { 'content-type': 'text/json' });
      res.end(JSON.stringify(resultdata));
    }
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  } finally {
    if (con) {
      con.end();
    }
  }
  return res;
};

// update the applications status
const jobsApplicantUpdate = async (req, res) => {
  const { JobID, StudentID, Status } = req.body;
  let con = null;
  try {
    const updateApplicationsStatusQuery = 'CALL updateApplicationsStatus(?,?,?)';
    con = await mysqlConnection();
    const [results, fields] = await con.query(updateApplicationsStatusQuery, [
      JobID,
      StudentID,
      Status,
    ]);
    con.end();
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Updated the status'));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  } finally {
    if (con) {
      con.end();
    }
  }
  return res;
};

// Get the applicant profile details
const jobsApplicantProfile = async (req, res) => {
  try {
    const { StudentID } = req.query;
    Student.findOne(
      { StudentID },
      {
        _id: 0,
        Name: 1,
        ProfilePicURL: 1,
        AboutMe: 1,
        Gender: 1,
        Disability: 1,
        VeteranStatus: 1,
        Race: 1,
        Ethnicity: 1,
        PreferredJobTitle: 1,
        JobStatus: 1,
        CurrentJobTitle: 1,
        TargetSalary: 1,
        OpentoRelocation: 1,
        Skills: 1,
      },
      (err, data) => {
        if (err) {
          res.writeHead(500, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Network Error'));
        }
        if (data) {
          res.writeHead(200, { 'content-type': 'text/json' });
          res.end(JSON.stringify(data));
        } else {
          res.writeHead(400, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Not found'));
        }
      }
    );
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
};

// Get the job statistics
const report = async (req, res) => {
  let con = null;
  try {
    const resultApplication = {};
    const finalResult = [];
    const { CompanyID, PageNo } = req.query;
    const year = new Date().getFullYear();
    const date = new Date(year, 0, 1);
    const jobDataFetched = await Job.find({ CompanyID, PostedDate: { $lt: date } })
      .limit(5)
      .skip(PageNo * 5);
    con = await mysqlConnection();
    for (let i = 0; i < jobDataFetched.length; i += 1) {
      // jobID.push(data[i].JobID);
      const jobData = jobDataFetched[i];
      resultApplication.jobDetails = { jobData };
      let getQuery = 'SELECT COUNT(*) As TotalApplicants FROM APPLICATION_RECEIVED WHERE JobID = ?';
      let [results] = await con.query(getQuery, jobData.JobID);
      resultApplication.Applied = { results };
      getQuery =
        'SELECT COUNT(*) AS SelectedApplicants FROM APPLICATION_RECEIVED WHERE JobID = ? AND STATUS = ?';
      [results] = await con.query(getQuery, [jobData.JobID, 'Hired']);
      resultApplication.Selected = { results };
      getQuery =
        'SELECT COUNT(*) As RejectedApplicants FROM APPLICATION_RECEIVED WHERE JobID = ? AND STATUS = ?';
      [results] = await con.query(getQuery, [jobData.JobID, 'Rejected']);
      resultApplication.Rejected = { results };
      finalResult.push(resultApplication);
    }
    con.end();
    const count = await Job.find({ CompanyID, PostedDate: { $lt: date } }).countDocuments();
    const noOfPages = Math.ceil(count / 10);
    res.writeHead(200, { 'content-type': 'text/json' });
    const output = { statsData: finalResult, count, noOfPages };
    res.end(JSON.stringify(output));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  } finally {
    if (con) {
      con.end();
    }
  }
};

const demographicsJob = async (req, res) => {
  let con = null;
  const resultObject = {};
  try {
    const { JobID } = req.query;
    con = await mysqlConnection();
    let getQuery =
      'SELECT Ethnicity, COUNT(Ethnicity) As Count FROM APPLICATION_RECEIVED WHERE JobID = ? GROUP BY Ethnicity';
    let [results] = await con.query(getQuery, JobID);
    resultObject.Ethnicity = results;
    getQuery =
      'SELECT Gender, COUNT(Gender) As Count FROM APPLICATION_RECEIVED WHERE JobID = ? GROUP BY Gender';
    [results] = await con.query(getQuery, JobID);
    resultObject.Gender = results;
    getQuery =
      'SELECT Disability, COUNT(Disability) As Count FROM APPLICATION_RECEIVED WHERE JobID = ? GROUP BY Disability';
    [results] = await con.query(getQuery, JobID);
    resultObject.Disability = results;
    getQuery =
      'SELECT VeteranStatus, COUNT(VeteranStatus) As Count FROM APPLICATION_RECEIVED WHERE JobID = ? GROUP BY VeteranStatus';
    [results] = await con.query(getQuery, JobID);
    resultObject.VeteranStatus = results;
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultObject));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  } finally {
    if (con) {
      con.end();
    }
  }
};
module.exports = {
  getCompanyProfile,
  companyProfileUpdate,
  companyReviews,
  postJob,
  favoriteReview,
  reviewResponse,
  featuredReview,
  getJobs,
  jobsApplications,
  jobsApplicantUpdate,
  jobsApplicantProfile,
  report,
  demographicsJob,
};
