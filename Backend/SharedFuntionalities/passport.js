/* eslint-disable consistent-return */
const JwtStrategy = require('passport-jwt').Strategy;
const { ExtractJwt } = require('passport-jwt');
const passport = require('passport');
const { secret } = require('../config');
const kafka = require('../kafka/client');
// const Company = require('../model/Company');
// const Student = require('../model/Student');
// const mysqlConnection = require('../mysqlConnection');

function auth() {
  const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderWithScheme('jwt'),
    secretOrKey: secret,
  };
  passport.use(
    // eslint-disable-next-line camelcase
    new JwtStrategy(opts, async (jwt_payload, callback) => {
      // eslint-disable-next-line camelcase
      const data = {
        api: 'authenticate',
        query: jwt_payload,
      };
      kafka.make_request('general2', data, (err, results) => {
        // console.log('in result');
        // console.log(results);
        if (err) {
          console.log('Inside err');
          return callback(err, false);
        }
        if (results) {
          callback(null, results);
        } else {
          callback(null, false);
        }
      });
    })
  );
}

exports.auth = auth;
exports.checkAuth = passport.authenticate('jwt', { session: false });
