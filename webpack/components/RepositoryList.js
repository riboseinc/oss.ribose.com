import React, { Component } from 'react';
import Repository from './Repository';

export default class RepositoryList extends Component {
  render() {
    return (
      <div>
        {
          this.props.repos.map((repo, index) => {
            return <Repository repo={repo} key={index} />
          })
        }
      </div>
    )
  }
}
