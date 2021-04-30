/* eslint-disable func-names */
/* eslint-disable no-undef */
// eslint-disable-next-line import/no-extraneous-dependencies
const chai = require('chai');

const chaiHttp = require('chai-http');

chai.use(chaiHttp);
const apiHost = 'http://localhost';
const apiPort = '3001';
const apiUrl = `${apiHost}:${apiPort}`;
const { expect } = chai;

const studentToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJzdHVkZW50IiwiTmFtZSI6InByYW5qYXlAZ21haWwuY29tIiwiSUQiOjEsImlhdCI6MTYwNTIxODMwMywiZXhwIjoxNjA2MjI2MzAzfQ.a4dbsIVdjGCBK6LHn2v5gqVb8CvFO8WZRnXjKAMTlF4';

const companyToken =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyb2wiOiJjb21wYW55IiwiTmFtZSI6ImRpc2hhbnQuc2hhaEBnbWFpbC5jb20iLCJJRCI6NSwiaWF0IjoxNjA1MjI1NDk2LCJleHAiOjE2MDYyMzM0OTZ9.PtRVK9VIbDVNVgjKZ0oEVnCAepD6GMjM2bpOSzDoCYc';

// Fetching static data for drop-downs (Done)
it('Test Fetching data for all drop-downs', function (done) {
  chai
    .request(apiUrl)
    .get('/glassdoor/staticData')
    .send()
    .end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.text[3]).equal('J');
      done();
    });
});

// Signup for Student (Done)
it('Testing of student signup', function (done) {
  chai
    .request(apiUrl)
    .post('/glassdoor/signup')
    .send({
      UserName: 'MochaStudent@test.com',
      Password: 'test',
      Role: 'student',
    })
    .end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.text).to.equal(JSON.stringify('Profile Created'));
      done();
    });
});

// Valid login
it('Testing of valid student Login', function (done) {
  chai
    .request(apiUrl)
    .post('/glassdoor/login')
    .send({
      UserName: 'user@gmail.com',
      Password: 'user',
    })
    .end(function (err, res) {
      expect(res).to.have.status(200);
      done();
    });
});

// Invalid login
it('Testing of invalid student Login', function (done) {
  chai
    .request(apiUrl)
    .post('/glassdoor/login')
    .send({
      UserName: 'user@gmail.com',
      Password: 'user2',
    })
    .end(function (err, res) {
      expect(res).to.have.status(400);
      expect(res.text).equal(JSON.stringify('Invalid Credentials'));
      done();
    });
});

// Fetching Nav Bar data and Student Profile
it('Test fetching navbar and student profile', function (done) {
  chai
    .request(apiUrl)
    .get('/student/navbar')
    .set({ Authorization: `JWT ${studentToken}` })
    .query({ StudentID: '1' })
    .send()
    .end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body[0].Email).equal('user@gmail.com');
      expect(res.body.length).equal(3);
      done();
    });
});

// Fetching results of company search
it('Test to fetch results of company search', function (done) {
  chai
    .request(apiUrl)
    .get('/student/searchCompany')
    .set({ Authorization: `JWT ${studentToken}` })
    .query({ SearchString: 'Amazon', State: 'CA', PageNo: 0 })
    .send()
    .end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body[0][0].State).equal('CA');
      expect(res.body.length).equal(3);
      done();
    });
});

// Fetching results of company search
it('Test to fetch results of job search', function (done) {
  chai
    .request(apiUrl)
    .get('/student/searchJob')
    .set({ Authorization: `JWT ${studentToken}` })
    .query({
      SearchString: 'Blue',
      JobType: 'Full-time',
      State: 'CA',
      SalStart: 0,
      SalEnd: 20000000,
      PageNo: 0,
    })
    .send()
    .end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.body.jobs[0].State).equal('CA');
      done();
    });
});

// Test to fetch profile of a company
it('Test to fetch profile of a company', function (done) {
  chai
    .request(apiUrl)
    .get('/company/profile')
    .set({ Authorization: `JWT ${companyToken}` })
    .query({
      CompanyID: '5',
    })
    .send()
    .end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.text[0]).equal('{');
      done();
    });
});

// Updating company Profile
it('Test to update comapny profile', function (done) {
  chai
    .request(apiUrl)
    .post('/company/profileupdate')
    .set({ Authorization: `JWT ${companyToken}` })
    .send({
      CompanyID: '5',
      Website: 'www.apoorv.com',
      Size: 500,
      Type: 'E-commerce',
      Revenue: 500,
      Headquarter: 'San Jose, CA',
      Industry: 'E-commerce',
      Founded: 1946,
      CompanyMission: 'Grow amd let grow',
      CEO: 'Simon Shim',
      CompanyDescription: 'Cool Company',
      City: 'San Jose',
      State: 'CA',
    })
    .end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.text).equal(JSON.stringify('Profile Updated'));
      done();
    });
});

// Test to fetch reviews of a company
it('Test to fetch reviews of a company', function (done) {
  chai
    .request(apiUrl)
    .get('/company/review')
    .set({ Authorization: `JWT ${companyToken}` })
    .query({
      CompanyID: '5',
    })
    .send()
    .end(function (err, res) {
      expect(res).to.have.status(200);
      expect(res.text[1]).equal('[');
      done();
    });
});

// Test to mark a review as favorite
it('Test to mark a review as favorite', function (done) {
  chai
    .request(apiUrl)
    .post('/company/reviewFavorite')
    .set({ Authorization: `JWT ${companyToken}` })
    .send({
      ID: '5',
      Favorite: 1,
    })
    .end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.text).equal(JSON.stringify('response submitted'));
      done();
    });
});

// Updating response to a review
it('Test to update response to a review', function (done) {
  chai
    .request(apiUrl)
    .post('/company/reviewResponse')
    .set({ Authorization: `JWT ${companyToken}` })
    .send({
      ID: 2,
      Response: 'Thanks for the feedback',
    })
    .end(function (err, res) {
      expect(res).to.have.status(201);
      expect(res.text).equal(JSON.stringify('response submitted'));
      done();
    });
});
