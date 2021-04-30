const express = require('express');

const kafka = require('../kafka/client');

const Router = express.Router();
// const {
//   getCompanyProfile,
//   companyProfileUpdate,
//   companyReviews,
//   postJob,
//   favoriteReview,
//   reviewResponse,
//   featuredReview,
//   getJobs,
//   jobsApplications,
//   jobsApplicantUpdate,
//   jobsApplicantProfile,
//   report,
//   demographicsJob,
// } = require('../Company/companyFunctionality');
const { auth, checkAuth } = require('../SharedFuntionalities/passport');

auth();
// Company API calls
// Load the company profile API 26
Router.get('/profile', checkAuth, async (req, res) => {
  const data = {
    api: 'getCompanyProfile',
    query: req.query,
  };
  kafka.make_request('company2', data, (err, results) => {
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
// Update the company profile API 25
Router.post('/profileupdate', checkAuth, async (req, res) => {
  const data = {
    api: 'companyProfileUpdate',
    body: req.body,
  };
  kafka.make_request('company2', data, (err, results) => {
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
// load the reviews
Router.get('/review', checkAuth, async (req, res) => {
  const data = {
    api: 'companyReviews',
    query: req.query,
  };
  kafka.make_request('company2', data, (err, results) => {
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
// favorite a review
Router.post('/reviewFavorite', checkAuth, async (req, res) => {
  const data = {
    api: 'favoriteReview',
    body: req.body,
  };
  kafka.make_request('company2', data, (err, results) => {
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
// respond to the review
Router.post('/reviewResponse', checkAuth, async (req, res) => {
  const data = {
    api: 'reviewResponse',
    body: req.body,
  };
  kafka.make_request('company2', data, (err, results) => {
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
// selected featured review
Router.post('/reviewFeatured', checkAuth, async (req, res) => {
  const data = {
    api: 'featuredReview',
    body: req.body,
  };
  kafka.make_request('company2', data, (err, results) => {
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
// Post Job
Router.post('/postJob', async (req, res) => {
  const data = {
    api: 'postJob',
    body: req.body,
  };
  kafka.make_request('company2', data, (err, results) => {
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
// get Job
Router.get('/jobs', async (req, res) => {
  const data = {
    api: 'getJobs',
    query: req.query,
  };
  kafka.make_request('company2', data, (err, results) => {
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

// Fetch applications
Router.get('/jobsApplications', checkAuth, async (req, res) => {
  const data = {
    api: 'jobsApplications',
    query: req.query,
  };
  kafka.make_request('company2', data, (err, results) => {
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
// Update application status
Router.post('/jobsApplicantUpdate', checkAuth, async (req, res) => {
  const data = {
    api: 'jobsApplicantUpdate',
    body: req.body,
  };
  kafka.make_request('company2', data, (err, results) => {
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

// Fetch applicant profile
Router.get('/jobsApplicantProfile', checkAuth, async (req, res) => {
  const data = {
    api: 'jobsApplicantProfile',
    query: req.query,
  };
  kafka.make_request('company2', data, (err, results) => {
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

// To view statistics of Jobs
Router.get('/report', checkAuth, async (req, res) => {
  const data = {
    api: 'report',
    query: req.query,
  };
  kafka.make_request('company2', data, (err, results) => {
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

// To get the demographics of applicants
Router.get('/demographicsJob', async (req, res) => {
  const data = {
    api: 'demographicsJob',
    query: req.query,
  };
  kafka.make_request('company2', data, (err, results) => {
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

// Fetch applications
Router.get('/applicantCount', checkAuth, async (req, res) => {
  const data = {
    api: 'applicantCount',
    query: req.query,
  };
  kafka.make_request('company2', data, (err, results) => {
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

Router.post('/findCompanyName', async (req, res) => {
  const data = {
    api: 'findCompanyName',
    body: req.body,
  };
  kafka.make_request('company2', data, (err, results) => {
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
