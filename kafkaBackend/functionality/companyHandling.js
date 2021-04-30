/* eslint-disable no-underscore-dangle */
/* eslint-disable camelcase */
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
const Salary = require('../model/SalaryReview');
const Interview = require('../model/InterviewReview');
const Photo = require('../model/Photos');
const redisClient = require('../redisClient');
// eslint-disable-next-line camelcase
async function handle_request(msg, callback) {
  // eslint-disable-next-line default-case
  switch (msg.api) {
    case 'getCompanyProfile': {
      const res = {};
      try {
        const { CompanyID } = msg.query;
        const redisKey = `getCompanyProfile-CompanyID=${CompanyID}`;
        redisClient.get(redisKey, async (err, data) => {
          // data is available in Redis
          if (data) {
            console.log('in redis');
            console.log(data);
            const out = JSON.parse(data);
            console.log(out);
            res.status = 200;
            res.end = JSON.stringify(out);
            callback(null, res);
          } else {
            Company.findOne({ CompanyID }, (err, results) => {
              if (results) {
                redisClient.set(redisKey, JSON.stringify(results));
                res.status = 200;
                res.end = JSON.stringify(results);
                callback(null, res);
              } else {
                res.status = 403;
                res.end = 'Information Not Found';
                callback(null, res);
              }
            });
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'companyProfileUpdate': {
      const res = {};
      let con = null;
      try {
        const { CompanyID } = msg.body;
        const compcheck = await Company.findOne({ CompanyID }).select('CompanyName');
        if (msg.body.CompanyName !== compcheck.CompanyName) {
          await General.updateMany({ CompanyID }, { CompanyName: msg.body.CompanyName });
          await Job.updateMany({ CompanyID }, { CompanyName: msg.body.CompanyName });
          await Salary.updateMany({ CompanyID }, { CompanyName: msg.body.CompanyName });
          await Interview.updateMany({ CompanyID }, { CompanyName: msg.body.CompanyName });
          await Photo.updateMany({ CompanyID }, { CompanyName: msg.body.CompanyName });
          const querynew = 'UPDATE APPLICATION_JOB SET CompanyName = ?  WHERE CompanyID = ?;';
          // eslint-disable-next-line no-underscore-dangle
          con = await mysqlConnection();
          const [results, fields] = await con.query(querynew, [msg.body.CompanyName, CompanyID]);
          con.release();
        }
        const redisKey = `getCompanyProfile-CompanyID=${CompanyID}`;
        await redisClient.get(redisKey, async (err, data) => {
          // data is available in Redis
          if (data) {
            redisClient.del(redisKey);
          }
        });
        Company.findOneAndUpdate({ CompanyID }, { ...msg.body }, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = 'Information updated';
            callback(null, res);
          }
        });
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      } finally {
        if (con) {
          con.release();
        }
      }      
      break;
    }
    case 'companyReviews': {
      const res = {};
      try {
        const { CompanyID, PageNo } = msg.query;
        const results = await General.find({ CompanyID, Status: 'Approved' })
          .limit(10)
          .skip(PageNo * 10);
        const count2 = await General.countDocuments({ CompanyID, Status: 'Approved' });
        const count = count2;
        const resultData = { results, count };
        if (results) {
          res.status = 200;
          res.end = JSON.stringify(resultData);
          callback(null, res);
        } else {
          res.status = 403;
          res.end = 'No Reviews Found';
          callback(null, res);
        }
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'favoriteReview': {
      const res = {};
      try {
        const { ID, Favorite } = msg.body;
        const results = await General.findOneAndUpdate({ ID }, { Favorite }, (err) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = 'Review Favorited';
            callback(null, res);
          }
        });
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'reviewResponse': {
      const res = {};
      try {
        const { ID, Response } = msg.body;
        const results = await General.updateOne({ ID }, { Response }, (err) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = 'Response Submitted';
            callback(null, res);
          }
        });
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'featuredReview': {
      const res = {};
      try {
        const { CompanyID, ID } = msg.body;
        const results = await General.findOne({ ID });
        Company.findOneAndUpdate({ CompanyID }, { FeaturedReview: results }, async (e, output) => {
          if (e) {
            res.status = 404;
            res.end = 'Entry Not Found';
            callback(null, res);
          } else {
            const redisKey = `getCompanyProfile-CompanyID=${CompanyID}`;
            await redisClient.get(redisKey, async (err, data) => {
              // data is available in Redis
              if (data) {
                redisClient.del(redisKey);
              }
            });
            res.status = 200;
            res.end = 'Review Updated';
            callback(null, res);
          }
        });
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getJobs': {
      const res = {};
      try {
        const { CompanyID, PageNo } = msg.query;
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
        res.status = 200;
        res.end = JSON.stringify(resultObj);
        callback(null, res);
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'jobsApplications': {
      const res = {};
      let con = null;
      try {
        const { JobID, applicationPageNo } = msg.query;
        const limit = 10;
        const offset = applicationPageNo * 10;
        const fetchApplicationsQuery = 'CALL getApplications(?,?,?)';
        con = await mysqlConnection();
        const [results, fields] = await con.query(fetchApplicationsQuery, [JobID, limit, offset]);
        con.release();
        if (results[1][0].TotalCount === 0) {
          res.status = 404;
          res.end = JSON.stringify('No Applications found');
          callback(null, res);
        } else {
          const resultdata = [];
          resultdata.push(results[0]);
          resultdata.push(results[1]);
          res.status = 200;
          res.end = JSON.stringify(resultdata);
          callback(null, res);
        }
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      } finally {
        if (con) {
          con.release();
        }
      }
      break;
    }
    case 'applicantCount': {
      const res = {};
      let con = null;
      try {
        const { JobID } = msg.query;
        const fetchApplicationsQuery =
          'SELECT count(*) as appcount FROM APPLICATION_RECEIVED WHERE JobID=?';
        con = await mysqlConnection();
        const [results, fields] = await con.query(fetchApplicationsQuery, [JobID]);
        con.release();
        console.log('results', results);
        if (results[0]) {
          console.log('inside', results);
          res.status = 200;
          res.end = JSON.stringify({ ApplicantNumber: results[0] });
          callback(null, res);
        }
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      } finally {
        if (con) {
          con.release();
        }
      }
      break;
    }
    case 'postJob': {
      const res = {};
      console.log('new Date()', new Date());
      let con = null;
      try {
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
          JobType,
        } = msg.body;
        // const Jobs = await Job.countDocuments({});
        // let JobID = null;
        // if (Jobs) {
        //   JobID = Jobs + 1;
        // } else {
        //   JobID = 0;
        // }
        const job = new Job({
          // JobID,
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
          PostedDate: new Date(),
          JobDescription,
          Responsibilities,
          Qualifications,
          ExpectedSalary,
          JobType,
          Votes: 0,
        });
        await job.save((e, data) => {
          if (e) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
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
        con.release();
        await Company.findOneAndUpdate(
          { CompanyID },
          { $inc: { JobCount: 0.5 } },

          async (error, results) => {
            if (error) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            } else {
              const redisKey = `getCompanyProfile-CompanyID=${CompanyID}`;
              await redisClient.get(redisKey, async (err, data) => {
                // data is available in Redis
                if (data) {
                  redisClient.del(redisKey);
                }
              });
            }
          }
        );
        res.status = 201;
        res.end = JSON.stringify('Job Created');
        callback(null, res);
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      } finally {
        if (con) {
          con.release();
        }
      }
      break;
    }
    case 'jobsApplicantUpdate': {
      const res = {};
      let con = null;
      try {
        const { JobID, StudentID, Status } = msg.body;
        const updateApplicationsStatusQuery = 'CALL updateApplicationsStatus(?,?,?)';
        con = await mysqlConnection();
        const [results, fields] = await con.query(updateApplicationsStatusQuery, [
          JobID,
          StudentID,
          Status,
        ]);
        con.release();

        res.status = 200;
        res.end = JSON.stringify('Updated the status');
        callback(null, res);
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      } finally {
        if (con) {
          con.release();
        }
      }
      break;
    }
    case 'jobsApplicantProfile': {
      const res = {};
      try {
        const { StudentID } = msg.query;
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
          (e, output) => {
            if (e) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            } else if (output) {
              res.status = 200;
              res.end = JSON.stringify(output);
              callback(null, res);
            } else {
              res.status = 400;
              res.end = 'Not found';
              callback(null, res);
            }
          }
        );
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'report': {
      const res = {};
      let con = null;
      try {
        const finalResult = [];
        const { CompanyID, PageNo } = msg.query;
        const year = new Date().getFullYear();
        const date = new Date(year, 0, 1);
        const jobDataFetched = await Job.find({ CompanyID, PostedDate: { $gt: date } })
          .limit(5)
          .skip(PageNo * 5);
        con = await mysqlConnection();
        for (let i = 0; i < jobDataFetched.length; i += 1) {
          const resultApplication = {};
          const jobData = jobDataFetched[i];
          resultApplication.jobDetails = { jobData };
          let getQuery =
            'SELECT COUNT(*) As TotalApplicants FROM APPLICATION_RECEIVED WHERE JobID = ?';
          let [results] = await con.query(getQuery, jobData._id.toString());
          resultApplication.Applied = { results };
          getQuery =
            'SELECT COUNT(*) AS SelectedApplicants FROM APPLICATION_RECEIVED WHERE JobID = ? AND STATUS = ?';
          [results] = await con.query(getQuery, [jobData._id.toString(), 'Hired']);
          resultApplication.Selected = { results };
          getQuery =
            'SELECT COUNT(*) As RejectedApplicants FROM APPLICATION_RECEIVED WHERE JobID = ? AND STATUS = ?';
          [results] = await con.query(getQuery, [jobData._id.toString(), 'Rejected']);
          resultApplication.Rejected = { results };
          finalResult.push(resultApplication);
        }
        con.release();
        const count = await Job.find({ CompanyID, PostedDate: { $gt: date } }).countDocuments();
        const noOfPages = Math.ceil(count / 10);
        const output = { statsData: finalResult, count, noOfPages };
        res.status = 200;
        res.end = JSON.stringify(output);
        callback(null, res);
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      } finally {
        if (con) {
          con.release();
        }
      }
      break;
    }
    case 'demographicsJob': {
      const res = {};
      let con = null;
      try {
        const resultObject = {};
        const { JobID } = msg.query;
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

        res.status = 200;
        res.end = JSON.stringify(resultObject);
        callback(null, res);
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      } finally {
        if (con) {
          con.release();
        }
      }
      break;
    }

    case 'findCompanyName': {
      const res = {};
      let con = null;
      try {
        const { CompanyName } = msg.body;
        const name = await Company.find({CompanyName}, (err, result) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } if (result.length !== 0) {            
            res.status = 409;
            res.end = 'Name already in use';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = JSON.stringify('Name available');
            callback(null, res);
          }
        });
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
  }
}
exports.handle_request = handle_request;
