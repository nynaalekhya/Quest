/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const url = require('url');
const { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } = require('constants');
const mysqlConnection = require('../mysqlConnection');

const GeneralReview = require('../model/GeneralReview');
const InterviewReview = require('../model/InterviewReview');
const SalaryReview = require('../model/SalaryReview');
const Company = require('../model/Company');
const Student = require('../model/Student');
const Photos = require('../model/Photos');
const redisClient = require('../redisClient');
// eslint-disable-next-line camelcase

async function handle_request(msg, callback) {
  // eslint-disable-next-line default-case
  switch (msg.api) {
    case 'reviews': {
      const res = {};
      try {
        const { PageNo } = msg.query;
        const reviewsData = await GeneralReview.find({ Status: 'Not Approved' })
          .limit(10)
          .skip(PageNo * 10)
          .exec();
        res.status = 200;
        res.end = JSON.stringify(reviewsData);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'updateGeneralReviews': {
      const res = {};
      try {
        const { CompanyID, ID, Status } = msg.body;
        const filter = { $and: [{ CompanyID }, { ID }] };
        const update = { Status };
        const result = await GeneralReview.findOneAndUpdate(filter, update);
        // eslint-disable-next-line array-callback-return
        res.status = 200;
        if (Status === 'Approved') {
          const companyData = await Company.find({ CompanyID });
          let GeneralReviewCount = 0;
          let approveCEOcount = 0;
          let recommendedcount = 0;
          const TotalGeneralReviewRating = companyData[0].TotalGeneralReviewRating + result.Rating;
          if (result.CEOApproval === true) {
            approveCEOcount = companyData[0].approveCEOcount + 1;
          } else {
            approveCEOcount = companyData[0].approveCEOcount;
          }

          if (result.Recommended === true) {
            recommendedcount = companyData[0].recommendedcount + 1;
          } else {
            recommendedcount = companyData[0].recommendedcount;
          }
          if (companyData[0].GeneralReviewCount >= 0) {
            GeneralReviewCount = companyData[0].GeneralReviewCount + 1;
          }
          await Company.updateOne(
            { CompanyID },
            { GeneralReviewCount, approveCEOcount, recommendedcount, TotalGeneralReviewRating }
          );
          const redisKey = `getCompanyProfile-CompanyID=${CompanyID}`;
          await redisClient.get(redisKey, async (err, data) => {
            // data is available in Redis
            if (data) {
              redisClient.del(redisKey);
            }
          });
        }
        res.end = JSON.stringify(result);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'updateInterviewReviews': {
      const res = {};
      try {
        const { CompanyID, InterviewReviewID, Status } = msg.body;
        const filter = { $and: [{ CompanyID }, { InterviewReviewID }] };
        const update = { Status };
        const result = await InterviewReview.findOneAndUpdate(filter, update);
        // eslint-disable-next-line array-callback-return
        res.status = 200;
        if (Status === 'Approved') {
          await Company.findOneAndUpdate(
            { CompanyID },
            { $inc: { InterviewReviewCount: 0.5 } },

          async  (error, results) => {
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
        }
        res.end = JSON.stringify(result);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'updateSalaryReviews': {
      const res = {};
      try {
        const { CompanyID, SalaryReviewID, Status } = msg.body;
        const filter = { $and: [{ CompanyID }, { SalaryReviewID }] };
        const update = { Status };
        const result = await SalaryReview.findOneAndUpdate(filter, update);
        // eslint-disable-next-line array-callback-return
        res.status = 200;
        if (Status === 'Approved') {
          await Company.findOneAndUpdate(
            { CompanyID },
            { $inc: { SalaryReviewCount: 0.5 } },

          async  (error, results) => {
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
        }
        res.end = JSON.stringify(result);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'companyList': {
      const res = {};
      try {
        const { searchString, PageNo } = msg.query;
        const results = await Company.find({
          CompanyName: { $regex: `${searchString}`, $options: 'i' },
        })
          .limit(10)
          .skip(PageNo * 10)
          .exec();
        res.status = 200;
        res.end = JSON.stringify(results);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'companyReviewList': {
      const res = {};
      try {
        const { CompanyID, PageNo } = msg.query;
        const results = await GeneralReview.find({ CompanyID })
          .limit(10)
          .skip(PageNo * 10)
          .exec();
        res.status = 200;
        res.end = JSON.stringify(results);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'pictures': {
      const res = {};
      try {
        const { PageNo } = msg.query;
        const reviewsData = await Photos.find({ Status: 'Not Approved' })
          .limit(10)
          .skip(PageNo * 10)
          .exec();
        res.status = 200;
        res.end = JSON.stringify(reviewsData);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'updatePictures': {
      const res = {};
      try {
        const { CompanyID, ID, Status } = msg.body;
        const filter = { $and: [{ CompanyID }, { ID }] };
        const update = { Status };
        const result = await Photos.findOneAndUpdate(filter, update);
        // eslint-disable-next-line array-callback-return
        res.status = 200;
        if (Status === 'Approved') {
          await Company.findOneAndUpdate(
            { CompanyID },
            { $inc: { PhotoCount: 0.5 } },

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
        }
        res.end = JSON.stringify(result);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'jobStats': {
      const res = {};
      let con = null;
      const resultData = {};
      try {
        const { CompanyID } = msg.query;
        con = await mysqlConnection();
        let getQuery = 'SELECT COUNT(*) As NumberOfJobs FROM APPLICATION_JOB WHERE CompanyID = ?';
        let [results] = await con.query(getQuery, CompanyID);
        resultData.JobCount = results;
        getQuery =
          'SELECT COUNT(*) As TotalApplicants FROM APPLICATION_RECEIVED AR JOIN APPLICATION_JOB AJ ON AR.JobID = AJ.JobID WHERE CompanyID = ?';
        [results] = await con.query(getQuery, CompanyID);
        resultData.TotalApplicants = results;
        getQuery =
          'SELECT COUNT(*) AS SelectedApplicants FROM APPLICATION_RECEIVED AR JOIN APPLICATION_JOB AJ ON AR.JobID = AJ.JobID WHERE CompanyID = ? AND STATUS = ?';
        [results] = await con.query(getQuery, [CompanyID, 'Hired']);
        resultData.HiredApplicants = results;
        getQuery =
          'SELECT COUNT(*) AS RejectedApplicants FROM APPLICATION_RECEIVED AR JOIN APPLICATION_JOB AJ ON AR.JobID = AJ.JobID WHERE CompanyID = ? AND STATUS = ?';
        [results] = await con.query(getQuery, [CompanyID, 'Rejected']);
        resultData.RejectedApplicants = results;
        getQuery =
          'SELECT Ethnicity, COUNT(Ethnicity) As Count FROM APPLICATION_RECEIVED AR JOIN APPLICATION_JOB AJ ON AR.JobID = AJ.JobID WHERE CompanyID = ? GROUP BY Ethnicity';
        [results] = await con.query(getQuery, CompanyID);
        resultData.Ethnicity = results;
        getQuery =
          'SELECT Gender, COUNT(Gender) As Count FROM APPLICATION_RECEIVED AR JOIN APPLICATION_JOB AJ ON AR.JobID = AJ.JobID WHERE CompanyID = ? GROUP BY Gender';
        [results] = await con.query(getQuery, CompanyID);
        resultData.Gender = results;
        getQuery =
          'SELECT Disability, COUNT(Disability) As Count FROM APPLICATION_RECEIVED AR JOIN APPLICATION_JOB AJ ON AR.JobID = AJ.JobID WHERE CompanyID = ? GROUP BY Disability';
        [results] = await con.query(getQuery, CompanyID);
        resultData.Disability = results;
        getQuery =
          'SELECT VeteranStatus, COUNT(VeteranStatus) As Count FROM APPLICATION_RECEIVED AR JOIN APPLICATION_JOB AJ ON AR.JobID = AJ.JobID WHERE CompanyID = ? GROUP BY VeteranStatus';
        [results] = await con.query(getQuery, CompanyID);
        resultData.VeteranStatus = results;

        res.status = 200;
        res.end = JSON.stringify(resultData);
        callback(null, res);
      } catch {
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
    case 'analytics': {
      const res = {};
      try {
        const todayDate = new Date();
        const day = String(todayDate.getDate()).padStart(2, '0');
        const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // January is 0!
        const year = todayDate.getFullYear();
        const today = `${year}-${month}-${day}`;
        const reviewData = await GeneralReview.find({
          DatePosted: { $gte: today },
        }).countDocuments();

        const topCompanyList = await Company.find({})
          .sort({ GeneralReviewCount: -1, CompanyName: 1 })
          .limit(5);

        const topAveragerRating = await Company.aggregate([
          {
            $match: { GeneralReviewCount: { $ne: 0 } },
          },
          {
            $project: {
              _id: '$CompanyID',
              average: {
                $divide: ['$TotalGeneralReviewRating', '$GeneralReviewCount'],
              },
            },
          },
          {
            $sort: { average: -1 },
          },
          {
            $limit: 5,
          },
        ]);

        const topAverageCompanyArray = [];
        // eslint-disable-next-line no-plusplus
        let count = 0;
        // eslint-disable-next-line no-plusplus
        for (let index = 0; index < topAveragerRating.length; index++) {
          if (topAveragerRating[index].average !== null) {
            count += 1;
            // eslint-disable-next-line no-underscore-dangle
            topAverageCompanyArray.push(topAveragerRating[index]._id);
          }
        }

        let topAverageList = await Company.find({ CompanyID: { $in: topAverageCompanyArray } });

        if (count < 5) {
          const zeroCount = await Company.find({ GeneralReviewCount: 0 })
            .sort({ CompanyName: 1 })
            .limit(5 - count);
          topAverageList = topAverageList.concat(zeroCount);
        }

        const topStudentList = await Student.find({})
          .sort({ AcceptedReviewCount: -1, Name: 1 })
          .limit(5);

        const topCEOCompanyList = await Company.find({})
          .sort({ approveCEOcount: -1, CompanyName: 1 })
          .limit(5);

        const topViewCompanyList = await Company.find({}).sort({ ViewCount: -1 }).limit(10);
        const resultData = {
          reviewData,
          topCompanyList,
          topAverageList,
          topStudentList,
          topCEOCompanyList,
          topViewCompanyList,
        };
        res.status = 200;
        res.end = JSON.stringify(resultData);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getGeneralReviews': {
      const res = {};
      try {
        const { Status, PageNo } = msg.query;
        const resultArray = [];
        if (Status.length !== 0) {
          await GeneralReview.find({ Status }, (err, result) => {
            if (err) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            }
            if (result) {
              resultArray.push({ Review: result });
            }
          })
            .sort({ DatePosted: -1 })
            .limit(10)
            .skip(PageNo * 10);
          const count = await GeneralReview.find({ Status }).countDocuments();
          resultArray.push({ Count: count });
        } else {
          await GeneralReview.find({}, (err, result) => {
            if (err) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            }
            if (result) {
              resultArray.push({ Review: result });
            }
          })
            .sort({ DatePosted: -1 })
            .limit(10)
            .skip(PageNo * 10);
          const count = await GeneralReview.find({}).countDocuments();
          resultArray.push({ Count: count });
        }
        res.status = 200;
        res.end = JSON.stringify(resultArray);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getSalaryReviews': {
      const res = {};
      try {
        const { Status, PageNo } = msg.query;
        const resultArray = [];
        if (Status.length !== 0) {
          await SalaryReview.find({ Status }, (err, result) => {
            if (err) {
              res.writeHead(500, {
                'Content-Type': 'application/json',
              });
              res.end('Network Error');
            }
            if (result) {
              resultArray.push({ Review: result });
            }
          })
            .limit(10)
            .skip(PageNo * 10);
          const count = await SalaryReview.find({ Status }).countDocuments();
          resultArray.push({ Count: count });
        } else {
          await SalaryReview.find({}, (err, result) => {
            if (err) {
              res.writeHead(500, {
                'Content-Type': 'application/json',
              });
              res.end('Network Error');
            }
            if (result) {
              resultArray.push({ Review: result });
            }
          })
            .limit(10)
            .skip(PageNo * 10);
          const count = await SalaryReview.find({}).countDocuments();
          resultArray.push({ Count: count });
        }
        res.status = 200;
        res.end = JSON.stringify(resultArray);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getInterviewReviews': {
      const res = {};
      try {
        const { Status, PageNo } = msg.query;
        const resultArray = [];
        if (Status.length !== 0) {
          await InterviewReview.find({ Status }, (err, result) => {
            if (err) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            }
            if (result) {
              resultArray.push({ Review: result });
            }
          })
            .limit(10)
            .skip(PageNo * 10);
          const count = await InterviewReview.find({ Status }).countDocuments();
          resultArray.push({ Count: count });
        } else {
          await InterviewReview.find({}, (err, result) => {
            if (err) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            }
            if (result) {
              resultArray.push({ Review: result });
            }
          })
            .limit(10)
            .skip(PageNo * 10);
          const count = await InterviewReview.find({}).countDocuments();
          resultArray.push({ Count: count });
        }
        res.status = 200;
        res.end = JSON.stringify(resultArray);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getPhotos': {
      const res = {};
      try {
        const { Status, PageNo } = msg.query;
        const resultArray = [];
        if (Status.length !== 0) {
          await Photos.find({ Status }, (err, result) => {
            if (err) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            }
            if (result) {
              resultArray.push({ Review: result });
            }
          })
            .limit(10)
            .skip(PageNo * 10);
          const count = await Photos.find({ Status }).countDocuments();
          resultArray.push({ Count: count });
        } else {
          await Photos.find({}, (err, result) => {
            if (err) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            }
            if (result) {
              resultArray.push({ Review: result });
            }
          })
            .limit(10)
            .skip(PageNo * 10);
          const count = await Photos.find({}).countDocuments();
          resultArray.push({ Count: count });
        }
        res.status = 200;
        res.end = JSON.stringify(resultArray);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getCompanyGeneralReviews': {
      const res = {};
      try {
        const { CompanyID, PageNo } = msg.query;
        const resultArray = [];
        await GeneralReview.find({ CompanyID }, (err, result) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
          if (result) {
            resultArray.push({ Review: result });
          }
        })
          .sort({ DatePosted: -1 })
          .limit(10)
          .skip(PageNo * 10);
        const count = await GeneralReview.find({ CompanyID }).countDocuments();
        resultArray.push({ Count: count });
        res.status = 200;
        res.end = JSON.stringify(resultArray);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getCompanySalaryReviews': {
      const res = {};
      try {
        const { CompanyID, PageNo } = msg.query;
        const resultArray = [];
        await SalaryReview.find({ CompanyID }, (err, result) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
          if (result) {
            resultArray.push({ Review: result });
          }
        })
          .sort({ DatePosted: -1 })
          .limit(10)
          .skip(PageNo * 10);
        const count = await SalaryReview.find({ CompanyID }).countDocuments();
        resultArray.push({ Count: count });
        res.status = 200;
        res.end = JSON.stringify(resultArray);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getCompanyInterviewReviews': {
      const res = {};
      try {
        const { CompanyID, PageNo } = msg.query;
        const resultArray = [];
        await InterviewReview.find({ CompanyID }, (err, result) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
          if (result) {
            resultArray.push({ Review: result });
          }
        })
          .sort({ DatePosted: -1 })
          .limit(10)
          .skip(PageNo * 10);
        const count = await InterviewReview.find({ CompanyID }).countDocuments();
        resultArray.push({ Count: count });
        res.status = 200;
        res.end = JSON.stringify(resultArray);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getCompanyPhotos': {
      const res = {};
      try {
        const { CompanyID, PageNo } = msg.query;
        const resultArray = [];
        await Photos.find({ CompanyID }, (err, result) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
          if (result) {
            resultArray.push({ Review: result });
          }
        })
          .sort({ DateUploaded: -1 })
          .limit(10)
          .skip(PageNo * 10);
        const count = await Photos.find({ CompanyID }).countDocuments();
        resultArray.push({ Count: count });
        res.status = 200;
        res.end = JSON.stringify(resultArray);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
  }
}
exports.handle_request = handle_request;
