import React, { Component } from 'react';
import '../LandingPage/Body.css';
import { connect } from 'react-redux';

class LeftBlock extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.state = { redirect: null, showImageUploadModal: false };
  }

  // openImageModal = (event) => {
  //   this.setState({
  //     showImageUploadModal: !this.state.showImageUploadModal,
  //   });
  // };

  // handleClick = (event) => {
  //   this.inputElement.current.click();
  // };
  render() {
    return (
      <div class="col-12 col-md-4 pr-md-xxl">
        <div class="d-none d-md-block">
          <div data-test="profilePhoto" id="ProfilePhoto">
            <div class="profilePhotoStyle__profilePhoto___CTVQw">
              <div class="d-inline-flex justify-content-start align-items-center profilePhotoStyle__photoContainer___3itOq">
                <div class="mr-xsm">
                  {this.props.companyInfo.ProfileImg ? (
                    <img
                      src={this.props.companyInfo.ProfileImg}
                      alt="Profile avatar"
                      class="mb-xsm css-uodor8 css-1k2lqp9"
                    />
                  ) : (
                    <span class="SVGInline profilePhotoStyle__icon___1H_01">
                      <svg
                        class="SVGInline-svg profilePhotoStyle__icon___1H_01-svg"
                        style={{ width: '55px', height: '55px' }}
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                      >
                        <path
                          d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z"
                          fill="currentColor"
                          fill-rule="evenodd"
                        ></path>
                      </svg>
                    </span>
                  )}
                </div>
                {/* <div class="profilePhotoBadge">
                  <div onClick={this.openImageModal} class="profilePhotoStyle__caption___HtLE-">
                    <span>Add/Update a photo</span>
                  </div>
                </div> */}
                {/* {this.state.showImageUploadModal ? (
                  <div class="gd-ui-modal css-tb9ljb">
                    <div class="background-overlay" aria-label="Background Overlay"></div>
                    <div class="modal_main ">
                      <span
                        onClick={this.openImageModal}
                        alt="Close"
                        class="SVGInline modal_closeIcon"
                      >
                        <svg
                          class="SVGInline-svg modal_closeIcon-svg"
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                        >
                          <path
                            d="M13.34 12l5.38-5.38a.95.95 0 00-1.34-1.34L12 10.66 6.62 5.28a.95.95 0 00-1.34 1.34L10.66 12l-5.38 5.38a.95.95 0 001.34 1.34L12 13.34l5.38 5.38a.95.95 0 001.34-1.34z"
                            fill="currentColor"
                            fill-rule="evenodd"
                          ></path>
                        </svg>
                      </span>
                      <div class="topShadow"></div>
                      <div class="fullContent">
                        <div class="modal_title">Upload profile picture</div>
                        <div class="modal_content">
                          <div style={{ minWidth: '200px', textAlign: 'center' }}>
                            <div class="h4 m-0">2 MB Max. Minimum 120px x 120px</div>
                            <p class="mt-0 mb-lg _cropmodal__minor___3e2MH">
                              This will replace the current photo if one is already uploaded.
                            </p>
                            <div>
                              <div class="_cropmodal__flexGrid___34tZB _cropmodal__textAlignCenter___2qOZu mt">
                                <div class="m-auto p-0" style={{ height: '200px', width: '200px' }}>
                                  <div
                                    class="_cropmodal__imagePlaceHolder___3oxLX"
                                    style={{
                                      position: 'relative',
                                      width: '200px',
                                      height: '200px',
                                    }}
                                  >
                                    <span class="SVGInline">
                                      <svg
                                        class="SVGInline-svg"
                                        style={{ width: '150px', height: '150px' }}
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="24"
                                        height="24"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          d="M12 7a3 3 0 103 3 3 3 0 00-3-3zm0 9a6 6 0 00-5.33 3.25 9 9 0 0010.66 0A6 6 0 0012 16zm0-14A10 10 0 112 12 10 10 0 0112 2z"
                                          fill="currentColor"
                                          fill-rule="evenodd"
                                        ></path>
                                      </svg>
                                    </span>
                                    <div
                                      class="cropit-preview-image-container"
                                      style={{
                                        position: 'absolute',
                                        overflow: 'hidden',
                                        left: '0px',
                                        top: '0px',
                                        width: '100%',
                                        height: '100%',
                                      }}
                                    >
                                      <img
                                        src={this.props.companyInfo.ProfileImg ? this.props.companyInfo.ProfileImg : ''}
                                        class="cropit-preview-image"
                                        alt=""
                                        style={{
                                          transformOrigin: 'left top',
                                          willChange: 'transform',
                                        }}
                                      />
                                    </div>
                                  </div>
                                </div>
                                <div class="my hidden">
                                  <span class="pr-md">
                                    <i class="icon-rotate pointer"></i>
                                  </span>
                                  <span class="_cropmodal__sliders___AIJLy">
                                    <i class="mr-sm icon-picture-small"></i>
                                    <input
                                      type="range"
                                      class="coverZoom"
                                      min="0"
                                      max="1"
                                      step="0.01"
                                    />
                                    <i class="ml-sm icon-picture-large"></i>
                                  </span>
                                </div>
                              </div>
                              <div class="hidden">
                                <input type="file" class="hidden" accept="image/*" />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="bottomShadow"></div>
                      <div class="actionBar">
                        <button
                          onClick={this.handleClick}
                          class="gd-ui-button  css-uk8w9o"
                          data-test="cropModalPrimary"
                        >
                          <input
                            type="file"
                            ref={this.inputElement}
                            style={{ display: 'none' }}
                            accept=".jpg,.png"
                            onChange={this.uploadImage}
                          />
                          Choose Photo
                        </button>
                        <div class="_cropmodal__cancelButton___3efpJ mt-sm">
                          <button class="gd-ui-button  css-3ybntp" data-test="cropModalCancel">
                            Cancel
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  ''
                )} */}
              </div>
            </div>
          </div>
        </div>
        <div class="navigationStyle__nav___1PF4F gd-ui-tab css-o9yci5">
          <ul role="tablist">
            <li role="tab" class="active css-1h7a53u" aria-selected="true" tabindex="0">
              <div class="customItem css-wks0vk">
                <div class="d-flex flex-row justify-content-start align-items-center">Profile</div>
              </div>
            </li>
            <li role="tab" class=" css-1h7a53u" aria-selected="false" tabindex="0">
              <div class="customItem css-wks0vk">
                <div class="d-flex flex-row justify-content-start align-items-center">Reports</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  const { companyInfo } = state.CompaniesProfileReducer;
  return {
    companyInfo,
  };
};
export default connect(mapStateToProps, null)(LeftBlock);
//export default LeftBlock;
