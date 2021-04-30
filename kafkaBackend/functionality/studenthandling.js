/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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
// eslint-disable-next-line camelcase
async function handle_request(msg, callback) {
  // eslint-disable-next-line default-case
  switch (msg.api) {
    case 'deletePhoto': {
      const res = {};
      try {
        const { ID } = msg.body;
        const result = Photo.findOne({ ID });
        await Photo.deleteOne({ ID }, async (err, result2) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
          if (result2) {
            if (result.Status === 'Approved') {
              const { CompanyID } = result;
              const companyModel = await Company.findOneAndUpdate(
                { CompanyID },
                { $inc: { PhotoCount: -1 } }
              );
            }

            res.status = 200;
            res.end = 'Deleted the Photo';
            callback(null, res);
          } else {
            res.status = 404;
            res.end = 'Not found';
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'deleteGeneralReview': {
      const res = {};
      try {
        const { GeneralReviewID } = msg.body;
        const result = General.findOne({ ID: GeneralReviewID });
        await General.deleteOne({ ID: GeneralReviewID }, async (err, result2) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
          if (result2) {
            if (result.Status === 'Approved') {
              const rating = result.Rating;
              const { CompanyID } = result;
              const recommended = result.Recommended ? -1 : 0;
              const approveCEO = result.CEOApproval ? -1 : 0;
              const companyModel = await Company.findOneAndUpdate(
                { CompanyID },
                {
                  $inc: {
                    GeneralReviewCount: -1,
                    TotalGeneralReviewRating: -rating,
                    recommendedcount: recommended,
                    approveCEOcount: approveCEO,
                  },
                }
              );
              if (
                companyModel.FeaturedReview &&
                companyModel.FeaturedReview.ID === GeneralReviewID
              ) {
                await Company.findOneAndUpdate({ CompanyID }, { $unset: { FeaturedReview: {} } });
              }
            }
            res.status = 200;
            res.end = 'Deleted the General review';
            callback(null, res);
          } else {
            res.status = 404;
            res.end = 'Not found';
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'deleteInterviewReview': {
      const res = {};
      try {
        const { InterviewReviewID } = msg.body;
        const result = Interview.findOne({ InterviewReviewID });
        await Interview.deleteOne({ InterviewReviewID }, async (err, result2) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
            const result = Interview.findOne({ InterviewReviewID });
          }
          if (result2) {
            if (result.Status === 'Approved') {
              const { CompanyID } = result;
              const companyModel = await Company.findOneAndUpdate(
                { CompanyID },
                { $inc: { InterviewReviewCount: -1 } }
              );
            }
            res.status = 200;
            res.end = 'Deleted the Interview review';
            callback(null, res);
          } else {
            res.status = 404;
            res.end = 'Not found';
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'deleteSalaryReview': {
      const res = {};
      try {
        const { SalaryReviewID } = msg.body;
        const result = Salary.findOne({ SalaryReviewID });
        await Salary.deleteOne({ SalaryReviewID }, async (err, result2) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
          if (result2) {
            if (result.Status === 'Approved') {
              const { CompanyID } = result;
              const companyModel = await Company.findOneAndUpdate(
                { CompanyID },
                { $inc: { SalaryReviewCount: -1 } }
              );
            }
            res.status = 200;
            res.end = 'Deleted the Salary review';
            callback(null, res);
          } else {
            res.status = 404;
            res.end = 'Not found';
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'companyViewCount': {
      const res = {};
      try {
        const { CompanyID } = msg.body;
        const companyModel = await Company.findOneAndUpdate(
          { CompanyID },
          { $inc: { ViewCount: 1 } }
        );
        // let ViewCount = null;
        // if (companyModel[0].ViewCount) {
        //   ViewCount = companyModel[0].ViewCount + 1;
        // } else {
        //   ViewCount = 1;
        // }
        // Company.updateOne({ CompanyID }, { ViewCount });
        res.status = 200;
        res.end = 'Updated the view count of the company';
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'searchSalary': {
      const res = {};
      try {
        const { SearchString, State, PageNo } = msg.query;
        const resultData = {};
        await Company.find(
          {
            CompanyName: { $regex: `${SearchString}`, $options: 'i' },
            State: { $regex: `${State}`, $options: 'i' },
            SalaryReviewCount: { $gt: 0 },
          },
          {
            CompanyID: 1,
            CompanyName: 1,
            ProfileImg: 1,
            Website: 1,
            SalaryReviewCount: 1,
          },
          async (err, result) => {
            if (err) {
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            }
            if (result) {
              // res.writeHead(200, { 'content-type': 'text/json' });
              resultData.result = { result };
            } else {
              res.status = 404;
              res.end = 'No data found';
              callback(null, res);
            }
          }
        )
          .limit(10)
          .skip(PageNo * 10);
        const count = await Company.find({
          CompanyName: { $regex: `${SearchString}`, $options: 'i' },
          State: { $regex: `${State}`, $options: 'i' },
          SalaryReviewCount: { $gt: 0 },
        }).countDocuments();
        resultData.count = { count };
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
    // PLease Check
    case 'addCompanyPhotos': {
      const res = {};
      try {
        const { StudentID, CompanyID, Photos, CompanyName } = msg.body;
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
        res.status = 200;
        res.end = 'Photos Review Added';
        callback(null, res);
      } catch (error) {
        console.log(error);
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'studentCompanyPhotos': {
      const res = {};
      try {
        const { PageNo, StudentID } = msg.query;
        const results = await Photo.find({ StudentID })
          .limit(10)
          .skip(PageNo * 10);
        const count2 = await Photo.countDocuments({ StudentID });
        const count = count2;
        const resultData = { results, count };
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
    case 'companyPhotos': {
      const res = {};
      try {
        const { PageNo, CompanyID } = msg.query;
        const Status = 'Approved';
        const results = await Photo.find({ CompanyID, Status })
          .limit(10)
          .skip(PageNo * 10);
        const count2 = await Photo.countDocuments({ CompanyID, Status });
        const count = count2;
        const resultData = { results, count };

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
    case 'studentCompanyReview': {
      const res = {};
      try {
        const { StudentID, PageNo } = msg.query;
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
    case 'studentSalaryReview': {
      const res = {};
      try {
        const { PageNo, StudentID } = msg.query;
        const results = await Salary.find({ StudentID })
          .limit(10)
          .skip(PageNo * 10);

        const count = await Salary.countDocuments({ StudentID });
        const resultData = { results, count };
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
    case 'getInterviewReivewStudent': {
      const res = {};
      try {
        const { PageNo, StudentID } = msg.query;
        const results = await Interview.find({ StudentID })
          .limit(10)
          .skip(PageNo * 10);
        const count = await Interview.countDocuments({ StudentID });
        const resultData = { results, count };
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
    case 'getAppliedJobs': {
      const res = {};
      try {
        const { StudentID, PageNo } = msg.query;
        const result = {};
        await Student.find({ StudentID }, { AppliedJobs: 1 }, async (err, data) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
          if (data) {
            const dataArray = data[0].AppliedJobs.slice(PageNo * 10, PageNo * 10 + 10);
            const ids = dataArray.map((el) => mongoose.Types.ObjectId(el));
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
            res.status = 200;
            res.end = JSON.stringify(result);
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getFavoriteJobs': {
      const res = {};
      try {
        const { StudentID, PageNo } = msg.query;
        const result = {};
        await Student.find({ StudentID }, { FavouriteJobs: 1 }, async (err, data) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
          if (data) {
            const dataArray = data[0].FavouriteJobs.slice(PageNo * 10, PageNo * 10 + 10);
            // eslint-disable-next-line prefer-arrow-callback
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

            res.status = 200;
            res.end = JSON.stringify(result);
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
    // Please test once
    case 'fillJobApplication': {
      const res = {};
      try {
        const { JobID, CompanyID } = msg.query;
        const jobData = await Job.find({ _id: JobID });
        const CompanyData = await Company.find(
          { CompanyID },
          {
            GeneralReviewCount: 1,
            TotalGeneralReviewRating: 1,
            CoverPhoto: 1,
            ProfileImg: 1,
            Size: 1,
          }
        );
        const result = { Job: jobData, Company: CompanyData };
        res.status = 200;
        res.end = JSON.stringify(result);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'salaryReview': {
      const res = {};
      try {
        const { PageNo, CompanyID } = msg.query;
        const Status = 'Approved';
        const pipeline = [
          { $match: { CompanyID, Status: 'Approved' } },
          {
            $group: {
              _id: '$JobTitle',
              average: { $avg: { $add: ['$BaseSalary', '$Bonuses'] } },
              min: { $min: { $add: ['$BaseSalary', '$Bonuses'] } },
              max: { $max: { $add: ['$BaseSalary', '$Bonuses'] } },
            },
          },
        ];

        const result = await Salary.aggregate(pipeline)
          .limit(10)
          .skip(PageNo * 10);
        const company = await Company.find({ CompanyID });
        let ProfileImg = null;
        if (company[0].ProfileImg) {
          ProfileImg = company[0].ProfileImg;
        }

        pipeline.push({ $count: 'JobTitle' });
        const count = await Salary.aggregate(pipeline);
        const resultData = { result, ProfileImg, count };
        res.status = 200;
        res.end = JSON.stringify(resultData);
        callback(null, res);
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'companyJobs': {
      const res = {};
      try {
        const { CompanyID, Title, City, PageNo } = msg.query;
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
    case 'companyInterviewHelpfulReview': {
      const res = {};
      try {
        const { ID, StudentID } = msg.body;
        const stud = await Student.findOne({ StudentID }).select('HelpfullInterviewReviews');
        if (stud.HelpfullInterviewReviews.includes(ID)) {
          const index = stud.HelpfullInterviewReviews.indexOf(ID);
          stud.HelpfullInterviewReviews.splice(index, 1);
          Interview.findOneAndUpdate(
            { InterviewReviewID: ID },
            { $inc: { Helpful: -1 } },

            async (error) => {
              if (error) {
                res.status = 500;
                res.end = 'Network Error';
                callback(null, res);
              } else {
                await Student.update(
                  { StudentID },
                  { HelpfullInterviewReviews: stud.HelpfullInterviewReviews }
                );

                res.status = 200;
                res.end = JSON.stringify({ message: 'helpfull removed' });
                callback(null, res);
              }
            }
          );
        } else {
          Interview.findOneAndUpdate(
            { InterviewReviewID: ID },
            { $inc: { Helpful: 1 } },

            async (error) => {
              if (error) {
                res.status = 500;
                res.end = 'Network Error';
                callback(null, res);
              } else {
                await Student.update({ StudentID }, { $push: { HelpfullInterviewReviews: ID } });
                res.status = 200;
                res.end = JSON.stringify({ message: 'helpfull added' });
                callback(null, res);
              }
            }
          );
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'companyHelpfulReview': {
      const res = {};
      try {
        const { CompanyID, ID, StudentID } = msg.body;
        const stud = await Student.findOne({ StudentID }).select('HelpfullGeneralReviews');
        if (stud.HelpfullGeneralReviews.includes(ID)) {
          const index = stud.HelpfullGeneralReviews.indexOf(ID);
          stud.HelpfullGeneralReviews.splice(index, 1);
          General.findOneAndUpdate(
            { ID },
            { $inc: { Helpful: -1 } },

            (error) => {
              if (error) {
                res.status = 500;
                res.end = 'Network Error';
                callback(null, res);
              }
            }
          );
          await Student.update(
            { StudentID },
            { HelpfullGeneralReviews: stud.HelpfullGeneralReviews }
          );
          const company = await Company.findOne({ CompanyID }).select('FeaturedReview');
          if (company.FeaturedReview.ID === ID) {
            company.FeaturedReview.Helpful -= 1;
            Company.findOneAndUpdate(
              { CompanyID },
              { FeaturedReview: company.FeaturedReview },

              (err, response) => {
                if (err) {
                  res.status = 500;
                  res.end = 'Network Error';
                  callback(null, res);
                }
                if (response) {
                  res.status = 200;
                  res.end = JSON.stringify({ message: 'helpfull removed' });
                  callback(null, res);
                }
              }
            );
          } else {
            res.status = 200;
            res.end = JSON.stringify({ message: 'helpfull removed' });
            callback(null, res);
          }
        } else {
          await General.findOneAndUpdate(
            { ID },
            { $inc: { Helpful: 0.5 } },

            (error) => {
              if (error) {
                res.status = 500;
                res.end = 'Network Error';
                callback(null, res);
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
                  res.status = 500;
                  res.end = 'Network Error';
                  callback(null, res);
                }
                if (response) {
                  res.status = 200;
                  res.end = JSON.stringify({ message: 'helpfull added' });
                  callback(null, res);
                }
              }
            );
          } else {
            res.status = 200;
            res.end = JSON.stringify({ message: 'helpfull added' });
            callback(null, res);
          }
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'salaryAddReview': {
      const res = {};
      try {
        const { CompanyID } = msg.body;
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
          ...msg.body,
        });
        await review.save();
        res.status = 200;
        res.end = 'Salary Review Added';
        callback(null, res);
        // Company.findOneAndUpdate(
        //   { CompanyID },
        //   { $inc: { SalaryReviewCount: 1 } },

        //   (err, results) => {
        //     if (err) {
        //       res.status = 500;
        //       res.end = 'Network Error';
        //       callback(null, res);
        //     }
        //     if (results) {
        //       res.status = 200;
        //       res.end = 'Salary Review Added';
        //       callback(null, res);
        //     }
        //   }
        // );
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }

    case 'addCompanyReview': {
      const res = {};
      try {
        const { CompanyID, Rating, CEOApproval, Recommended } = msg.body;
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
          ...msg.body,
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
              res.status = 500;
              res.end = 'Network Error';
              callback(null, res);
            } else {
              res.status = 200;
              res.end = 'Company Review Added';
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
    case 'featureReview': {
      const res = {};
      try {
        const { CompanyID } = msg.query;
        const resultData = {};
        const company = await Company.findOne({ CompanyID }).select('FeaturedReview');
        resultData.featuredReview = company.FeaturedReview;
        const posquery = await General.findOne({
          CompanyID,
          Rating: { $gt: 3 },
          Status: 'Approved',
        }).sort({
          Helpful: -1,
        });
        const negquery = await General.findOne({
          CompanyID,
          Rating: { $lte: 3 },
          Status: 'Approved',
        }).sort({
          Helpful: -1,
        });
        // eslint-disable-next-line prefer-destructuring
        resultData.positiveReview = posquery;
        // eslint-disable-next-line prefer-destructuring
        resultData.negativeReview = negquery;
        res.status = 200;
        res.end = JSON.stringify(resultData);
        callback(null, res);
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'interviewAddReview': {
      const res = {};
      try {
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
        } = msg.body;
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
        res.status = 200;
        res.end = 'Interview Review Added';
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'interviewData': {
      const res = {};
      try {
        const { CompanyID } = msg.query;
        const pipeline = [
          { $match: { CompanyID, Status: 'Approved' } },
          {
            $group: {
              _id: '$CompanyID',
              adAvg: { $avg: '$Difficulty' },
            },
          },
        ];

        const result = await Interview.aggregate(pipeline);
        const pos = await Interview.countDocuments({
          CompanyID,
          OverallExperience: 'Positive',
          Status: 'Approved',
        });
        const neg = await Interview.countDocuments({
          CompanyID,
          OverallExperience: 'Negative',
          Status: 'Approved',
        });
        const neutral = await Interview.countDocuments({
          CompanyID,
          OverallExperience: 'Neutral',
          Status: 'Approved',
        });
        const resultObj = {};
        // eslint-disable-next-line func-names
        resultObj.negative = neg;
        resultObj.positive = pos;
        resultObj.neutral = neutral;
        resultObj.totalInterviews = neutral + pos + neg;
        resultObj.avgDifficulty = result[0].adAvg;
        res.status = 200;
        res.end = JSON.stringify(resultObj);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getInterviewReivew': {
      const res = {};
      try {
        const { PageNo, CompanyID } = msg.query;
        const Status = 'Approved';
        const results = await Interview.find({ CompanyID, Status })
          .limit(10)
          .skip(PageNo * 10);
        const company = await Company.find({ CompanyID });
        let ProfileImg = null;
        if (company[0].ProfileImg) {
          ProfileImg = company[0].ProfileImg;
        }

        const count = await Interview.countDocuments({ CompanyID, Status });
        const resultData = { results, ProfileImg, count };
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

    case 'companyReview': {
      const res = {};
      try {
        const { CompanyID, PageNo, StudentID } = msg.query;
        const Status = 'Approved';
        const studentReviewCount = await General.find({ StudentID }).countDocuments();
        let count23 = null;
        if (studentReviewCount > 0) {
          console.log('Greater than 5');
          const results = await General.find({
            CompanyID,
            Status,
          })
            .limit(10)
            .skip(PageNo * 10);
          // console.log(results);
          const temp = await General.countDocuments({
            CompanyID,
            Status,
          });

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
          res.status = 200;
          res.end = JSON.stringify(resultData);
          callback(null, res);
        } else {
          console.log('Less than 5');
          const results = await General.find({
            CompanyID,
            Status,
          }).limit(5);

          const resultData = [];
          resultData.push({ count: results.length });
          const no = 1;
          resultData.push({ noOfPages: no });
          resultData.push(results);
          res.status = 200;
          res.end = JSON.stringify(resultData);
          callback(null, res);
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    /* 
    case 'companyReview': {
      const res = {};
      try {
        const { CompanyID, PageNo } = msg.query;
        const Status = 'Approved';
        const results = await General.find({
          CompanyID,
          Status,
        })
          .limit(10)
          .skip(PageNo * 10);
        // console.log(results);
        const temp = await General.countDocuments({
          CompanyID,
          Status,
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
    */
    case 'companyProfile': {
      const res = {};
      try {
        const { CompanyID } = msg.query;
        const company = await Company.findOne({ CompanyID });
        Company.findOne({ CompanyID }, (err) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = JSON.stringify(company);
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
    case 'profileUpdate': {
      const res = {};
      try {
        const { StudentID } = msg.body;
        Student.findOne({ StudentID }, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
          if (results) {
            Student.updateOne({ StudentID }, { ...msg.body }, (er, data) => {
              if (er) {
                res.status = 500;
                res.end = 'Network Error';
                callback(null, res);
              }
              if (data) {
                res.status = 200;
                res.end = 'Updated Successfully';
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
    case 'jobWithdraw': {
      const res = {};
      let con = null;
      try {
        const { JobID, StudentID } = msg.body;
        const applicationWithdrawProcedure =
          'DELETE FROM APPLICATION_RECEIVED WHERE JobID=? AND StudentID=?;';
        con = await mysqlConnection();
        // eslint-disable-next-line no-unused-vars
        const [results, fields] = await con.query(applicationWithdrawProcedure, [JobID, StudentID]);
        con.release();
        await Student.update({ StudentID }, { $pull: { AppliedJobs: JobID } }, (err) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
        });
        res.status = 200;
        res.end = JSON.stringify('Withdrawn Successfully');
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
    case 'companyApplyJob': {
      const res = {};
      let con = null;
      try {
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
        } = msg.body;
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
        con.release();
        Student.update(
          { StudentID },
          {
            $push: { AppliedJobs: JobID },
          },
          (err, data) => {
            if (err) {
              console.log(err);
            } else if (data) {
              console.log(data);
            } else {
              console.log('something');
            }
          }
        );
        res.status = 200;
        res.end = 'Applied Successfully';
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
    // Please check one time
    case 'resumesDelete': {
      const res = {};
      try {
        const { StudentID, ResumeURL } = msg.body;
        await Student.update({ StudentID }, { $pull: { Resumes: ResumeURL } }, (err) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          }
        });
        const result = await Student.findOne({ StudentID }, { ResumePrimary: 1, _id: 0 }).exec();
        if (result.ResumePrimary === ResumeURL) {
          await Student.update({ StudentID }, { ResumePrimary: '' }).exec();
        }
        res.status = 200;
        res.end = 'Removed';
        callback(null, res);
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'resumesAdd': {
      const res = {};
      try {
        const { StudentID } = msg.body;
        const ResumeURL = msg.imageURL;
        Student.update({ StudentID }, { $push: { Resumes: ResumeURL } }, (err) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = JSON.stringify(ResumeURL);
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'searchInterview': {
      const res = {};
      try {
        const { SearchString, State, PageNo } = msg.query;
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
        res.status = 200;
        res.end = JSON.stringify(resultData);
        callback(null, res);
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'removeFavouriteJobs': {
      const res = {};
      try {
        const { StudentID, JobID } = msg.body;
        Student.update({ StudentID }, { $pull: { FavouriteJobs: JobID } }, (err) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = 'Removed';
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'companyFavouriteJobs': {
      const res = {};
      try {
        const { StudentID, JobID } = msg.body;
        Student.update({ StudentID }, { $push: { FavouriteJobs: JobID } }, (err) => {
          if (err) {
            res.status = 500;
            res.end = 'Network Error';
            callback(null, res);
          } else {
            res.status = 200;
            res.end = 'Added';
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'searchJob': {
      const res = {};
      try {
        // eslint-disable-next-line object-curly-newline
        const { SearchString, JobType, State, SalStart, SalEnd, PageNo } = msg.query;
        const filterObj = {};
        if (SearchString.length !== 0) {
          filterObj.Title = { $regex: `${SearchString}`, $options: 'i' };
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
        res.status = 200;
        res.end = JSON.stringify(resultObj);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getJobSuggestions': {
      const res = {};
      try {
        const { StudentID } = msg.query;
        let jobTitle = '';
        let resultData = [];
        await Student.findOne({ StudentID }, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Student not found';
            callback(null, res);
          } else if (results) {
            jobTitle = results.JobTitle;
          }
        });
        const titleMatchJob = await Job.find({ Title: { $regex: `.*${jobTitle}.*` } })
          .limit(4)
          .exec();
        resultData = titleMatchJob;
        if (resultData.length < 4) {
          const sortDateJob = await Job.find({ Title: { $not: /${jobTitle}/ } })
            .sort({ PostedDate: -1 })
            .limit(4 - resultData.length)
            .exec();
          resultData = resultData.concat(sortDateJob);
        }
        // eslint-disable-next-line no-var
        const companyResult = [];
        for (let i = 0; i < resultData.length; i += 1) {
          const companyID = resultData[i].CompanyID;
          // eslint-disable-next-line no-await-in-loop
          const company = await Company.findOne({ CompanyID: companyID }).exec();
          const tmpObj = {};
          // eslint-disable-next-line no-underscore-dangle
          tmpObj._id = resultData[i]._id;
          tmpObj.Title = resultData[i].Title;
          tmpObj.TitCompanyIDle = resultData[i].CompanyID;
          tmpObj.CompanyName = resultData[i].CompanyName;
          tmpObj.CurrentStatus = resultData[i].CurrentStatus;
          tmpObj.Industry = resultData[i].Industry;
          tmpObj.StreetAddress = resultData[i].StreetAddress;
          tmpObj.City = resultData[i].City;
          tmpObj.State = resultData[i].State;
          tmpObj.Country = resultData[i].Country;
          tmpObj.Zip = resultData[i].Zip;
          tmpObj.PostedDate = resultData[i].PostedDate;
          tmpObj.JobDescription = resultData[i].JobDescription;
          tmpObj.Respobsibilities = resultData[i].Respobsibilities;
          tmpObj.Qualifications = resultData[i].Qualifications;
          tmpObj.ExpectedSalary = resultData[i].ExpectedSalary;
          tmpObj.Votes = resultData[i].TitVotesle;
          tmpObj.ProfileImg = company.ProfileImg;
          tmpObj.GeneralReviewCount = company.GeneralReviewCount;
          tmpObj.TotalGeneralReviewRating = company.TotalGeneralReviewRating;
          companyResult.push(tmpObj);
        }
        res.status = 200;
        res.end = JSON.stringify(companyResult);
        callback(null, res);
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'searchCompany': {
      const res = {};
      try {
        const { SearchString, State, PageNo } = msg.query;
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
    case 'navbar': {
      const res = {};
      try {
        const { StudentID } = msg.query;
        const resultData = [];
        await Student.findOne({ StudentID }, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Student not found';
            callback(null, res);
          } else {
            resultData.push(results);
          }
        });
        await Company.find({}, { _id: 0, CompanyName: 1, CompanyID: 1 }, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Company Names not found';
            callback(null, res);
          } else {
            resultData.push(results);
          }
        });
        await Job.find({}, { _id: 0, Title: 1 }, (err, results) => {
          if (err) {
            res.status = 500;
            res.end = 'Jobs not found';
            callback(null, res);
          } else {
            resultData.push(results);
            res.status = 200;
            res.end = JSON.stringify(resultData);
            callback(null, res);
          }
        });
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'getAllReview': {
      const { CompanyID } = msg.query;
      let con = null;
      const res = {};
      try {
        const redisKey = `getAllReview-CompanyID=${CompanyID}`;
        redisClient.get(redisKey, async (err, data) => {
          // data is available in Redis
          if (data) {
            console.log('in redis');
            res.status = 200;
            res.end = JSON.stringify(data);
            callback(null, res);
          } else {
            try {
              const searchQuery =
                'SELECT Descriptions FROM GENERAL_REVIEW WHERE CompanyID=? LIMIT 2000;';
              con = await mysqlConnection();
              const [results2] = await con.query(searchQuery, CompanyID);
              con.release();
              // Add to redis
              redisClient.set(redisKey, JSON.stringify(results2));
              res.status = 200;
              res.end = JSON.stringify(results2);
              callback(null, res);
            } catch (error) {
              res.status = 500;
              res.end = JSON.stringify('Network Error');
              callback(null, res);
            }
          }
        });
      } catch (error) {
        res.status = 500;
        res.end = JSON.stringify('Network Error');
        callback(null, res);
      } finally {
        if (con) {
          con.release();
        }
      }
      break;
    }
    case 'jobStatus': {
      const res = {};
      let con = null;
      try {
        const { JobID, StudentID } = msg.query;
        const applicationWithdrawProcedure =
          'SELECT * FROM APPLICATION_RECEIVED WHERE JobID=? AND StudentID=?;';
        con = await mysqlConnection();
        // eslint-disable-next-line no-unused-vars
        const [results, fields] = await con.query(applicationWithdrawProcedure, [JobID, StudentID]);
        con.release();
        res.status = 200;
        res.end = JSON.stringify(results);
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
  }
}
exports.handle_request = handle_request;
