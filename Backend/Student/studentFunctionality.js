/* eslint-disable no-await-in-loop */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const url = require('url');
const { ok } = require('assert');
const mongoose = require('mongoose');
const mysqlConnection = require('../mysqlConnection');
const { secret } = require('../config');
const Company = require('../model/Company');
const Student = require('../model/Student');
const Job = require('../model/Job');
const Interview = require('../model/InterviewReview');
const Salary = require('../model/SalaryReview');
const General = require('../model/GeneralReview');
const Static = require('../model/Static');
const Photo = require('../model/Photos');
const redisClient = require('../redisClient');

// get the details required for the student navigation bar
const navbar = async (req, res) => {
  const { StudentID } = url.parse(req.url, true).query;
  try {
    const resultData = [];
    await Student.findOne({ StudentID }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Student not found');
      } else {
        resultData.push(results);
      }
    });
    await Company.find({}, { _id: 0, CompanyName: 1, CompanyID: 1 }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Company Names not found');
      } else {
        resultData.push(results);
      }
    });
    await Job.find({}, { _id: 0, Title: 1 }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Jobs not found');
      } else {
        resultData.push(results);
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(resultData));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// // To fetch the avgRating of a company
// const fetchAvgRating = async (ID) => {
//   try {
//     let pipeline = [
//       { $match: { CompanyID: ID } },
//       {
//         $group: {
//           _id: '$CompanyID',
//           adAvg: { $avg: '$Rating' },
//         },
//       },
//     ];

//     let res = await General.aggregate(pipeline);
//     console.log(res);

//     const fetchAvgRatingQuery = 'CALL avgRating(?)';
//     const con = await mysqlConnection();
//     const [results, fields] = await con.query(fetchAvgRatingQuery, ID);
//     con.end();
//     if (results[0][0].AvgRating === null) return 0;
//     return results[0][0].AvgRating;
//   } catch (error) {
//     return 0;
//   }
// };

// fetch the results of the company search
const searchCompany = async (req, res) => {
  try {
    const { SearchString, State, PageNo } = url.parse(req.url, true).query;
    const filterArray = [];
    if (SearchString.length !== 0) {
      filterArray.push({ CompanyName: { $regex: `${SearchString}`, $options: 'i' } });
    }
    if (State.length !== 0) {
      filterArray.push({ State });
    }
    let companyResults = null;
    let count = 0;
    if (filterArray.length !== 0) {
      companyResults = await Company.find({ $and: filterArray })
        .limit(10)
        .skip(PageNo * 10)
        .exec();
      count = await Company.find({ $and: filterArray }).countDocuments();
    } else {
      companyResults = await Company.find()
        .limit(10)
        .skip(PageNo * 10)
        .exec();
      count = await Company.find().countDocuments();
    }

    const noOfPages = Math.ceil(count / 10);
    const resultData = [companyResults, count, noOfPages];
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// Search all jobs
const searchJob = async (req, res) => {
  try {
    const { SearchString, JobType, State, SalStart, SalEnd, PageNo } = url.parse(
      req.url,
      true
    ).query;
    const filterObj = {};
    if (SearchString.length !== 0) {
      filterObj.CompanyName = { $regex: `${SearchString}`, $options: 'i' };
    }
    if (JobType.length !== 0) {
      filterObj.JobType = JobType;
    }
    if (SalStart !== SalEnd) {
      const tempObj = {};
      tempObj.$gte = Number(SalStart);
      tempObj.$lte = Number(SalEnd);
      filterObj.ExpectedSalary = tempObj;
    }
    if (State.length !== 0) {
      filterObj.State = State;
    }
    const jobResults = await Job.aggregate([
      {
        $match: filterObj,
      },
      {
        $lookup: {
          from: 'companies',
          localField: 'CompanyID',
          foreignField: 'CompanyID',
          as: 'jobdetails',
          // pipeline: [{ $match: { $expr: { $eq: ['$CompanyID', '$CompanyID'] } } }],
        },
      },
      {
        $project: {
          Title: 1,
          CompanyID: 1,
          CompanyName: 1,
          State: 1,
          City: 1,
          ExpectedSalary: 1,
          PostedDate: 1,
          StreetAddress: 1,
          JobType: 1,
          Qualifications: 1,
          Responsibilities: 1,
          JobDescription: 1,
          Country: 1,
          CurrentStatus: 1,
          jobdetails: 1,
        },
      },
    ])
      .sort({ PostedDate: -1 })
      .limit(10)
      .skip(PageNo * 10);
    const resultCount = await Job.aggregate([
      {
        $match: filterObj,
      },
      {
        $lookup: {
          from: 'Company',
          as: 'jobdetails',
          pipeline: [{ $match: { $expr: { $eq: ['$CompanyID', '$CompanyID'] } } }],
        },
      },
      // {
      //   $project: {
      //     Title: 1,
      //     CompanyID: 1,
      //     CompanyName: 1,
      //     State: 1,
      //     ExpectedSalary: 1,
      //   },
      // },
    ]);
    const count = resultCount.length;
    const noOfPages = Math.ceil(count / 10);
    const resultObj = {};
    resultObj.jobs = jobResults;
    resultObj.count = count;
    resultObj.noOfPages = noOfPages;
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultObj));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get the suggested jobs for students
const getJobSuggestions = async (req, res) => {
  /* eslint-disable */
  const { StudentID } = url.parse(req.url, true).query;
  let jobTitle = '';
  let resultData = [];
  try {
    await Student.findOne({ StudentID }, (err, results) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'text/plain',
        });
        res.end('Student not found');
      } else {
        jobTitle = results.JobTitle;
      }
    });
    let titleMatchJob = await Job.find({ Title: { $regex: `.*${jobTitle}.*` } })
      .limit(4)
      .exec();
    resultData = titleMatchJob;
    if (resultData.length < 4) {
      let sortDateJob = await Job.find({ Title: { $not: /${jobTitle}/ } })
        .sort({ PostedDate: -1 })
        .limit(4 - resultData.length)
        .exec();
      resultData = resultData.concat(sortDateJob);
    }
    var companyResult = [];
    for (var i = 0; i < resultData.length; i++) {
      let companyID = resultData[i].CompanyID;
      let company = await Company.findOne({ CompanyID: companyID }).exec();
      let tmpObj = {};
      tmpObj['_id'] = resultData[i]._id;
      tmpObj['Title'] = resultData[i].Title;
      tmpObj['TitCompanyIDle'] = resultData[i].CompanyID;
      tmpObj['CompanyName'] = resultData[i].CompanyName;
      tmpObj['CurrentStatus'] = resultData[i].CurrentStatus;
      tmpObj['Industry'] = resultData[i].Industry;
      tmpObj['StreetAddress'] = resultData[i].StreetAddress;
      tmpObj['City'] = resultData[i].City;
      tmpObj['State'] = resultData[i].State;
      tmpObj['Country'] = resultData[i].Country;
      tmpObj['Zip'] = resultData[i].Zip;
      tmpObj['PostedDate'] = resultData[i].PostedDate;
      tmpObj['JobDescription'] = resultData[i].JobDescription;
      tmpObj['Respobsibilities'] = resultData[i].Respobsibilities;
      tmpObj['Qualifications'] = resultData[i].Qualifications;
      tmpObj['ExpectedSalary'] = resultData[i].ExpectedSalary;
      tmpObj['Votes'] = resultData[i].TitVotesle;
      tmpObj['ProfileImg'] = company.ProfileImg;
      tmpObj['GeneralReviewCount'] = company.GeneralReviewCount;
      tmpObj['TotalGeneralReviewRating'] = company.TotalGeneralReviewRating;
      companyResult.push(tmpObj);
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(companyResult));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
  /* eslint-enable */
};
// post company favourite jobs for students
const companyFavouriteJobs = async (req, res) => {
  const { StudentID, JobID } = req.body;
  try {
    Student.update({ StudentID }, { $push: { FavouriteJobs: JobID } }, (err) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Network Error'));
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify('Added'));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// To submit an application for a job
const companyApplyJob = async (req, res) => {
  const {
    JobID,
    StudentID,
    StudentName,
    ResumeURL,
    CoverLetterURL,
    Ethnicity,
    Gender,
    Disability,
    VeteranStatus,
  } = req.body;
  let con = null;
  try {
    const jobApplicationProcedure = 'CALL applicationSubmit(?,?,?,?,?,?,?,?,?,"Submitted")';
    con = await mysqlConnection();
    // eslint-disable-next-line no-unused-vars
    const [results, fields] = await con.query(jobApplicationProcedure, [
      JobID,
      StudentID,
      StudentName,
      ResumeURL,
      CoverLetterURL,
      Ethnicity,
      Gender,
      Disability,
      VeteranStatus,
    ]);
    con.end();
    Student.update(
      { StudentID },
      {
        $push: { AppliedJobs: JobID },
      },
      (err, data) => {
        if (err) {
          // console.log(err);
        }
        if (data) {
          // console.log(data);
        }
      }
    );
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Applied Successfully'));
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
// remove favourite jobs for students
const removeFavouriteJobs = async (req, res) => {
  const { StudentID, JobID } = req.body;
  try {
    Student.update({ StudentID }, { $pull: { FavouriteJobs: JobID } }, (err) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Network Error'));
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify('Removed'));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// API Calls for returning the interviews
const searchInterview = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { SearchString, State, PageNo } = req.query;
  try {
    const results = await Interview.find({
      CompanyName: { $regex: `.*${SearchString}.*` },
      State: { $regex: `.*${State}.*` },
    })
      .limit(10)
      .skip(PageNo * 10);
    // console.log(results);
    const returns = [];
    for (let i = 0; i < results.length; i += 1) {
      // eslint-disable-next-line no-await-in-loop
      const company = await Company.findOne({ CompanyID: results[i].CompanyID }).select(
        'ProfileImg'
      );
      if (company.ProfileImg) {
        returns.push({ Interview: results[i], ProfileImg: company.ProfileImg });
      } else {
        returns.push({ Interview: results[i], ProfileImg: null });
      }
    }
    const temp = await Interview.countDocuments({
      CompanyName: { $regex: `.*${SearchString}.*` },
      State: { $regex: `.*${State}.*` },
    });
    let count = null;
    if (temp) {
      // console.log(temp);
      count = temp;
    } else {
      count = 0;
    }
    const resultData = { returns, count };
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// To get the salary reviews
const salaryReview = async (req, res) => {
  try {
    const { PageNo, CompanyID } = req.query;
    const results = await Salary.find({ CompanyID })
      .limit(10)
      .skip(PageNo * 10);
    const company = await Company.find({ CompanyID });
    let ProfileImg = null;
    if (company[0].ProfileImg) {
      ProfileImg = company[0].ProfileImg;
    }

    const count2 = await Salary.find({ CompanyID });
    const count = count2.length;
    const resultData = { results, ProfileImg, count };
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// To get the salary reviews
const studentSalaryReview = async (req, res) => {
  try {
    const { PageNo, StudentID } = req.query;
    const results = await Salary.find({ StudentID })
      .limit(10)
      .skip(PageNo * 10);

    const count = await Salary.countDocuments({ StudentID });
    const resultData = { results, count };
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
// post resume of student
const resumesAdd = async (req, res) => {
  try {
    const { StudentID } = req.body;
    const ResumeURL = req.file.location;
    Student.update({ StudentID }, { $push: { Resumes: ResumeURL } }, (err) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Network Error'));
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(req.file.location));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// remove resume for students
const resumesDelete = async (req, res) => {
  const { StudentID, ResumeURL } = req.body;
  try {
    await Student.update({ StudentID }, { $pull: { Resumes: ResumeURL } }, (err) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Network Error'));
      }
    });
    const result = await Student.findOne({ StudentID }, { ResumePrimary: 1, _id: 0 }).exec();
    if (result.ResumePrimary === ResumeURL) {
      await Student.update({ StudentID }, { ResumePrimary: '' }).exec();
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify('Removed'));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// To withdraw from a job application
const jobWithdraw = async (req, res) => {
  const { JobID, StudentID } = req.body;
  let con = null;
  try {
    const applicationWithdrawProcedure = 'CALL applicationWithDraw(?,?)';
    con = await mysqlConnection();
    // eslint-disable-next-line no-unused-vars
    const [results, fields] = await con.query(applicationWithdrawProcedure, [JobID, StudentID]);
    con.end();
    await Student.update({ StudentID }, { $pull: { AppliedJobs: JobID } }, (err) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Network Error'));
      }
    });
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Withdrawn Successfully'));
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

// Update the profile information
const profileUpdate = async (req, res) => {
  try {
    const { StudentID } = req.body;
    Student.findOne({ StudentID }, (err, results) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Network Error'));
      }
      if (results) {
        Student.updateOne({ StudentID }, { ...req.body }, (er, data) => {
          if (er) {
            res.writeHead(500, { 'content-type': 'text/json' });
            res.end(JSON.stringify('Network Error'));
          }
          if (data) {
            res.writeHead(200, { 'content-type': 'text/json' });
            res.end(JSON.stringify('Updated Successfully'));
          }
        });
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
};
// get the details required for the student navigation bar
const companyProfile = async (req, res) => {
  const { CompanyID } = req.query;
  try {
    const company = await Company.findOne({ CompanyID });
    Company.findOneAndUpdate(
      { CompanyID },
      { $inc: { ViewCount: 1 } },

      (err) => {
        if (err) {
          res.writeHead(500, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Network'));
        } else {
          res.writeHead(200, { 'content-type': 'text/json' });
          res.end(JSON.stringify(company));
        }
      }
    );
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// get the company reviews
const companyReview = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { CompanyID, PageNo } = req.query;
  try {
    const results = await General.find({
      CompanyID,
    })
      .limit(10)
      .skip(PageNo * 10);
    // console.log(results);
    const temp = await General.countDocuments({
      CompanyID,
    });
    let count23 = null;
    if (temp) {
      // console.log(temp);
      count23 = temp;
    } else {
      count23 = 0;
    }
    const resultData = [];
    resultData.push({ count: count23 });
    const no = Math.ceil(count23 / 10);
    resultData.push({ noOfPages: no });
    resultData.push(results);
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// get the company reviews
const studentCompanyReview = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { StudentID, PageNo } = req.query;
  try {
    const results = await General.find({
      StudentID,
    })
      .limit(10)
      .skip(PageNo * 10);
    // console.log(results);
    const temp = await General.countDocuments({
      StudentID,
    });
    let count23 = null;
    if (temp) {
      // console.log(temp);
      count23 = temp;
    } else {
      count23 = 0;
    }
    const resultData = [];
    resultData.push({ count: count23 });
    const no = Math.ceil(count23 / 10);
    resultData.push({ noOfPages: no });
    resultData.push(results);
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// add the company review and increment the review count
const addCompanyReview = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { CompanyID, Rating, CEOApproval, Recommended } = req.body;
  try {
    const rev = await General.findOne({}).sort({ ID: -1 }).select('ID');
    let ID = null;
    if (rev) {
      ID = rev.ID + 1;
    } else {
      ID = 1;
    }
    const review = new General({
      ID,
      Status: 'Not Approved',
      DatePosted: Date.now(),
      ...req.body,
      Favorite: 0,
    });
    await review.save();
    const reviewday = await Static.findOne({}).select('reviews');
    const today = new Date().toISOString().slice(0, 10);
    if (reviewday.reviews[0].Date.toISOString().slice(0, 10) === today) {
      reviewday.reviews[0].reviewcount += 1;
    } else {
      reviewday.reviews.unshift({ Date: today, reviewcount: 1 });
    }
    if (reviewday.reviews.length > 7) {
      reviewday.reviews.pop();
    }
    Static.findOneAndUpdate(
      {},
      { reviews: reviewday.reviews },

      (err) => {
        if (err) {
          res.writeHead(500, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Network'));
        } else {
          Company.findOneAndUpdate(
            { CompanyID },
            {
              $inc: {
                GeneralReviewCount: 1,
                TotalGeneralReviewRating: Rating,
                approveCEOcount: CEOApproval,
                recommendedcount: Recommended,
              },
            },

            (error, results) => {
              if (error) {
                res.writeHead(500, { 'content-type': 'text/json' });
                res.end(JSON.stringify('Network'));
              }
              if (results) {
                res.writeHead(200, { 'content-type': 'text/json' });
                res.end(JSON.stringify('Company Review Added'));
              }
            }
          );
        }
      }
    );
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// get the company reviews without pagination
// const getAllReview = async (req, res) => {
//   // eslint-disable-next-line no-unused-vars
//   const { CompanyID } = req.query;
//   let con = null;
//   try {
//     const redisKey = `getAllReview-CompanyID=${CompanyID}`;
//     redisClient.get(redisKey, async (err, data) => {
//       // data is available in Redis
//       if (data) {
//         res.writeHead(200, { 'content-type': 'text/json' });
//         res.end(data);
//       } else {
//         try {
//           const searchQuery = 'SELECT * FROM GENERAL_REVIEW WHERE CompanyID=?;';
//           con = await mysqlConnection();
//           const [results2] = await con.query(searchQuery, CompanyID);
//           con.end();
//           // Add to redis
//           redisClient.setex(redisKey, 36000, JSON.stringify(results2));
//           res.writeHead(200, { 'content-type': 'text/json' });
//           res.end(JSON.stringify(results2));
//         } catch (error) {
//           res.writeHead(500, { 'content-type': 'text/json' });
//           res.end(JSON.stringify('Network Error'));
//         }
//       }
//     });
//   } catch (error) {
//     res.writeHead(500, { 'content-type': 'text/json' });
//     res.end(JSON.stringify('Network Error'));
//   } finally {
//     if (con) {
//       con.end();
//     }
//   }
//   return res;
// };

// add the salary review and increment the salary review count
const salaryAddReview = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const { CompanyID } = req.body;
  try {
    const rev = await Salary.findOne({}).sort({ SalaryReviewID: -1 }).select('SalaryReviewID');
    let SalaryReviewID = null;
    if (rev) {
      SalaryReviewID = rev.SalaryReviewID + 1;
    } else {
      SalaryReviewID = 1;
    }
    const review = new Salary({
      SalaryReviewID,
      Status: 'Not Approved',
      DatePosted: Date.now(),
      ...req.body,
    });
    await review.save();
    Company.findOneAndUpdate(
      { CompanyID },
      { $inc: { SalaryReviewCount: 1 } },

      (err, results) => {
        if (err) {
          res.writeHead(500, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Network'));
        }
        if (results) {
          res.writeHead(200, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Salary Review Added'));
        }
      }
    );
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
// get the feature Reviews for the company
const featureReview = async (req, res) => {
  const { CompanyID } = req.query;
  try {
    const resultData = {};
    const company = await Company.findOne({ CompanyID }).select('FeaturedReview');
    resultData.featuredReview = company.FeaturedReview;
    const posquery = await General.findOne({ CompanyID, Rating: { $gt: 3 } }).sort({
      Helpful: -1,
    });
    const negquery = await General.findOne({ CompanyID, Rating: { $lt2: 3 } }).sort({
      Helpful: -1,
    });
    // eslint-disable-next-line prefer-destructuring
    resultData.positiveReview = posquery;
    // eslint-disable-next-line prefer-destructuring
    resultData.negativeReview = negquery;
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// get the interview Review for the company
const getInterviewReivew = async (req, res) => {
  try {
    const { PageNo, CompanyID } = req.query;
    const results = await Interview.find({ CompanyID })
      .limit(10)
      .skip(PageNo * 10);
    const company = await Company.find({ CompanyID });
    let ProfileImg = null;
    if (company[0].ProfileImg) {
      ProfileImg = company[0].ProfileImg;
    }

    const count = await Interview.countDocuments({ CompanyID });
    const resultData = { results, ProfileImg, count };
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    // eslint-disable-next-line no-console
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
// get the interview Review for the company
const getInterviewReivewStudent = async (req, res) => {
  try {
    const { PageNo, StudentID } = req.query;
    const results = await Interview.find({ StudentID })
      .limit(10)
      .skip(PageNo * 10);
    const count = await Interview.countDocuments({ StudentID });
    const resultData = { results, count };
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    // eslint-disable-next-line no-console
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// add the salary review and increment the salary review count
const interviewAddReview = async (req, res) => {
  // eslint-disable-next-line no-unused-vars
  const {
    CompanyID,
    StudentID,
    CompanyName,
    OverallExperience,
    JobTitle,
    Description,
    Difficulty,
    OfferStatus,
    InterviewQuestions,
    Answers,
    StreetAddress,
    City,
    State,
    Zip,
  } = req.body;
  try {
    const rev = await Interview.findOne({})
      .sort({ InterviewReviewID: -1 })
      .select('InterviewReviewID');
    let InterviewReviewID = null;
    if (rev) {
      InterviewReviewID = rev.InterviewReviewID + 1;
    } else {
      InterviewReviewID = 1;
    }
    const review = new Interview({
      InterviewReviewID,
      Status: 'Not Approved',
      DatePosted: Date.now(),
      CompanyID,
      StudentID,
      CompanyName,
      OverallExperience,
      JobTitle,
      Description,
      Difficulty,
      OfferStatus,
      InterviewQuestions,
      Answers,
      StreetAddress,
      City,
      State,
      Zip,
    });
    await review.save();

    Company.findOneAndUpdate(
      { CompanyID },
      { $inc: { InterviewReviewCount: 1 } },

      (error, results) => {
        if (error) {
          res.writeHead(500, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Network'));
        }
        if (results) {
          res.writeHead(200, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Interview Review Added'));
        }
      }
    );
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }

  return res;
};

// get the interview Data for the company
const interviewData = async (req, res) => {
  const { CompanyID } = req.query;
  try {
    const pipeline = [
      { $match: { CompanyID } },
      {
        $group: {
          _id: '$CompanyID',
          adAvg: { $avg: '$Difficulty' },
        },
      },
    ];

    const result = await Interview.aggregate(pipeline);
    const pos = await Interview.countDocuments({ CompanyID, OverallExperience: 'Positive' });
    const neg = await Interview.countDocuments({ CompanyID, OverallExperience: 'Negative' });
    const neutral = await Interview.countDocuments({ CompanyID, OverallExperience: 'Neutral' });
    const resultObj = {};
    // eslint-disable-next-line func-names
    resultObj.negative = neg;
    resultObj.positive = pos;
    resultObj.neutral = neutral;
    resultObj.totalInterviews = neutral + pos + neg;
    resultObj.avgDifficulty = result[0].adAvg;
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultObj));
  } catch (error) {
    // eslint-disable-next-line no-console
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// update company helpful  for the general review
const companyHelpfulReview = async (req, res) => {
  const { CompanyID, ID, StudentID } = req.body;
  try {
    const stud = await Student.findOne({ StudentID }).select('HelpfullGeneralReviews');
    if (stud.HelpfullGeneralReviews.includes(ID)) {
      const index = stud.HelpfullGeneralReviews.indexOf(ID);
      stud.HelpfullGeneralReviews.splice(index, 1);
      await General.findOneAndUpdate(
        { ID },
        { $inc: { Helpful: -1 } },

        (error) => {
          if (error) {
            res.writeHead(500, { 'content-type': 'text/json' });
            res.end(JSON.stringify('Network'));
          }
        }
      );
      await Student.update({ StudentID }, { HelpfullGeneralReviews: stud.HelpfullGeneralReviews });
      const company = await Company.findOne({ CompanyID }).select('FeaturedReview');
      if (company.FeaturedReview.ID === ID) {
        company.FeaturedReview.Helpful -= 1;
        Company.findOneAndUpdate(
          { CompanyID },
          { FeaturedReview: company.FeaturedReview },

          (err, response) => {
            if (err) {
              res.writeHead(500, { 'content-type': 'text/json' });
              res.end(JSON.stringify('Network'));
            }
            if (response) {
              res.writeHead(200, { 'content-type': 'text/json' });
              res.end(JSON.stringify({ message: 'helpfull removed' }));
            }
          }
        );
      } else {
        res.writeHead(200, { 'content-type': 'text/json' });
        res.end(JSON.stringify({ message: 'helpfull removed' }));
      }
    } else {
      await General.findOneAndUpdate(
        { ID },
        { $inc: { Helpful: 1 } },

        (error) => {
          if (error) {
            res.writeHead(500, { 'content-type': 'text/json' });
            res.end(JSON.stringify('Network'));
          }
        }
      );
      await Student.update({ StudentID }, { $push: { HelpfullGeneralReviews: ID } });
      const company = await Company.findOne({ CompanyID }).select('FeaturedReview');
      if (company.FeaturedReview.ID === ID) {
        company.FeaturedReview.Helpful += 1;
        Company.findOneAndUpdate(
          { CompanyID },
          { FeaturedReview: company.FeaturedReview },

          (err, response) => {
            if (err) {
              res.writeHead(500, { 'content-type': 'text/json' });
              res.end(JSON.stringify('Network'));
            }
            if (response) {
              res.writeHead(200, { 'content-type': 'text/json' });
              res.end(JSON.stringify({ message: 'helpfull added' }));
            }
          }
        );
      } else {
        res.writeHead(200, { 'content-type': 'text/json' });
        res.end(JSON.stringify({ message: 'helpfull added' }));
      }
    }
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// update company helpful  for the interview review
const companyInterviewHelpfulReview = async (req, res) => {
  const { ID, StudentID } = req.body;
  try {
    const stud = await Student.findOne({ StudentID }).select('HelpfullInterviewReviews');
    if (stud.HelpfullInterviewReviews.includes(ID)) {
      const index = stud.HelpfullInterviewReviews.indexOf(ID);
      stud.HelpfullInterviewReviews.splice(index, 1);
      Interview.findOneAndUpdate(
        { InterviewReviewID: ID },
        { $inc: { Helpful: -1 } },

        async (error) => {
          if (error) {
            res.writeHead(500, { 'content-type': 'text/json' });
            res.end(JSON.stringify('Network'));
          } else {
            await Student.update(
              { StudentID },
              { HelpfullInterviewReviews: stud.HelpfullInterviewReviews }
            );

            res.writeHead(200, { 'content-type': 'text/json' });
            res.end(JSON.stringify({ message: 'helpfull removed' }));
          }
        }
      );
    } else {
      Interview.findOneAndUpdate(
        { InterviewReviewID: ID },
        { $inc: { Helpful: 1 } },

        async (error) => {
          if (error) {
            res.writeHead(500, { 'content-type': 'text/json' });
            res.end(JSON.stringify('Network'));
          } else {
            await Student.update({ StudentID }, { $push: { HelpfullInterviewReviews: ID } });

            res.writeHead(200, { 'content-type': 'text/json' });
            res.end(JSON.stringify({ message: 'helpfull added' }));
          }
        }
      );
    }
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// search company jobs
const companyJobs = async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { CompanyID, Title, City, PageNo } = req.query;
    const filterArray = [];
    if (Title.length !== 0) {
      filterArray.push({ Title: { $regex: `${Title}`, $options: 'i' } });
    }
    if (City.length !== 0) {
      filterArray.push({ City: { $regex: `${City}`, $options: 'i' } });
    }
    filterArray.push({ CompanyID: { $eq: `${CompanyID}` } });
    let companyResults = null;
    let count = 0;
    companyResults = await Job.find({ $and: filterArray })
      .limit(10)
      .skip(PageNo * 10)
      .exec();
    count = await Job.find({ $and: filterArray }).countDocuments();
    const noOfPages = Math.ceil(count / 10);
    const resultData = [companyResults, count, noOfPages];
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

const fillJobApplication = async (req, res) => {
  try {
    const { JobID, CompanyID } = req.query;
    const jobData = await Job.find({ _id: JobID });
    const CompanyData = await Company.find(
      { CompanyID },
      { GeneralReviewCount: 1, TotalGeneralReviewRating: 1, CoverPhoto: 1, ProfileImg: 1, Size: 1 }
    );
    const result = { Job: jobData, Company: CompanyData };
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// Get the favorite jobs full details
const getFavoriteJobs = async (req, res) => {
  try {
    const { StudentID, PageNo } = req.query;
    const result = {};
    await Student.find({ StudentID }, { FavouriteJobs: 1 }, async (err, data) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end('Network Error');
      }
      if (data) {
        const dataArray = data[0].FavouriteJobs.slice(PageNo * 10, PageNo * 10 + 10);
        const ids = dataArray.map(function (el) {
          return mongoose.Types.ObjectId(el);
        });
        if (data[0].FavouriteJobs) {
          const { length } = data[0].FavouriteJobs;
          result.count = { length };
        }
        const jobResults = await Job.aggregate([
          {
            $match: { _id: { $in: ids } },
          },
          {
            $lookup: {
              from: 'companies',
              localField: 'CompanyID',
              foreignField: 'CompanyID',
              as: 'jobdetails',
            },
          },
        ])
          .limit(10)
          .skip(PageNo * 10);
        result.job = jobResults;

        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(result));
      }
    });
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// Get the applied jobs full Details
const getAppliedJobs = async (req, res) => {
  try {
    const { StudentID, PageNo } = req.query;
    const result = {};
    await Student.find({ StudentID }, { AppliedJobs: 1 }, async (err, data) => {
      if (err) {
        res.writeHead(500, {
          'Content-Type': 'application/json',
        });
        res.end('Network Error');
      }
      if (data) {
        const dataArray = data[0].AppliedJobs.slice(PageNo * 10, PageNo * 10 + 10);
        const ids = dataArray.map(function (el) {
          return mongoose.Types.ObjectId(el);
        });
        if (data[0].AppliedJobs) {
          const { length } = data[0].AppliedJobs;
          result.count = { length };
        }
        const jobResults = await Job.aggregate([
          {
            $match: { _id: { $in: ids } },
          },
          {
            $lookup: {
              from: 'companies',
              localField: 'CompanyID',
              foreignField: 'CompanyID',
              as: 'jobdetails',
            },
          },
        ])
          .limit(10)
          .skip(PageNo * 10);
        result.job = jobResults;

        res.writeHead(200, {
          'Content-Type': 'application/json',
        });
        res.end(JSON.stringify(result));
      }
    });
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// To get the salary reviews
const companyPhotos = async (req, res) => {
  try {
    const { PageNo, CompanyID } = req.query;
    const results = await Photo.find({ CompanyID })
      .limit(10)
      .skip(PageNo * 10);
    const count2 = await Photo.countDocuments({ CompanyID });
    const count = count2;
    const resultData = { results, count };
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

// To get the salary reviews
const studentCompanyPhotos = async (req, res) => {
  try {
    const { PageNo, StudentID } = req.query;
    const results = await Photo.find({ StudentID })
      .limit(10)
      .skip(PageNo * 10);
    const count2 = await Photo.countDocuments({ StudentID });
    const count = count2;
    const resultData = { results, count };
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};
// To get the salary reviews
const addCompanyPhotos = async (req, res) => {
  try {
    const { StudentID, CompanyID, Photos, CompanyName } = req.body;
    const count2 = await Photo.countDocuments();
    let ID = count2 + 1;
    let PhotoURL = null;
    // eslint-disable-next-line no-restricted-syntax
    for (PhotoURL of Photos) {
      const photo = new Photo({
        ID,
        CompanyID,
        StudentID,
        // eslint-disable-next-line no-undef
        PhotoURL: PhotoURL.imageurl,
        DateUploaded: Date.now(),
        CompanyName,
        Status: 'Not Approved',
      });
      // eslint-disable-next-line no-await-in-loop
      await photo.save();
      ID += 1;
    }
    Company.findOneAndUpdate(
      { CompanyID },
      { $inc: { PhotoCount: Photos.length } },

      (err, results) => {
        if (err) {
          res.writeHead(500, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Network'));
        }
        if (results) {
          res.writeHead(200, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Photos Review Added'));
        }
      }
    );
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

const searchSalary = async (req, res) => {
  try {
    const { searchString, State, PageNo } = req.query;
    const resultData = {};
    await Company.find(
      {
        CompanyName: { $regex: `${searchString}`, $options: 'i' },
        State: { $regex: `${State}`, $options: 'i' },
      },
      { CompanyID: 1, CompanyName: 1, ProfileImg: 1, Website: 1, SalaryReviewCount: 1 },
      async (err, result) => {
        if (err) {
          res.writeHead(500, { 'content-type': 'text/json' });
          res.end(JSON.stringify('Network Error'));
        }
        if (result) {
          res.writeHead(200, { 'content-type': 'text/json' });
          resultData.result = { result };
        } else {
          res.writeHead(404, { 'content-type': 'text/json' });
          res.end(JSON.stringify('No data found'));
        }
      }
    )
      .limit(10)
      .skip(PageNo * 10);
    const count = await Company.find({
      CompanyName: { $regex: `${searchString}`, $options: 'i' },
      State: { $regex: `${State}`, $options: 'i' },
    }).countDocuments();
    resultData.count = { count };
    res.end(JSON.stringify(resultData));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

const companyViewCount = async (req, res) => {
  try {
    const { CompanyID } = req.body;
    const companyModel = await Company.find({ CompanyID }, { ViewCount: 1 });
    let ViewCount = null;
    if (companyModel[0].ViewCount) {
      ViewCount = companyModel[0].ViewCount + 1;
    } else {
      ViewCount = 1;
    }
    Company.updateOne({ CompanyID }, { ViewCount });
    res.writeHead(200, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Updated the view count of the company'));
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

const deleteSalaryReview = async (req, res) => {
  try {
    const { SalaryReviewID } = req.body;
    await Salary.deleteOne({ SalaryReviewID }, (err, result) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Network Error'));
      }
      if (result) {
        res.writeHead(200, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Deleted the Salary review'));
      } else {
        res.writeHead(404, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Not found'));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

const deleteInterviewReview = async (req, res) => {
  try {
    const { InterviewReviewID } = req.body;
    await Interview.deleteOne({ InterviewReviewID }, (err, result) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Network Error'));
      }
      if (result) {
        res.writeHead(200, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Deleted the Interview review'));
      } else {
        res.writeHead(404, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Not found'));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

const deleteGeneralReview = async (req, res) => {
  try {
    const { GeneralReviewID } = req.body;
    await General.deleteOne({ GeneralReviewID }, (err, result) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Network Error'));
      }
      if (result) {
        res.writeHead(200, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Deleted the General review'));
      } else {
        res.writeHead(404, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Not found'));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

const deletePhoto = async (req, res) => {
  try {
    const { ID } = req.body;
    await Photo.deleteOne({ ID }, (err, result) => {
      if (err) {
        res.writeHead(500, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Network Error'));
      }
      if (result) {
        res.writeHead(200, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Deleted the Photo'));
      } else {
        res.writeHead(404, { 'content-type': 'text/json' });
        res.end(JSON.stringify('Not found'));
      }
    });
  } catch (error) {
    res.writeHead(500, { 'content-type': 'text/json' });
    res.end(JSON.stringify('Network Error'));
  }
  return res;
};

module.exports = {
  navbar,
  searchCompany,
  getJobSuggestions,
  searchJob,
  companyApplyJob,
  companyFavouriteJobs,
  removeFavouriteJobs,
  searchInterview,
  resumesAdd,
  resumesDelete,
  jobWithdraw,
  profileUpdate,
  companyProfile,
  salaryAddReview,
  featureReview,
  getInterviewReivew,
  interviewAddReview,
  companyJobs,
  salaryReview,
  companyInterviewHelpfulReview,
  fillJobApplication,
  getFavoriteJobs,
  getAppliedJobs,
  companyReview,
  addCompanyReview,
  companyHelpfulReview,
  interviewData,
  getInterviewReivewStudent,
  studentSalaryReview,
  studentCompanyReview,
  companyPhotos,
  studentCompanyPhotos,
  addCompanyPhotos,
  searchSalary,
  companyViewCount,
  deleteSalaryReview,
  deleteInterviewReview,
  deleteGeneralReview,
  deletePhoto,
  // getAllReview,
};
