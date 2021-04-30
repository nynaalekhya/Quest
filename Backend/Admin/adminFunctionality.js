/* eslint-disable no-unused-vars */
/* eslint-disable func-names */
/* eslint-disable no-underscore-dangle */
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

// get reviews for the admin to approve
const reviews = async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { PageNo } = url.parse(req.url, true).query;
    const reviewsData = await GeneralReview.find({ Status: 'Not Approved' })
      .limit(10)
      .skip(PageNo * 10)
      .exec();
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(reviewsData));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// Update general review status
const updateGeneralReviews = async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { CompanyID, ID, Status } = req.body;
    const filter = { $and: [{ CompanyID }, { ID }] };
    const update = { Status };
    const result = await GeneralReview.findOneAndUpdate(filter, update);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    if (Status === 'Approved') {
      const companyData = await Company.find({ CompanyID });
      let GeneralReviewCount = 0;
      let approveCEOcount = 0;
      if (result.CEOApproval === true) {
        approveCEOcount = companyData[0].approveCEOcount + 1;
      } else {
        approveCEOcount = companyData[0].approveCEOcount;
      }
      if (companyData[0].GeneralReviewCount >= 0) {
        GeneralReviewCount = companyData[0].GeneralReviewCount + 1;
      }
      await Company.updateOne({ CompanyID }, { GeneralReviewCount, approveCEOcount });
    }
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// update interview review status
const updateInterviewReviews = async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { CompanyID, InterviewReviewID, Status } = req.body;
    const filter = { $and: [{ CompanyID }, { InterviewReviewID }] };
    const update = { Status };
    const result = await InterviewReview.findOneAndUpdate(filter, update);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    if (Status === 'Approved') {
      const companyData = await Company.find({ CompanyID });
      let InterviewReviewCount = 0;
      if (companyData[0].InterviewReviewCount >= 0) {
        InterviewReviewCount = companyData[0].InterviewReviewCount + 1;
      }
      await Company.updateOne({ CompanyID }, { InterviewReviewCount });
    }
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// update salary review status
const updateSalaryReviews = async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { CompanyID, SalaryReviewID, Status } = req.body;
    const filter = { $and: [{ CompanyID }, { SalaryReviewID }] };
    const update = { Status };
    const result = await SalaryReview.findOneAndUpdate(filter, update);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    if (Status === 'Approved') {
      const companyData = await Company.find({ CompanyID });
      let SalaryReviewCount = 0;

      if (companyData[0].SalaryReviewCount >= 0) {
        SalaryReviewCount = companyData[0].SalaryReviewCount + 1;
      }
      await Company.updateOne({ CompanyID }, { SalaryReviewCount });
    }
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get company list based on search
const companyList = async (req, res) => {
  try {
    const { searchString, PageNo } = url.parse(req.url, true).query;
    const results = await Company.find({
      CompanyName: { $regex: `${searchString}`, $options: 'i' },
    })
      .limit(10)
      .skip(PageNo * 10)
      .exec();
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(results));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get company review list based on companyID
const companyReviewList = async (req, res) => {
  try {
    const { CompanyID, PageNo } = url.parse(req.url, true).query;
    const results = await GeneralReview.find({ CompanyID })
      .limit(10)
      .skip(PageNo * 10)
      .exec();
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(results));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get pictures to be approved
const pictures = async (req, res) => {
  try {
    const { PageNo } = url.parse(req.url, true).query;
    const reviewsData = await Photos.find({ Status: 'Not Approved' })
      .limit(10)
      .skip(PageNo * 10)
      .exec();
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(reviewsData));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// Update photo status
const updatePictures = async (req, res) => {
  try {
    // eslint-disable-next-line object-curly-newline
    const { CompanyID, ID, Status } = req.body;
    const filter = { $and: [{ CompanyID }, { ID }] };
    const update = { Status };
    const result = await Photos.findOneAndUpdate(filter, update);
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    if (Status === 'Approved') {
      const companyData = await Company.find({ CompanyID });
      let PhotoCount = 0;
      if (companyData[0].PhotoCount >= 0) {
        PhotoCount = companyData[0].PhotoCount + 1;
      }
      await Company.updateOne({ CompanyID }, { PhotoCount });
    }
    res.end(JSON.stringify(result));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get job status of company
const jobStats = async (req, res) => {
  let con = null;
  try {
    const resultData = {};
    const { CompanyID } = url.parse(req.url, true).query;
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

// get analytics
const analytics = async (req, res) => {
  try {
    const todayDate = new Date();
    const day = String(todayDate.getDate()).padStart(2, '0');
    const month = String(todayDate.getMonth() + 1).padStart(2, '0'); // January is 0!
    const year = todayDate.getFullYear();
    const today = `${year}-${month}-${day}`;
    const reviewData = await GeneralReview.find({ DatePosted: { $gte: today } }).countDocuments();

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

// get General reviews on the filter criteria
const getGeneralReviews = async (req, res) => {
  try {
    const { Status, PageNo } = req.query;
    const resultArray = [];
    if (Status.length !== 0) {
      await GeneralReview.find({ Status }, (err, result) => {
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
        .sort({ DatePosted: -1 })
        .limit(10)
        .skip(PageNo * 10);
      const count = await GeneralReview.find({ Status }).countDocuments();
      resultArray.push({ Count: count });
    } else {
      await GeneralReview.find({}, (err, result) => {
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
        .sort({ DatePosted: -1 })
        .limit(10)
        .skip(PageNo * 10);
      const count = await GeneralReview.find({}).countDocuments();
      resultArray.push({ Count: count });
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultArray));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get Salary reviews on the filter criteria
const getSalaryReviews = async (req, res) => {
  try {
    const { Status, PageNo } = req.query;
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
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultArray));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get Interview reviews on the filter criteria
const getInterviewReviews = async (req, res) => {
  try {
    const { Status, PageNo } = req.query;
    const resultArray = [];
    if (Status.length !== 0) {
      await InterviewReview.find({ Status }, (err, result) => {
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
      const count = await InterviewReview.find({ Status }).countDocuments();
      resultArray.push({ Count: count });
    } else {
      await InterviewReview.find({}, (err, result) => {
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
      const count = await InterviewReview.find({}).countDocuments();
      resultArray.push({ Count: count });
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultArray));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// // get Photos on the filter criteria
const getPhotos = async (req, res) => {
  try {
    const { Status, PageNo } = req.query;

    const resultArray = [];
    if (Status.length !== 0) {
      await Photos.find({ Status }, (err, result) => {
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
      const count = await Photos.find({ Status }).countDocuments();
      resultArray.push({ Count: count });
    } else {
      await Photos.find({}, (err, result) => {
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
      const count = await Photos.find({}).countDocuments();
      resultArray.push({ Count: count });
    }
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultArray));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get Company General reviews on the filter criteria
const getCompanyGeneralReviews = async (req, res) => {
  try {
    const { CompanyID, PageNo } = req.query;
    const resultArray = [];
    await GeneralReview.find({ CompanyID }, (err, result) => {
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
      .sort({ DatePosted: -1 })
      .limit(10)
      .skip(PageNo * 10);
    const count = await GeneralReview.find({ CompanyID }).countDocuments();
    resultArray.push({ Count: count });
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultArray));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get Company Salary reviews on the filter criteria
const getCompanySalaryReviews = async (req, res) => {
  try {
    const { CompanyID, PageNo } = req.query;
    const resultArray = [];
    await SalaryReview.find({ CompanyID }, (err, result) => {
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
      .sort({ DatePosted: -1 })
      .limit(10)
      .skip(PageNo * 10);
    const count = await SalaryReview.find({ CompanyID }).countDocuments();
    resultArray.push({ Count: count });
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultArray));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get Company Interview reviews on the filter criteria
const getCompanyInterviewReviews = async (req, res) => {
  try {
    const { CompanyID, PageNo } = req.query;
    const resultArray = [];
    await InterviewReview.find({ CompanyID }, (err, result) => {
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
      .sort({ DatePosted: -1 })
      .limit(10)
      .skip(PageNo * 10);
    const count = await InterviewReview.find({ CompanyID }).countDocuments();
    resultArray.push({ Count: count });
    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultArray));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

// get company Photos on the filter criteria
const getCompanyPhotos = async (req, res) => {
  try {
    const { CompanyID, PageNo } = req.query;
    const resultArray = [];
    await Photos.find({ CompanyID }, (err, result) => {
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
      .sort({ DateUploaded: -1 })
      .limit(10)
      .skip(PageNo * 10);
    const count = await Photos.find({ CompanyID }).countDocuments();
    resultArray.push({ Count: count });

    res.writeHead(200, {
      'Content-Type': 'application/json',
    });
    res.end(JSON.stringify(resultArray));
  } catch (error) {
    res.writeHead(500, {
      'Content-Type': 'application/json',
    });
    res.end('Network Error');
  }
};

module.exports = {
  reviews,
  companyList,
  companyReviewList,
  pictures,
  updatePictures,
  jobStats,
  analytics,
  getGeneralReviews,
  getSalaryReviews,
  getInterviewReviews,
  getPhotos,
  updateGeneralReviews,
  updateInterviewReviews,
  updateSalaryReviews,
  getCompanyGeneralReviews,
  getCompanySalaryReviews,
  getCompanyInterviewReviews,
  getCompanyPhotos,
};
