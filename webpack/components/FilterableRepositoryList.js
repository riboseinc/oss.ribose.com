import React, { Component } from 'react';
import axios from 'axios';
import Fuse from 'fuse.js';
import moment from 'moment';
import PaginatedRepositoryList from './PaginatedRepositoryList';
import FilterRepositoryInput from './FilterRepositoryInput';

export default class FilterableRepositoryList extends Component {
  constructor(props) {
    super(props);

    this.state = {
      sortBy: 'none',
      searchFor: '',
      repos: []
    }

    this.searchOptions = {
      shouldSort: true,
      threshold: 0.6,
      location: 0,
      distance: 100,
      maxPatternLength: 32,
      minMatchCharLength: 1,
      keys: ["name", "description"]
    }

    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  componentDidMount() {
    this.fetchRepos();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.url !== nextProps.url) {
      this.fetchRepos();
    }
  }

  fetchRepos() {
    const url = this.props.url;

    axios.get(url).then(result => {
      const repos = result.data;

      this.setState({ repos });
    });
  }

  handleSortChange(sortBy) { this.setState({ sortBy }) }
  handleSearchChange(searchFor) { this.setState({ searchFor }) }

  getFilteredRepos(sortBy, searchFor) {
    let repos = this.state.repos.slice();

    if (searchFor !== '') {
      repos = (new Fuse(repos, this.searchOptions)).search(searchFor);
    }

    switch (sortBy) {
      case 'stars':
      case 'forks':
        repos.sort((a, b) => b[sortBy] - a[sortBy]);
        break;
      case 'name':
        repos.sort((a, b) => a[sortBy].localeCompare(b[sortBy]));
        break;
      case 'updated_at':
        repos.sort((a, b) => {
          const am = moment(a.pushed_at),
                bm = moment(b.pushed_at);

          if (am.isSame(bm)) {
            return 0;
          } else if (am.isBefore(bm)) {
            return 1;
          }

          return -1;
        });
        break;
    }
    
    return repos;
  }

  render() {
    const { sortBy, searchFor } = this.state,
          filteredRepos = this.getFilteredRepos(sortBy, searchFor);

    return (
      <div>
        <FilterRepositoryInput 
          sort={sortBy} 
          onSortChange={this.handleSortChange}
          search={searchFor}
          onSearchChange={this.handleSearchChange} />
        <PaginatedRepositoryList repos={filteredRepos} perPage={10} />
      </div>
    )
  }
}
