import React, { Component } from 'react';
import Pagination from 'react-paginate';
import RepositoryList from './RepositoryList';

export default class PaginatedRepositoryList extends Component {
  constructor(props) {
    super(props);

    this.state = { page: 0 };

    this.handlePageClick = this.handlePageClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.repos != nextProps.repos) {
      this.setState({ page: 0 });
    }
  }

  handlePageClick(page) {
    this.setState({ page: page.selected });
  }

  render() {
    const { repos, perPage } = this.props,
          pageCount = Math.ceil(repos.length / perPage),
          page = this.state.page,
          offset = page * perPage,
          repoPage = repos.slice(offset, offset + perPage);

    return (
      <div>
        <RepositoryList repos={repoPage} />
        { repos.length > perPage && 
          <Pagination
            pageCount={pageCount}
            pageRangeDisplayed={-1}
            marginPagesDisplayed={0}
            onPageChange={this.handlePageClick}
            previousLabel={"previous"}
            previousClassName={"previous"}
            nextLabel={"next"}
            nextClassName={"next"}
            containerClassName={"pager"}
            subContainerClassName={"pages pagination"} />
        }
      </div>
    )
  }
}
