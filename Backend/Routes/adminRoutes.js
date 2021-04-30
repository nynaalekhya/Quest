const express = require('express');

const Router = express.Router();
const kafka = require('../kafka/client');
const { checkAuth } = require('../SharedFuntionalities/passport');

// const {
//   reviews,
//   updateGeneralReviews,
//   updateInterviewReviews,
//   updateSalaryReviews,
//   companyList,
//   companyReviewList,
//   pictures,
//   updatePictures,
//   jobStats,
//   analytics,
//   getGeneralReviews,
//   getSalaryReviews,
//   getInterviewReviews,
//   getPhotos,
//   getCompanyGeneralReviews,
//   getCompanySalaryReviews,
//   getCompanyInterviewReviews,
//   getCompanyPhotos,
// } = require('../Admin/adminFunctionality');

Router.get('/reviews', checkAuth, async (req, res) => {
  const data = {
    api: 'reviews',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.post('/updateGeneralReviews', checkAuth, async (req, res) => {
  const data = {
    api: 'updateGeneralReviews',
    body: req.body,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.post('/updateInterviewReviews', checkAuth, async (req, res) => {
  const data = {
    api: 'updateInterviewReviews',
    body: req.body,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.post('/updateSalaryReviews', checkAuth, async (req, res) => {
  const data = {
    api: 'updateSalaryReviews',
    body: req.body,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/companyList', checkAuth, async (req, res) => {
  const data = {
    api: 'companyList',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/companyReviewList', checkAuth, async (req, res) => {
  const data = {
    api: 'companyReviewList',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/pictures', checkAuth, async (req, res) => {
  const data = {
    api: 'pictures',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.post('/updatePictures', checkAuth, async (req, res) => {
  const data = {
    api: 'updatePictures',
    body: req.body,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/jobStats', checkAuth, async (req, res) => {
  const data = {
    api: 'jobStats',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/analytics', checkAuth, async (req, res) => {
  const data = {
    api: 'analytics',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/getGeneralReviews', checkAuth, async (req, res) => {
  const data = {
    api: 'getGeneralReviews',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/getSalaryReviews', checkAuth, async (req, res) => {
  const data = {
    api: 'getSalaryReviews',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/getInterviewReviews', checkAuth, async (req, res) => {
  const data = {
    api: 'getInterviewReviews',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/getPhotos', checkAuth, async (req, res) => {
  const data = {
    api: 'getPhotos',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/getCompanyGeneralReviews', checkAuth, async (req, res) => {
  const data = {
    api: 'getCompanyGeneralReviews',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/getCompanySalaryReviews', checkAuth, async (req, res) => {
  const data = {
    api: 'getCompanySalaryReviews',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/getCompanyInterviewReviews', checkAuth, async (req, res) => {
  const data = {
    api: 'getCompanyInterviewReviews',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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

Router.get('/getCompanyPhotos', checkAuth, async (req, res) => {
  const data = {
    api: 'getCompanyPhotos',
    query: req.query,
  };
  kafka.make_request('admin2', data, (err, results) => {
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
