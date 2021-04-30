import { combineReducers } from 'redux';
import SignupModalViewReducer from './SignupModalViewReducer';
import searchDropDownReducer from './searchDropDownReducer';
import lowerNavBarReducer from './lowerNavBarReducer';
import CompaniesListReducer from './CompaniesListReducer';
import JobSearchPageReducer from './JobSearchPageReducer';
import staticDataReducer from './staticDataReducer';
import SalaryListReducer from './SalaryListReducer';
import SearchStringsReducer from './SearchStringsReducer';
import StudentCompleteInfoReducer from './StudentCompleteInfoReducer';
import CompaniesProfileReducer from './CompaniesProfileReducer';
import studentProfileLeftPanelReducer from './studentProfileLeftPanelReducer';
import ContributionPageReducer from './ContributionPageReducer';
import ReviewReplyReducer from './ReviewReplyReducer';
import CompanyResultPageReducer from './CompanyResultPageReducer';
import CompanyPageReducer from './CompanyPageReducer';
import ApplicantsListModalReducer from './ApplicantsListModalReducer';
import JobsListReducer from './JobsListReducer';
import PostJobModalReducer from './PostJobModalReducer';
import InterviewListReducer from './InterviewListReducer';
import StudentContributionsReducer from './StudentContributionsReducer';
import EmployerReportStatsReducer from './EmployerReportStatsReducer';

const finalReducers = combineReducers({
  SignupModalViewReducer: SignupModalViewReducer,
  searchDropDownReducer: searchDropDownReducer,
  lowerNavBarReducer: lowerNavBarReducer,
  CompaniesListReducer: CompaniesListReducer,
  JobSearchPageReducer: JobSearchPageReducer,
  staticDataReducer: staticDataReducer,
  SalaryListReducer: SalaryListReducer,
  SearchStringsReducer: SearchStringsReducer,
  StudentCompleteInfoReducer: StudentCompleteInfoReducer,
  CompaniesProfileReducer: CompaniesProfileReducer,
  studentProfileLeftPanelReducer: studentProfileLeftPanelReducer,
  ContributionPageReducer: ContributionPageReducer,
  ReviewReplyReducer: ReviewReplyReducer,
  CompanyResultPageReducer: CompanyResultPageReducer,
  CompanyPageReducer: CompanyPageReducer,
  ApplicantsListModalReducer: ApplicantsListModalReducer,
  JobsListReducer: JobsListReducer,
  PostJobModalReducer: PostJobModalReducer,
  InterviewListReducer: InterviewListReducer,
  StudentContributionsReducer: StudentContributionsReducer,
  EmployerReportStatsReducer: EmployerReportStatsReducer
});

export default finalReducers;
