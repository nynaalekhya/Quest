if (process.env.NODE_ENV !== 'production') {
  // eslint-disable-next-line global-require
  require('dotenv').config();
}
const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cron = require('node-cron');

const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const { frontendURL, mongoDB } = require('./config');
const commonPart = require('./Routes/headingRoutes');
const companyRoute = require('./Routes/companyRoutes');
const studentRoute = require('./Routes/studentRoutes');
const adminRoute = require('./Routes/adminRoutes');
const Company = require('./model/Company');

const app = express();

app.use(cors({ origin: frontendURL, credentials: true }));
// use express session to maintain session data
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    duration: 60 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
  })
);
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// eslint-disable-next-line func-names
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', frontendURL);
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,POST,PUT,DELETE,OPTIONS');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Authorization, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers'
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  poolSize: 500,
  bufferMaxEntries: 0,
  useFindAndModify: false,
};

// eslint-disable-next-line no-unused-vars
mongoose.connect(mongoDB, options, (err, res) => {
  if (err) {
    // eslint-disable-next-line no-console
    console.log('MongoDB connection Failed', err);
  } else {
    // eslint-disable-next-line no-console
    console.log('MongoDB Connected');
  }
});

cron.schedule('0 0 * * *', async () => {
  try {
    const ViewCount = 0;
    await Company.updateMany({}, { ViewCount });
    console.log('Updated');
  } catch (error) {
    console.log('did not update');
  }
});

app.use('/glassdoor', commonPart);

app.use('/company', companyRoute);

app.use('/student', studentRoute);

app.use('/admin', adminRoute);

app.listen(3001);
