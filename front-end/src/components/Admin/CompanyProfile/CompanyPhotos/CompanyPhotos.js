import React, { Component } from 'react';
import './CompanyPhotos.css';
import axios from 'axios';
import serverUrl from '../../../../config';
import { updateCompanyPhotosStore } from '../../../../constants/action-types';
import { connect } from 'react-redux';
import PaginationComponent from '../../../Student/Common/PaginationComponent';
import AllPhotos from '../../CompanySearchPhotosAdmin/AllPhotos';

class CompanyPhotos extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.commonFetch();
  }

  commonFetch = (PageNo = 0) => {
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .get(serverUrl + 'admin/getCompanyPhotos', {
        params: {
          CompanyID: localStorage.getItem('companyID'),
          PageNo,
        },
        withCredentials: true,
      })
      .then(
        (response) => {
          console.log('Photos', response.data);
          let payload = {
            PhotoList: response.data[0].Review,
            PageNo,
            Totalcount: response.data[1].Count,
            PageCount: Math.ceil(response.data[1].Count / 10),

            // PageCount: Math.ceil(response.data.Totalcount / 3),
          };
          this.props.updateCompanyPhotosStore(payload);
        },
        (error) => {
          console.log('error', error);
        }
      );
  };

  onPageClick = (e) => {
    // console.log('Page Clicked:', e.selected);
    this.commonFetch(e.selected);
  };

  buttonClicked = (event, Status, ID, CompanyID) => {
    event.preventDefault();
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    const data = {
      Status,
      ID,
      CompanyID,
    };
    axios.post(serverUrl + 'admin/updatePictures', data).then(
      (response) => {
        console.log('Status Code : ', response.status);
        if (response.status === 200) {
          this.commonFetch(this.props.companyPhotosStore.PageNo);
        }
      },
      (error) => {
        console.log('error:', error.response);
      }
    );
  };

  render() {
    return (
      <article id="MainCol">
        <div id="NodeReplace" class="gdGrid">
          <div>
            <div class=" gd-ui-module css-1mzux4t">
              {this.props.companyPhotosStore.PhotoList.length === 0 ? (
                <tr>
                  <td colspan="4">
                    <p> Employees haven't posted any photos yet. </p>
                  </td>
                </tr>
              ) : (
                ''
              )}
              <div class="module interviewsAndFilter">
                <div id="EmployerInterviews">
                  <ol class="empReviews tightLt">
                    {this.props.companyPhotosStore.PhotoList.map((photo) => (
                      <AllPhotos
                        buttonClicked={(event, Status) =>
                          this.buttonClicked(event, Status, photo.ID, photo.CompanyID)
                        }
                        photo={photo}
                      />
                    ))}
                  </ol>
                  <div class="margTop">
                    <div class="breadcrumbList margTop">
                      <div
                        class="breadcrumb ib "
                        itemprop="child"
                        itemscope=""
                        itemtype="http://data-vocabulary.org/Breadcrumb"
                      >
                        <a
                          itemprop="url"
                          // href="/Interview/Amazon-Interview-Questions-E6036.htm"
                          data-ga-lbl=""
                        >
                          <span itemprop="title"></span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div class="gd-ui-pagination css-k5362a css-1rvdm42" data-test="">
                {this.props.companyPhotosStore.PhotoList.length > 0 ? (
                  <PaginationComponent
                    PageCount={this.props.companyPhotosStore.PageCount}
                    PageNo={this.props.companyPhotosStore.PageNo}
                    onPageClick={(e) => {
                      this.onPageClick(e);
                    }}
                  />
                ) : (
                  ''
                )}
                {this.props.companyPhotosStore.Totalcount === 0 ? (
                  ''
                ) : (
                  <div class="paginationFooter">
                    Viewing {this.props.companyPhotosStore.PageNo * 10 + 1} -{' '}
                    {this.props.companyPhotosStore.PhotoList.length +
                      this.props.companyPhotosStore.PageNo * 10}{' '}
                    of {this.props.companyPhotosStore.Totalcount} <span class="filterLabel"></span>{' '}
                    Photos
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </article>
    );
  }
}

// export default CompanyPhotos;

const mapStateToProps = (state) => {
  const { companyOverviewStore, companyPhotosStore } = state.CompanyPageReducer;

  return {
    companyOverviewStore,
    companyPhotosStore,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    updateCompanyPhotosStore: (payload) => {
      dispatch({
        type: updateCompanyPhotosStore,
        payload,
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPhotos);
