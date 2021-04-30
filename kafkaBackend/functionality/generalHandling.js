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

// To insert the user into SIGNUP table
const userInsert = async (emailID, hashedPassword, role) => {
  let con = null;
  try {
    const userInsertProcedure = 'CALL userInsert(?,?,?)';
    con = await mysqlConnection();
    const [results, fields] = await con.query(userInsertProcedure, [emailID, hashedPassword, role]);
    con.release();
    return results[0][0].ID;
  } catch (error) {
    return null;
  } finally {
    if (con) {
      con.release();
    }
  }
};
// Fucntion to check if the emailID is already in use
const checkEmail = async (emailID) => {
  let con = null;
  try {
    const emailProcedure = 'CALL existingEmail(?)';
    con = await mysqlConnection();
    const [results, fields] = await con.query(emailProcedure, emailID);
    con.release();
    if (results[0].length !== 0) {
      return true;
    }
    return false;
  } catch (error) {
    return false;
  } finally {
    if (con) {
      con.release();
    }
  }
};
// check the table for password and return the role and the user ID
const checklogin = async (emailID, Password) => {
  let con = null;
  try {
    const emailProcedure = 'CALL existingEmail(?)';
    con = await mysqlConnection();
    const [results, fields] = await con.query(emailProcedure, emailID);
    con.release();
    if (await bcrypt.compare(Password, results[0][0].Password)) {
      return [results[0][0].Role, results[0][0].UserID];
    }
    return false;
  } catch (error) {
    return false;
  } finally {
    if (con) {
      con.release();
    }
  }
};
async function handle_request(msg, callback) {
  // eslint-disable-next-line default-case
  switch (msg.api) {
    case 'userLogin': {
      const res = {};
      try {
        const { UserName, Password } = msg.body;

        const role = await checklogin(UserName, Password);
        if (role) {
          const payload = { rol: role[0], Name: UserName, ID: role[1] };
          const accesstoken = jwt.sign(payload, secret, {
            expiresIn: 1008000,
          });
          res.status = 200;
          res.end = JSON.stringify(`JWT ${accesstoken}`);
          callback(null, res);
        } else {
          res.status = 400;
          res.end = 'Invalid Credentials';
          callback(null, res);
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'staticData': {
      const res = {};
      try {
        const { UserName, Password } = msg.body;

        // eslint-disable-next-line array-callback-return
        Static.find((err, results) => {
          if (results) {
            res.status = 200;
            res.end = JSON.stringify(results);
            callback(null, res);
          } else {
            res.status = 404;
            res.end = 'Invalid Credentials';
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
    case 'signup': {
      const res = {};
      try {
        const { UserName, Password, Role } = msg.body;
        if (await checkEmail(UserName)) {
          res.status = 403;
          res.end = 'ID already in use';
          callback(null, res);
        } else {
          const hashedPassword = await bcrypt.hash(Password, 10);
          const userID = await userInsert(UserName, hashedPassword, Role);
          if (userID) {
            if (Role === 'company') {
              const company = new Company({
                CompanyID: userID,
                ...msg.body,
              });
              company.save((e, data) => {
                if (e) {
                  res.status = 500;
                  res.end = 'Network Error';
                  callback(null, res);
                } else {
                  res.status = 201;
                  res.end = 'Profile Created';
                  callback(null, res);
                }
              });
            } else if (Role === 'student') {
              const student = new Student({
                StudentID: userID,
                Email: UserName,
              });
              student.save((e, data) => {
                if (e) {
                  res.status = 500;
                  res.end = 'Network Error';
                  callback(null, res);
                } else {
                  res.status = 201;
                  res.end = 'Profile Created';
                  callback(null, res);
                }
              });
            } else {
              res.status = 201;
              res.end = 'Profile Created';
              callback(null, res);
            }
          } else {
            res.status = 401;
            res.end = 'Profile Creation Failed';
            callback(null, res);
          }
        }
      } catch (error) {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      }
      break;
    }
    case 'authenticate': {
      const res = {};
      let con = null;
      try {
        const { ID } = msg.query;
        const Role = msg.query.rol;
        if (Role === 'student') {
          Student.findOne({ StudentID: ID }, (err, results) => {
            if (err) {
              return callback(err, false);
            }
            if (results) {
              callback(null, results);
            } else {
              callback(null, false);
            }
          });
        } else if (Role === 'company') {
          Company.findOne({ CompanyID: ID }, (err, results) => {
            if (err) {
              return callback(err, false);
            }
            if (results) {
              callback(null, results);
            } else {
              callback(null, false);
            }
          });
        } else if (Role === 'admin') {
          try {
            const findQuery = 'SELECT * FROM SIGNUP WHERE UserID=?';
            con = await mysqlConnection();
            const [results] = await con.query(findQuery, ID);
            con.end();
            if (results[0].Role === 'admin') {
              callback(null, results);
            } else {
              callback(null, false);
            }
          } catch (error) {
            return callback(error, false);
          }
        }
      } catch {
        res.status = 500;
        res.end = 'Network Error';
        callback(null, res);
      } finally {
        if (con) {
          con.end();
        }
      }
      break;
    }
  }
}
exports.handle_request = handle_request;
