import React, { Component } from 'react';
import ReactPaginate from 'react-paginate';
import './PaginationComponent.css';

class PaginationComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handlePageClick = (e) => {
    this.props.onPageClick(e);
  };
  render() {
    return (
      <div id="FooterPageNav" className="pageNavBar tbl fill noMargBot">
        <div className="pagingControls cell middle">
          <ReactPaginate
            previousLabel={'<'}
            nextLabel={'>'}
            breakLabel={''}
            breakClassName={'break-me'}
            pageCount={this.props.PageCount}
            marginPagesDisplayed={0}
            pageRangeDisplayed={4}
            onPageChange={this.handlePageClick}
            containerClassName={'pagination'}
            subContainerClassName={'pages pagination'}
            activeClassName={'active'}
            forcePage={this.props.PageNo}
          />
        </div>
      </div>
    );
  }
}

export default PaginationComponent;
