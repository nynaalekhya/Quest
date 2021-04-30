const express = require('express');

const Router = express.Router();
const kafka = require('../kafka/client');
// const {
//   // userSignup,
//   // logout,
//   // userLogin,
//   //staticData,
//   // staticDataInsert,
//   // staticDataUpdate,
// } = require('../SharedFuntionalities/commonFunctionality');
const { auth } = require('../SharedFuntionalities/passport');

auth();
// Signup for the customer
Router.post('/signup', async (req, res) => {
  const data = {
    api: 'signup',
    body: req.body,
  };
  kafka.make_request('general2', data, (err, results) => {
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

// login for the users
Router.post('/login', async (req, res) => {
  const data = {
    api: 'userLogin',
    body: req.body,
  };
  kafka.make_request('general2', data, (err, results) => {
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

// Logout for the users
Router.post('/logout', async (req, res) => {
  // const value = await logout(req, res);
  // return value;
  req.logout();
  res.status(200).end('Logged out');
});
// Get Static Data
Router.get('/staticdata', async (req, res) => {
  const data = {
    api: 'staticData',
    body: req.body,
  };
  kafka.make_request('general2', data, (err, results) => {
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
// // Insert Sample Data
// Router.post('/staticdatainsert', async (req, res) => {
//   const value = await staticDataInsert(req, res);
//   return value;
// });
// // Update Static Data
// Router.post('/staticdataupdate', async (req, res) => {
//   const value = await staticDataUpdate(req, res);
//   return value;
// });
module.exports = Router;
