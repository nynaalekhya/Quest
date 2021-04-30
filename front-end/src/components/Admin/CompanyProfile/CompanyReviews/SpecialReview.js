import React, { Component } from 'react';
import { connect } from 'react-redux';
import defaultplaceholder from '../CompanyNavbar/default-placeholder.png';

class SpecialReview extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    const review = this.props.review;

    const ceoAopproval = review.CEOApproval ? 'green' : 'red';
    return (
      <div class="mt-std pt-std css-1ecrgor e16bqfyh0">
        <div class="d-flex align-items-center justify-content-between mb-std">
          <span
            class="p-xsm css-r6b3o1 e13j59y50"
            data-brandviews="MODULE:n=eiOverview-featuredReview:eid=6036"
          >
            {this.props.reviewType}
          </span>
          <span class="css-5hofmb e16bqfyh1"></span>
        </div>
        <div id="companyOverView" class="row mt-std">
          <div class="d-none d-md-block col-md-1">
            <span class="css-1p55m0f css-1gxqx4q e160gew40">
              <img
                src={
                  this.props.companyOverviewStore.companyOverview.ProfileImg
                    ? this.props.companyOverviewStore.companyOverview.ProfileImg
                    : defaultplaceholder
                }
                alt=" icon"
              />
            </span>
          </div>
          <div class="col-12 col-md-11 pl-md-lg">
            <div>
              <h2 class="mb-xsm mt-0 linkHeader">
                <a href="/Reviews/Employee-Review-Amazon-RVW35439983.htm">{review.Headline}</a>
              </h2>
              <div class="d-flex flex-column flex-md-row align-items-md-center">
                <div class="d-flex align-items-center mr-std  css-lpxl5y e16bqfyh2">
                  <div class="d-flex">
                    <div
                      font-size="sm"
                      class={`css-1nka8iu${review.Rating}s`}
                      style={{ fontSize: '14px' }}
                      //  class="css-1gf6lcl"
                    >
                      <span role="button">★</span>
                      <span role="button">★</span>
                      <span role="button">★</span>
                      <span role="button">★</span>
                      <span role="button">★</span>
                    </div>
                    {/* <span class="SVGInline css-11an5fk forceHeight">
                                <svg
                                  class="SVGInline-svg css-11an5fk-svg forceHeight-svg"
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="24"
                                  height="24"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    d="M4.4 9.25l7.386 7.523a1 1 0 001.428 0L20.6 9.25c.5-.509.5-1.324 0-1.833a1.261 1.261 0 00-1.8 0l-6.3 6.416-6.3-6.416a1.261 1.261 0 00-1.8 0c-.5.509-.5 1.324 0 1.833z"
                                    fill-rule="evenodd"
                                    fill="currentColor"
                                  ></path>
                                </svg>
                              </span>
                            */}{' '}
                  </div>
                  {/* <aside
                              class="gd-ui-tooltip-info toolTip tooltip css-1xincmn"
                              width="initial"
                            >
                              <div class="tooltipContainer">
                                <span class="pointer"></span>
                                <div class="content">
                                  <ul class="pl-0">
                                    <li>
                                      <div>Work/Life Balance</div>
                                      <div font-size="sm" class="css-9iyzoc">
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                      </div>
                                    </li>
                                    <li>
                                      <div>Culture &amp; Values</div>
                                      <div font-size="sm" class="css-9iyzoc">
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                      </div>
                                    </li>
                                    <li>
                                      <div>Career Opportunities</div>
                                      <div font-size="sm" class="css-1gf6lcl">
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                      </div>
                                    </li>
                                    <li>
                                      <div>Comp &amp; Benefits</div>
                                      <div font-size="sm" class="css-9iyzoc">
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                      </div>
                                    </li>
                                    <li>
                                      <div>Senior Management</div>
                                      <div font-size="sm" class="css-9iyzoc">
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                        <span role="button">★</span>
                                      </div>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </aside>
                           */}{' '}
                </div>
                <span class="pt-xsm pt-md-0 css-5hofmb e16bqfyh1">
                  {review.EmployeeStatus} Employee - {review.JobTitle}
                </span>
              </div>
            </div>
            <div id="companyOverView" class="row mt-std">
              <div class="col-12 col-md-4 d-flex align-items-center">
                <span
                  class={`d-inline-block mr-xxsm ${
                    review.Recommended ? 'green' : 'red'
                  } css-ozq8ud e18lin5w1`}
                ></span>
                Recommends
              </div>
              {/*<div class="col-12 col-md-4 pt-xsm pt-md-0 d-flex align-items-center">
                <span class={`d-inline-block mr-xxsm ${review.Recommended?'green':'false'} css-ozq8ud e18lin5w1`}></span>
                Positive Outlook
                          </div>*/}
              <div class="col-12 col-md-4 pt-xsm pt-md-0 d-flex align-items-center">
                <span class={`d-inline-block mr-xxsm ${ceoAopproval} css-ozq8ud e18lin5w1`}></span>
                Approves of CEO
              </div>
            </div>
            <p>{review.Descriptions}</p>
            <div class="my-std css-1raszzq e16x8fv01">
              <p class="strong">Pros</p>
              <span data-test="">{review.Pros}</span>
            </div>
            <div class="my-std css-1raszzq e16x8fv01">
              <p class="strong">Cons</p>
              <span data-test="">{review.Cons}</span>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

// export default SpecialReview;
const mapStateToProps = (state) => {
  const { companyOverviewStore } = state.CompanyPageReducer;
  return {
    companyOverviewStore,
  };
};
export default connect(mapStateToProps, null)(SpecialReview);
