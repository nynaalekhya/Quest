import React, { Component } from 'react';
import { connect } from 'react-redux';
import { updateStudentProfile } from '../../../constants/action-types';
import axios from 'axios';
import serverUrl from '../../../config';

class ImageUploadModal extends Component {
  constructor(props) {
    super(props);
    this.inputElement = React.createRef();
    this.state = { imageUrl: undefined, imageUploaded: false };
  }

  componentDidMount() {
    const imageUrl = this.props.imageUrl;

    this.setState({
      imageUrl,
    });
  }

  handleClick = (event) => {
    this.inputElement.current.click();
  };

  uploadImage = (event) => {
    if (event.target.files.length === 1) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      event.preventDefault();
      let formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
      //   const imageUrl = event.target.files[0].name;
      axios({
        method: 'post',
        url: serverUrl + 'student/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          if (response.status === 200) {
            const imageUrl = response.data;

            this.setState({
              imageUrl,
              imageUploaded: true,
            });
          } else if (parseInt(response.status) === 400) {
          }
        })
        .catch((error) => {
          this.setState({
            errorMsg: error.message,
            authFlag: false,
          });
        });
    }
  };

  saveImage = (event) => {
    event.preventDefault();
    this.props.saveProfileImage(this.state.imageUrl);
    // const student = { ...this.props.studentInfoStore.studentProfile };
    // student.ProfilePicURL = this.state.imageUrl;
    // this.props.updateStudentProfileInDB(student);
  };

  render() {
    return (
      <div className="gd-ui-modal css-tb9ljb">
        <div className="background-overlay" aria-label="Background Overlay"></div>
        <div className="modal_main ">
          <span
            onClick={this.props.openImageModal}
            alt="Close"
            className="SVGInline modal_closeIcon"
          >
            <svg
              className="SVGInline-svg modal_closeIcon-svg"
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
          <div className="topShadow"></div>
          <div className="fullContent">
            <div className="modal_title">Upload picture</div>
            <div className="modal_content">
              <div style={{ minWidth: '200px', textAlign: 'center' }}>
                <p className="mt-0 mb-lg _cropmodal__minor___3e2MH">
                  This will replace the current photo if one is already uploaded.
                </p>
                <div>
                  <div className="_cropmodal__flexGrid___34tZB _cropmodal__textAlignCenter___2qOZu mt">
                    <div className="m-auto p-0" style={{ height: '200px', width: '200px' }}>
                      <div
                        className="_cropmodal__imagePlaceHolder___3oxLX"
                        style={{ position: 'relative', width: '200px', height: '200px' }}
                      >
                        <span className="SVGInline">
                          <svg
                            className="SVGInline-svg"
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
                          className="cropit-preview-image-container"
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
                            src={this.state.imageUrl ? this.state.imageUrl : ''}
                            className="cropit-preview-image"
                            alt=""
                            style={{
                              width: '195px',
                              height: '195px',
                              transformOrigin: 'left top',
                              willChange: 'transform',
                            }}
                          />
                        </div>
                      </div>
                    </div>
                    <div className="my hidden">
                      <span className="pr-md">
                        <i className="icon-rotate pointer"></i>
                      </span>
                      <span className="_cropmodal__sliders___AIJLy">
                        <i className="mr-sm icon-picture-small"></i>
                        <input type="range" className="coverZoom" min="0" max="1" step="0.01" />
                        <i className="ml-sm icon-picture-large"></i>
                      </span>
                    </div>
                  </div>
                  <div className="hidden">
                    <input type="file" className="hidden" accept="image/*" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bottomShadow"></div>
          <div className="actionBar">
            {!this.state.imageUploaded ? (
              <button
                onClick={this.handleClick}
                className="gd-ui-button  css-uk8w9o"
                data-test="cropModalPrimary"
                type="button"
              >
                <input
                  onChange={this.uploadImage}
                  type="file"
                  ref={this.inputElement}
                  style={{ display: 'none' }}
                  accept=".jpg,.png"
                />
                Upload Image
              </button>
            ) : (
              <div className="_cropmodal__cancelButton___3efpJ mt-sm">
                <button
                  onClick={this.saveImage}
                  className="gd-ui-button  css-3ybntp"
                  data-test="cropModalCancel"
                >
                  Save Image
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// export default ImageUploadModal;
const mapStateToProps = (state) => {
  const { companyInfo } = state.CompaniesProfileReducer;

  return {
    companyInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateStudentProfile: (payload) => {
      dispatch({
        type: updateStudentProfile,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ImageUploadModal);
