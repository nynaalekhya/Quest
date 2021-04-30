import React, { Component } from 'react';
import PaginationComponent from '../../Common/PaginationComponent';
import './CompanyPhotos.css';
import axios from 'axios';
import serverUrl from '../../../../config';
import { updateCompanyPhotosStore } from '../../../../constants/action-types';
import { connect } from 'react-redux';

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
      .get(serverUrl + 'student/companyPhotos', {
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
            PhotoList: response.data.results,
            PageNo,
            Totalcount: response.data.count,
            PageCount: Math.ceil(response.data.count / 10),

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

  render() {
    return (
      <article id="MainCol">
        <div id="NodeReplace" className="gdGrid">
          <div>
            <div className=" gd-ui-module css-1mzux4t">
              {this.props.companyPhotosStore.PhotoList.length === 0 ? (
                <tr>
                  <td colspan="4">
                    <p> Employees haven't posted any photos yet. </p>
                  </td>
                </tr>
              ) : (
                ''
              )}
              <div className="mb row d-flex flex-wrap">
                {this.props.companyPhotosStore.PhotoList.map((photo) => (
                  <button
                    style={{ paddingLeft: '0', height: '100%', paddingRight: '0' }}
                    className="eiPhoto css-15w2ie1 e25p3zc0"
                    data-id="12643486"
                    data-slide-num="1"
                    data-slide-num-on-page="18"
                  >
                    <img className="p-xsm" src={photo.PhotoURL} alt={photo.CompanyName} />
                  </button>
                ))}
              </div>
              <div className="gd-ui-pagination css-k5362a css-1rvdm42" data-test="">
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
                {this.props.companyPhotosStore.PhotoList.length > 0 ? (
                  <div className="paginationFooter">
                    Viewing {this.props.companyPhotosStore.PageNo * 10 + 1} -{' '}
                    {this.props.companyPhotosStore.PhotoList.length +
                      this.props.companyPhotosStore.PageNo * 10}{' '}
                    of {this.props.companyPhotosStore.Totalcount}{' '}
                    <span className="filterLabel"></span> Photos
                  </div>
                ) : (
                  ''
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
