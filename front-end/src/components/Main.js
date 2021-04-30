import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { updateMasterData } from '../constants/action-types';
import serverUrl from '../config';
// import Home from './Student/LandingPage/Home';
import Login from './Login/Login';
import CompanySearchResults from './Student/CompanySearchResults/CompanySearchResults';
import JobList from './Student/JobSearchResults/JobList';
import interviewList from './Student/InterviewSearchResults/interviewList';
import EmployerHome from './Employer/LandingPage/EmployerHome';
import ProfileUpdate from './Employer/ProfileUpdate/ProfileUpdate';
import EmployerReviews from './Employer/Reviews/ReviewsHome';
import EmployerJobs from './Employer/Jobs/JobsHome';
import EmployerReport from './Employer/Report/ReportHome';
import ApplicantProfile from './Employer/ApplicantProfile/ApplicantProfileHome';
import salaryList from './Student/SalarySearchResults/salaryList';
import Home from './Student/LandingPage/Home';
import Profile from './Student/PersonalInformation/Profile/Profile';
// import Resume from './Student/PersonalInformation/Profile/Resume';
// import Demographics from './Student/PersonalInformation/Profile/Demographics';
import ResumeUploadPage from './Student/PersonalInformation/ResumePage/ResumeUploadPage';
// import Navbar from './Student/Common/Navbar';
import CommonNavBar from './CommonNavBar';
import ContributionPage from './Student/Contributions/ContributionPage';
import CommonContribute from './Student/Contributions/CommonContribute';
import CompanyPage from './Student/CompanyProfile/CompanyPage';
import ReviewForm from './Student/CompanyProfile/CompanyReviews/ReviewForm';
import InterviewForm from './Student/CompanyProfile/CompanyInterviews/InterviewForm';
import PhotoUploadForm from './Student/CompanyProfile/CompanyPhotos/PhotoUploadForm';
import JobApplicationPage from './Student/CompanyProfile/CompanyJobs/JobApplicationPage';
import SalaryForm from './Student/CompanyProfile/CompanySalaries/SalaryForm';
import AdminHomePage from './Admin/LandingPage/AdminHomePage';
import CompanySearchResultsAdmin from './Admin/CompanySearchResultsAdmin/CompanySearchResultsAdmin';
import InterviewListAdmin from './Admin/InterviewSearchResultsAdmin/InterviewListAdmin';
import CompanyGeneralReviewsAdmin from './Admin/CompanyGeneralReviewsAdmin/CompanyGeneralReviewsAdmin';
import CompanyPhotosAdmin from './Admin/CompanySearchPhotosAdmin/CompanyPhotosAdmin';
import SalaryListAdmin from './Admin/CompanySalaryReviewsAdmin/SalaryListAdmin';
import CompanyPageAdminView from './Admin/CompanyProfile/CompanyPageAdminView';
import PostJob from './Employer/Jobs/PostJobModal';

class Main extends Component {
  // constructor(props) {
  //     super(props);
  //     this.state = {  };
  // }
  componentDidMount() {
    axios.get(serverUrl + 'glassdoor/staticdata').then((response) => {
      let Countries = response.data[0].Country.map((country) => {
        return country;
      });
      let Gender = response.data[0].Gender.map((gender) => {
        return gender;
      });
      let VeteranStatus = response.data[0].VeteranStatus.map((veteranStatus) => {
        return veteranStatus;
      });
      let Disability = response.data[0].Disability.map((disability) => {
        return disability;
      });
      let States = response.data[0].State.map((state) => {
        return state;
      });
      let Status = response.data[0].Status.map((status) => {
        return status;
      });
      let JobType = response.data[0].JobType.map((jobType) => {
        return jobType;
      });
      let Ethnicity = response.data[0].Ethnicity.map((ethnicity) => {
        return ethnicity;
      });

      let payload = {
        Countries,
        Gender,
        VeteranStatus,
        Disability,
        States,
        Status,
        JobType,
        Ethnicity,
      };
      this.props.updateMasterData(payload);
      // this.setState({
      //   countries: this.state.countries.concat(allCountries),
      //   states: this.state.states.concat(allStates),
      //   countryCodes: this.state.countryCodes.concat(allCountrieCodes),
      // });
    });
  }

  render() {
    return (
      <div>
        {/* <Switch>*/}
        <Route path="/" component={CommonNavBar} />
        <Route path="/ReviewForm" component={ReviewForm} />
        <Route path="/InterviewForm" component={InterviewForm} />
        <Route path="/PhotoUploadForm" component={PhotoUploadForm} />
        <Route path="/JobApplicationPage" component={JobApplicationPage} />
        <Route path="/SalaryForm" component={SalaryForm} />
        <Route path="/Login" component={Login} />
        <Route path="/CompanySearchResults" component={CompanySearchResults} />
        <Route path="/Employer" component={EmployerHome} />
        <Route path="/EmployerProfile" component={ProfileUpdate} />
        <Route path="/EmployerReviews" component={EmployerReviews} />
        <Route path="/EmployerJobs" component={EmployerJobs} />
        <Route path="/PostJob" component={PostJob} />
        <Route path="/EmployerReport" component={EmployerReport} />
        <Route path="/ApplicantProfile" component={ApplicantProfile} />
        <Route path="/Home" component={Home} />
        <Route path="/JobList" component={JobList} />
        <Route path="/salaryList" component={salaryList} />
        <Route path="/interviewList" component={interviewList} />
        <Route path="/Profile" component={Profile} />
        <Route path="/ResumeUploadPage" component={ResumeUploadPage} />
        <Route path="/ContributionPage" component={ContributionPage} />
        <Route path="/CompanyPage" component={CompanyPage} />
        <Route path="/AdminHomePage" component={AdminHomePage} />
        <Route path="/CompanySearchResultsAdmin" component={CompanySearchResultsAdmin} />
        <Route path="/InterviewListAdmin" component={InterviewListAdmin} />
        <Route path="/CompanyGeneralReviewsAdmin" component={CompanyGeneralReviewsAdmin} />
        <Route path="/CompanyPhotosAdmin" component={CompanyPhotosAdmin} />
        <Route path="/SalaryListAdmin" component={SalaryListAdmin} />
        <Route path="/CompanyPageAdminView" component={CompanyPageAdminView} />
        {/*</Switch>*/}
      </div>
    );
  }
}

// export default Main;
const mapDispatchToProps = (dispatch) => {
  return {
    updateMasterData: (payload) => {
      dispatch({
        type: updateMasterData,
        payload,
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Main);
