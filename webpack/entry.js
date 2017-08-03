import React, { Component } from 'react';
import {render} from 'react-dom';
import FilterableRepositoryList from './components/FilterableRepositoryList';
import repositories from './repositories';

export class App extends Component {
  render() {
    /*return (
      <FilterableRepositoryList 
        url={"https://s3.amazonaws.com/caching.oss.ribose.com/repos.json"} />
    );*/
    return (
      <FilterableRepositoryList repos={repositories} />
    );
  }
}

render(<App />, document.getElementById('RepositoryList'));
