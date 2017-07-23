import React, { Component } from 'react';
import moment from 'moment';

export default class Repository extends Component {
  render() {
    const relativePushedAt = moment(this.props.repo.pushed_at).fromNow();

    return (
      <div className="row repo">
        <div className="repo-header clearfix">
          <h2 className="repo-name">{this.props.repo.name}</h2>
          <div className="repo-stats">
            <span className="repo-stars">
              <i className="fa fa-star"></i>
              {this.props.repo.stars}
            </span>
            <span className="repo-forks">
              <i className="fa fa-code-fork"></i>
              {this.props.repo.forks}
            </span>
          </div>
        </div>
        <div className="repo-body">
          <p className="repo-description">{this.props.repo.description}</p>
        </div>
        <div className="repo-footer">
          <span className="repo-language">{this.props.repo.language || "Unknown"}</span>
          <span className="repo-last-updated">Updated {relativePushedAt}</span>
          <a href={this.props.repo.url}>View on GitHub &raquo;</a>
        </div>
      </div>
    )
  }
}
