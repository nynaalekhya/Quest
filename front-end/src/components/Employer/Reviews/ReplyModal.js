/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-useless-escape */
import React, { Component } from 'react';
import axios from 'axios';
import serverUrl from '../../../config';
import './ReplyModal.css';
import { hideReplyModal, showReplyModal } from '../../../constants/action-types';
import { connect } from 'react-redux';

class ReplyModal extends Component {
  constructor(props) {
    super(props);
    this.state = {      
      Response: ''
    };
  }

  onChangeReply = (e) => {      
    this.setState({
        Response: e.target.value,
    });      
  }

  handleCancelReply =() => {    
    this.props.toggle();    
  }
  handleSaveReply = () => {  
    
    const Id = this.props.reviewID;
    console.log('inside save', Id);
    axios.defaults.headers.common['authorization'] = localStorage.getItem('token');
    axios
      .post(serverUrl + 'company/reviewResponse', {
        ID: Id,
        Response: this.state.Response,
      })
      .then((response) => {
        console.log('response', response);
        if (response.status === 200) {          
          this.props.toggle();              
        }
      })
      .catch((error) => {
        this.setState({
          errorMessage: 'Reply not saved',
        });
      });
  }

  render() {
    return (
      <div
        class="modal_main "
        style={{
          position: 'relative',
          margin: 'auto',
          background: 'rgb(255, 255, 255)',
          borderRadius: '4px',
          padding: '40px 32px 32px',
          boxShadow: 'rgb(182, 187, 194) 0px 0px 2px 0px',
          width: '600px',
          maxHeight: '80%',
          fontSize: '15px',
          lineHeight: '24px',
          color: 'rgb(80, 88, 99)',
          display: 'flex',
          flexFlow: 'column',
          animationName: 'showMain',
          animationDuration: '400ms',
        }}
      >        
        <div class="topShadow"></div>
        <div class="fullContent">
          <div class="modal_content">
            <div>
              <div class="mr-lg css-1ohf0ui">
                <label for="" class="css-1opum1l">
                  <span>Reply</span>
                </label>
                <div class="input-wrapper css-q444d9">
                  <textarea
                    name="Response"
                    rows="5"
                    placeholder="Description"
                    data-test="description"
                    maxlength="2000"
                    aria-label=""
                    class="css-1q8a8vk"
                    value={this.state.Response}
                    onChange={(event) => {this.onChangeReply(event)}}
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bottomShadow"></div>
        <div class="actionBar">
          <div class="educationStyle__actionBar___3Sai4">
            <button
              class="gd-ui-button d-none d-md-inline-block mr-md-sm css-3ybntp"
              data-test="cancelChanges" onClick={this.handleCancelReply}
            >
              Cancel
            </button>
            <button class="gd-ui-button  css-uk8w9o" data-test="saveChanges" onClick={this.handleSaveReply}>
              Save Changes
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
    const { replyModalStore } = state.ReviewReplyReducer;
    return {
      replyModalStore: replyModalStore,
    };
  };
const mapDispatchToProps = (dispatch) => {
    return {
      hideReplyModal: (payload) => {
        dispatch({
          type: hideReplyModal,
          payload,
        });
      },    
    };
  };
  
export default connect(mapStateToProps, mapDispatchToProps)(ReplyModal);
//export default ReplyModal;
