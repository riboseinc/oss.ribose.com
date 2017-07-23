import React, { Component } from 'react';

export default class FilterRepositoryInput extends Component {
  constructor(props) {
    super(props);

    this.handleSortChange = this.handleSortChange.bind(this);
    this.handleSearchChange = this.handleSearchChange.bind(this);
  }

  handleSortChange(e) {
    this.props.onSortChange(e.target.value);
  }

  handleSearchChange(e) {
    this.props.onSearchChange(e.target.value);
  }

  render() {
    return (
      <div className="row">
        <form className="form-inline">
          Order by:
          <select className="form-control" value={this.props.sort} onChange={this.handleSortChange}>
            <option value="none"></option>
            <option value="stars">Stars</option>
            <option value="forks">Forks</option>
            <option value="name">Name</option>
            <option value="updated_at">Updated</option>
          </select>
          <input type="text" className="form-control" placeholder="Search..." value={this.props.search} onChange={this.handleSearchChange} />
        </form>
      </div>
    )
  }
}
