import React, { Component } from 'react';
import {render} from 'react-dom';
import ReactPaginate from 'react-paginate';

let repositories = [
  {
    name: 'retrace',
    description: '"retrace" is a Linux, {Open,Net,Free}BSD and macOS executable tracer that displays C library calls and has the ability to redirect function inputs and outputs.',
    stars: 3,
    forks: 5,
    languages: ['C', 'CSS'],
    pushed_at: 'Mon, 17 Jul 2017 08:33:00 GMT',
    url: '#'
  },
  {
    name: 'rnp',
    description: 'rnp is a C library approach to OpenPGP; GnuPG alternative',
    stars: 10,
    forks: 7,
    languages: ['Ruby'],
    pushed_at: 'Mon, 17 Jul 2017 08:33:00 GMT',
    url: '#'
  }
];

export class RepositoryList extends Component {
  render() {
    let repositoryNodes = this.props.repositories.map(function(repository, index) {
      return (
        <div key={index} className="row repo">
          <div className="repo-header clearfix">
            <h2 className="repo-name">{repository.name}</h2>
            <div className="repo-stats">
              <span className="repo-stars"><i className="fa fa-star"></i>{repository.stars}</span>
              <span className="repo-forks"><i className="fa fa-code-fork"></i>{repository.forks}</span>
            </div>
          </div>
          <div className="repo-body">
            <p className="repo-description">
              {repository.description}
            </p>
          </div>
          <div className="repo-footer">
            <span className="repo-language">C</span>
            <span className="repo-language">CSS</span>
            <span className="repo-last-updated">Updated {repository.pushed_at}</span>
            <a href="{repository.url}">View on GitHub &raquo;</a>
          </div>
        </div>
      )
    });

    return (
      <div id="repositories">
        {repositoryNodes}
      </div>
    )
  }
}

export class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: repositories,
      // pageCount: Math.ceil(repositories.length / this.props.perPage),
      pageCount: 10,
      offset: 0
    }
  }

  handlePageClick = (data) => {
    let selected = data.selected;
    let offset = Math.ceil(selected * this.props.perPage);

    this.setState({ offset: offset });
  }

  render() {
    return (
      <div class="repositoryBox">
        <RepositoryList repositories={this.state.data} />
        <ReactPaginate previousLabel={"previous"}
                       previousClassName={"previous"}
                       nextLabel={"next"}
                       nextClassName={"next"}
                       containerClassName={"pager"}
                       breakLabel={<a href="">...</a>}
                       breakClassName={"break-me"}
                       pageCount={this.state.pageCount}
                       marginPagesDisplayed={0}
                       pageRangeDisplayed={-1}
                       onPageChange={this.handlePageClick}
                       subContainerClassName={"pages pagination"}
                       activeClassName={"active"} />
      </div>
    );
  }
}

render(<App perPage={10} />, document.getElementById('RepositoryList'));
