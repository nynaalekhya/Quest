import React, { Component } from 'react';
import { connect } from 'react-redux';
import moment from 'moment';
import defaultplaceholder from '../CompanyNavbar/default-placeholder.png';

class CompanyJobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const job = this.props.job;
    const date1 = new Date(job.PostedDate);
    const date2 = new Date();
    const diffTime = Math.abs(date2 - date1);
    const hours = Math.floor(diffTime / (1000 * 60 * 60));
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const postedSince = hours < 24 ? hours : diffDays;
    const h_d = hours < 24 ? 'h' : 'd';

    let alreadyFav = false;
    let heartIcon = (
      <span class="JobsListItemStyles__saveIcon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          xlink="http://www.w3.org/1999/xlink"
          width="24"
          height="24"
          viewBox="0 0 24 24"
        >
          <defs>
            <path
              id="UnSavedIcon-a"
              d="M19.66 11.864a4.626 4.626 0 0 0 0-6.51 4.569 4.569 0 0 0-6.491 0L12 6.53l-1.169-1.178a4.569 4.569 0 0 0-6.492 0 4.626 4.626 0 0 0 0 6.511L12 19.581l7.66-7.717zM12 5.111l.66-.654a5.569 5.569 0 0 1 7.71.192 5.626 5.626 0 0 1 0 7.92L12 21l-8.37-8.431a5.626 5.626 0 0 1 0-7.92 5.569 5.569 0 0 1 7.71-.192l.66.654z"
            ></path>
          </defs>
          <g fill="none" fill-rule="nonzero">
            <mask id="UnSavedIcon-b" fill="none">
              <use href="#UnSavedIcon-a"></use>
            </mask>
            <use fill="#0caa41" fill-rule="nonzero" href="#UnSavedIcon-a"></use>
            <g fill="none" mask="url(#UnSavedIcon-b)">
              <path d="M0 0h24v24H0z"></path>
            </g>
          </g>
        </svg>
      </span>
    );

    if (this.props.studentInfoStore.studentProfile.FavouriteJobs.includes(job._id)) {
      heartIcon = (
        <span class="JobsListItemStyles__saveIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            xlink="http://www.w3.org/1999/xlink"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <defs>
              <path
                id="SavedIcon-a"
                d="M12.46 4.649a5.569 5.569 0 0 1 7.91 0 5.626 5.626 0 0 1 0 7.92L12 21l-8.37-8.431a5.626 5.626 0 0 1 0-7.92 5.569 5.569 0 0 1 7.91 0l.46.462.46-.462z"
              ></path>
            </defs>
            <g fill="none" fill-rule="evenodd">
              <mask id="SavedIcon-b" fill="none">
                <use href="#SavedIcon-a"></use>
              </mask>
              <use fill="#0caa41" fill-rule="nonzero" href="#SavedIcon-a"></use>
              <g fill="#0caa41" mask="url(#SavedIcon-b)">
                <path d="M0 0h24v24H0z"></path>
              </g>
            </g>
          </svg>
        </span>
      );
      alreadyFav = true;
    }
    return (
      <li class="JobsListStyles__jobListItem">
        <div class="JobsListItemStyles__jobDetailsContainer gdGrid">
          <div class="container-fluid">
            <div class="row">
              <div class="col-10 d-flex flex-column">
                <div class="d-flex flex-row">
                  <a
                    onClick={(event) => this.props.openJobPage(event)}
                    href="#"
                    data-test="jobLink"
                    data-id="3738626687"
                    target="_blank"
                    class="JobDetailsStyles__iconLink mr-lg"
                  >
                    <img
                      alt="Company icon"
                      src={
                        this.props.companyOverviewStore.companyOverview.ProfileImg
                          ? this.props.companyOverviewStore.companyOverview.ProfileImg
                          : defaultplaceholder
                      }
                    />
                  </a>
                  <div class="JobDetailsStyles__jobInfoContainer ">
                    <a
                      onClick={(event) => this.props.openJobPage(event)}
                      href="#"
                      // href="/partner/jobListing.htm?pos=101&amp;ao=883174&amp;s=21&amp;guid=00000175c48e0b9e851bb28a27bdedbc&amp;src=GD_JOB_AD&amp;ei=6036&amp;t=ESR&amp;extid=2&amp;exst=E&amp;ist=L&amp;ast=EL&amp;vt=w&amp;slr=true&amp;cs=1_0151a372&amp;cb=1605320445329&amp;jobListingId=3738626687"
                      // target="_blank"
                      class="JobDetailsStyles__jobTitle"
                    >
                      {job.Title}
                    </a>
                    <div class="JobDetailsStyles__companyInfo pt-xxsm">
                      {job.CompanyName} –{' '}
                      <span>
                        {job.City},{job.State}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="col-2 d-flex flex-column justify-content-between align-items-end">
                <button
                  onClick={
                    alreadyFav
                      ? (event) => this.props.unsaveJob(event)
                      : (event) => this.props.saveJob(event)
                  }
                  id="SaveJobButton"
                  class="JobsListItemStyles__saveIconButton"
                >
                  <span class="hidden">Save Job</span>
                  {heartIcon}
                </button>
                <span class="undefined undefined">
                  <span class="d-block d-md-none">
                    {postedSince}
                    {h_d}
                  </span>
                  <span class="d-none d-md-block">3 days ago</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </li>
    );
  }
}
const mapStateToProps = (state) => {
  const { studentInfoStore } = state.StudentCompleteInfoReducer;
  const { companyOverviewStore } = state.CompanyPageReducer;

  return {
    studentInfoStore,
    companyOverviewStore,
  };
};
export default connect(mapStateToProps, null)(CompanyJobCard);

// export default CompanyJobCard;
