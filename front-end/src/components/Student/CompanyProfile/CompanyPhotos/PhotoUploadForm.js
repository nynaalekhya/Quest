import React, { Component } from 'react';
import './PhotoUploadForm.css';
import axios from 'axios';
import serverUrl from '../../../../config';
import { history } from '../../../../App';
import { Redirect } from 'react-router';

class PhotoUploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = { photos: [], uploadMessage: null };
  }

  goToHomePage = () => {
    this.setState({
      filterDropDownOpen: false,
    });
    history.push('/Home');
  };

  onChangeFileHandler = (event) => {
    if (event.target.files.length === 1) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      event.preventDefault();
      let formData = new FormData();
      formData.append('file', event.target.files[0], event.target.files[0].name);
      const imageName = event.target.files[0].name;
      axios({
        method: 'post',
        url: serverUrl + 'student/upload',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
        .then((response) => {
          // console.log('Status Code : ', response.status);
          if (response.status === 200) {
            // console.log('Product Saved');
            let photos = this.state.photos;
            photos.push({ imageurl: response.data, name: imageName });
            this.setState({
              photos,
              uploadMessage: null,
            });
          } else if (parseInt(response.status) === 400) {
            // console.log(response.data);
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

  saveImages = (event) => {
    event.preventDefault();

    if (this.state.photos.length > 0) {
      axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
      const data = {
        CompanyID: localStorage.getItem('companyID'),
        StudentID: localStorage.getItem('userId'),
        CompanyName: localStorage.getItem('form_company_name'),
        Photos: this.state.photos,
      };
      axios.post(serverUrl + 'student/addCompanyPhotos', data).then(
        (response) => {
          console.log('Status Code : ', response.status);
          if (response.status === 200) {
             this.props.history.goBack();
             this.props.history.goBack();
            this.setState({
              uploadMessage: 'Photos uploaded Successfully!',
              photos: [],
            });
          }
        },
        (error) => {
          console.log('error:', error.response);
        }
      );
    } else {
      this.setState({
        uploadMessage: 'First choose some pics',
      });
    }
  };

  render() {
    if (localStorage.getItem('token')) {
      if (localStorage.getItem('userrole') === 'company') {
        return <Redirect to="/Employer" />;
      } else if (localStorage.getItem('userrole') === 'admin') {
        return <Redirect to="/AdminHomePage" />;
      } else if (!localStorage.getItem('companyID') || !localStorage.getItem('form_company_name')) {
        return <Redirect to="/Home" />;
      }
    } else {
      return <Redirect to="/login" />;
    }
    return (
      <main id="mount">
        <div>
          <header id="header">
            <div class="background">
              <nav>
                <div class="logoContainer">
                  <a
                    href="#"
                    onClick={this.goToHomePage}
                    class="logo green "
                    aria-label="Go To Glassdoor homepage"
                  ></a>
                </div>
              </nav>
            </div>
          </header>
          <div></div>
          <div class="article-aside">
            <article class="module">
              <div class="survey-two-column">
                <div>
                  <h1>Post {localStorage.getItem('form_company_name')} Workplace Photos</h1>
                </div>
              </div>
              <p>
                We encourage you to upload photos that offer a behind-the-scenes look at your
                workplace (e.g. your office, break room, etc.) and are reflective of your company's
                culture.
              </p>
              <div class="photo-survey">
                <form autocomplete="off">
                  {this.state.photos.map((image) => (
                    <div class="photo-add-caption">
                      <div>
                        <img src={image.imageurl} alt="darthVader.jpg" />
                      </div>
                      <div>
                        <p>{image.name}</p>
                      </div>
                    </div>
                  ))}

                  {/* <div class="photo-add-caption">
                    <div>
                      <img src="" alt="caesarSalad.jpg" />
                    </div>
                  </div>*/}
                  <div>
                    <label style={{ width: '100%' }} for="imageupload">
                      <p style={{ cursor: 'pointer' }} class="link center">
                        Or Browse Files
                      </p>

                      <input
                        onChange={this.onChangeFileHandler}
                        id="imageupload"
                        name="imageupload"
                        type="file"
                        aria-labelledby="submit"
                        class="hidden"
                        accept="image/*"
                      />
                    </label>
                  </div>
                  {this.state.uploadMessage !== null ? (
                    <div data-test="helper" class="css-1pakod1">
                      {this.state.uploadMessage}
                    </div>
                  ) : (
                    ''
                  )}
                  <button
                    onClick={this.saveImages}
                    class="gd-ui-button submitButton css-8i7bc2"
                    type="button"
                    id="submit"
                  >
                    Upload Photos
                  </button>
                </form>
              </div>
            </article>
          </div>
        </div>
      </main>
    );
  }
}

export default PhotoUploadForm;
