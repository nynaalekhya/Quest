const express = require('express');

const Router = express.Router();

const kafka = require('../kafka/client');

const { uploadFile, uploadmultiFile, imageUpload } = require('../S3Bucket/s3BucketUpload');
// const {
//   navbar,
//   searchCompany,
//   getJobSuggestions,
//   searchJob,
//   companyApplyJob,
//   companyFavouriteJobs,
//   removeFavouriteJobs,
//   searchInterview,
//   resumesAdd,
//   resumesDelete,
//   jobWithdraw,
//   profileUpdate,
//   companyProfile,
//   companyReview,
//   addCompanyReview,
//   salaryAddReview,
//   featureReview,
//   getInterviewReivew,
//   interviewAddReview,
//   interviewData,
//   companyHelpfulReview,
//   companyJobs,
//   salaryReview,
//   companyInterviewHelpfulReview,
//   fillJobApplication,
//   getFavoriteJobs,
//   getAppliedJobs,
//   getInterviewReivewStudent,
//   studentSalaryReview,
//   studentCompanyReview,
//   companyPhotos,
//   studentCompanyPhotos,
//   addCompanyPhotos,
//   searchSalary,
//   companyViewCount,
//   deleteSalaryReview,
//   deleteInterviewReview,
//   deleteGeneralReview,
//   deletePhoto,
//   // getAllReview,
// } = require('../Student/studentFunctionality');

const { checkAuth } = require('../SharedFuntionalities/passport');

// To get the data required for navbar
Router.get('/navbar', checkAuth, async (req, res) => {
  const data = {
    api: 'navbar',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To fetch the results of the company search
Router.get('/searchCompany', checkAuth, async (req, res) => {
  const data = {
    api: 'searchCompany',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To fetch the results of the job search
Router.get('/searchJob', checkAuth, async (req, res) => {
  const data = {
    api: 'searchJob',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To get the suggested jobs for students
Router.get('/jobSuggestions', checkAuth, async (req, res) => {
  const data = {
    api: 'getJobSuggestions',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To post the favourite jobs for students
Router.post('/companyFavouriteJobs', checkAuth, async (req, res) => {
  const data = {
    api: 'companyFavouriteJobs',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To remove the favourite jobs for students
Router.post('/removeFavouriteJobs', checkAuth, async (req, res) => {
  const data = {
    api: 'removeFavouriteJobs',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To fetch the results of the interview search
Router.get('/searchInterview', checkAuth, async (req, res) => {
  const data = {
    api: 'searchInterview',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To add resume of student
Router.post('/resumesAdd', checkAuth, imageUpload, async (req, res) => {
  const data = {
    api: 'resumesAdd',
    body: req.body,
    imageURL: req.file.location,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To remove resume of student
Router.post('/resumesDelete', async (req, res) => {
  const data = {
    api: 'resumesDelete',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To submit the application for a job in the company
Router.post('/companyApplyJob', checkAuth, async (req, res) => {
  const data = {
    api: 'companyApplyJob',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To withdraw an application from a job
Router.post('/jobWithdraw', checkAuth, async (req, res) => {
  const data = {
    api: 'jobWithdraw',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To update the profile of the student
Router.post('/profileUpdate', checkAuth, async (req, res) => {
  const data = {
    api: 'profileUpdate',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// upload to e3 bucket and return the URL of file.
Router.post('/upload', checkAuth, async (req, res) => {
  const value = await uploadFile(req, res);
  return value;
});

// upload multiple files to e3 bucket and return the URL of file. USE multfiles as the field name
Router.post('/uploadMultiple', checkAuth, async (req, res) => {
  const value = await uploadmultiFile(req, res);
  return value;
});

// get the company profile
Router.get('/companyProfile', checkAuth, async (req, res) => {
  const data = {
    api: 'companyProfile',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// get the company reviews
Router.get('/companyReview', checkAuth, async (req, res) => {
  const data = {
    api: 'companyReview',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// get all company reviews
Router.get('/getAllReview', checkAuth, async (req, res) => {
  const data = {
    api: 'getAllReview',
    query: req.query,
  };
  kafka.make_request('student', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// get the interview reviews
Router.get('/interviewReview', async (req, res) => {
  const data = {
    api: 'getInterviewReivew',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// get the interview data
Router.get('/interviewData', checkAuth, async (req, res) => {
  const data = {
    api: 'interviewData',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// post the post interview reviews
Router.post('/interviewAddReview', checkAuth, async (req, res) => {
  const data = {
    api: 'interviewAddReview',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// get the featured reviews
Router.get('/featureReview', checkAuth, async (req, res) => {
  const data = {
    api: 'featureReview',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// add companyreview
Router.post('/addReview', async (req, res) => {
  const data = {
    api: 'addCompanyReview',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// add salaryreview
Router.post('/salaryAddreview', checkAuth, async (req, res) => {
  const data = {
    api: 'salaryAddReview',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// post helpful review count
Router.post('/companyHelpfulReview', checkAuth, async (req, res) => {
  const data = {
    api: 'companyHelpfulReview',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// post helpful review count for interview review
Router.post('/companyInterviewHelpfulReview', async (req, res) => {
  const data = {
    api: 'companyInterviewHelpfulReview',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// get search job result
Router.get('/companyJobs', checkAuth, async (req, res) => {
  const data = {
    api: 'companyJobs',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// get search job result
Router.get('/salaryReview', async (req, res) => {
  const data = {
    api: 'salaryReview',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// Get job and compay details when apply form is being opened
Router.get('/fillJobApplication', checkAuth, async (req, res) => {
  const data = {
    api: 'fillJobApplication',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// Get the information about the saved job
Router.get('/getFavoriteJobs', checkAuth, async (req, res) => {
  const data = {
    api: 'getFavoriteJobs',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// Get the details about the applied job
Router.get('/getAppliedJobs', checkAuth, async (req, res) => {
  const data = {
    api: 'getAppliedJobs',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});
// get the interview reviews for students
Router.get('/studentInterviewReview', checkAuth, async (req, res) => {
  const data = {
    api: 'getInterviewReivewStudent',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// get the salary reviews for students
Router.get('/studentSalaryReview', checkAuth, async (req, res) => {
  const data = {
    api: 'studentSalaryReview',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});
// get the general reviews for students
Router.get('/studentCompanyReview', checkAuth, async (req, res) => {
  const data = {
    api: 'studentCompanyReview',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// get the photos for company
Router.get('/companyPhotos', checkAuth, async (req, res) => {
  const data = {
    api: 'companyPhotos',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// get the photos reviews for students
Router.get('/studentCompanyPhotos', checkAuth, async (req, res) => {
  const data = {
    api: 'studentCompanyPhotos',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// post the photos reviews for students
Router.post('/addCompanyPhotos', checkAuth, async (req, res) => {
  const data = {
    api: 'addCompanyPhotos',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To search company results o the basis of slary search
Router.get('/searchSalary', checkAuth, async (req, res) => {
  const data = {
    api: 'searchSalary',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// To increase the view count of a company
Router.post('/companyViewCount', checkAuth, async (req, res) => {
  const data = {
    api: 'companyViewCount',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// Delete the Salary Review
Router.post('/deleteSalaryReview', checkAuth, async (req, res) => {
  const data = {
    api: 'deleteSalaryReview',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// Delete the Interview Review
Router.post('/deleteInterviewReview', checkAuth, async (req, res) => {
  const data = {
    api: 'deleteInterviewReview',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// Delete the General Review
Router.post('/deleteGeneralReview', checkAuth, async (req, res) => {
  const data = {
    api: 'deleteGeneralReview',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});

// Delete the photo
Router.post('/deletePhoto', checkAuth, async (req, res) => {
  const data = {
    api: 'deletePhoto',
    body: req.body,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});
// get search job result
Router.get('/jobStatus', checkAuth, async (req, res) => {
  const data = {
    api: 'jobStatus',
    query: req.query,
  };
  kafka.make_request('student2', data, (err, results) => {
    // console.log('in result');
    // console.log(results);
    if (err) {
      res.status(500);
      res.end('Network Error');
    } else {
      res.status(results.status);
      res.end(results.end);
    }
  });
});
module.exports = Router;
