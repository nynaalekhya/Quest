import React, { Component } from 'react';
import moment from 'moment';
import defaultplaceholder from '../CompanyProfile/CompanyNavbar/default-placeholder.png';

class Questions extends Component {
  constructor(props) {
    super(props);
    this.state = { showanswer: false };
  }
  showAnswers = (event) => {
    event.preventDefault();
    this.setState({
      showanswer: !this.state.showanswer,
    });
  };
  render() {
    const interview = this.props.interview;

    return (
      <div id="InterviewQuestionResult_1" className="interviewQuestionWrapper padVertLg">
        <div
          className="interviewQuestion noPad "
          data-brandviews="BRAND:n=hub-interviewQuestion:eid=6036:uid=94575"
        >
          <div className="tbl fill">
            <div id="interview" className="row">
              <div className="cell logo padRtLg hideHH" style={{ paddingRight: '20px' }}>
                <a href="/Interview/Amazon-Interview-Questions-E6036.htm" className="sqLogoLink">
                  <span className="sqLogo tighten smSqLogo">
                    <img
                      src={interview.ProfileImg ? interview.ProfileImg : defaultplaceholder}
                      className="lazy lazy-loaded"
                      data-retina-ok="true"
                      alt=" Logo"
                      title=""
                      style={{ opacity: '1' }}
                    />
                  </span>
                </a>
              </div>
              <div className="cell">
                <div className="tbl fill margBotSm">
                  <div id="interview" className="row">
                    <h3 className="cell p">
                      <span className="authorInfo">
                        <a>
                          {interview.JobTitle} at {interview.CompanyName} was asked...
                        </a>
                      </span>
                    </h3>
                    <div className="cell alignRt noWrap minor hideHH">
                      {' '}
                      {moment(interview.DatePosted).format('ll')}
                    </div>
                  </div>
                </div>
                <div className="question margTopSm">
                  <table className="interviewQuestionText">
                    <tbody>
                      <tr>
                        <td>
                          <p className="questionText h3" style={{ marginBottom: '10px' }}>
                            {' '}
                            {interview.InterviewQuestions}
                          </p>
                          <a
                            onClick={this.showAnswers}
                            className="userResponseLink margTop block hiddenLink mmLink "
                            href="#"
                          >
                            Answer
                            <i
                              className={`caret-blue margLtSm ${
                                this.state.showanswer ? 'rotate180' : ''
                              }`}
                            ></i>
                          </a>
                          <div
                            className="userResponses margTopLg borderTop"
                            style={{ display: this.state.showanswer ? 'block' : 'none' }}
                          >
                            <div className="responseText padTopSm tbl fill">
                              <p className="cell noMargVert padVert borderBot">
                                {interview.Answers}
                              </p>
                            </div>
                          </div>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Questions;
