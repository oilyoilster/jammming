import React from 'react';

import './SearchBar.css';


class SearchBar extends React.Component {
  constructor(props) {
      super(props);
      this.state = {term: ''};
      this.search = this.search.bind(this);
      this.handleTermChange = this.handleTermChange.bind(this);
      this.handleKeyUp = this.handleKeyUp.bind(this);
  }

  handleKeyUp(e) {
     if (e.keyCode === 13) {
       this.search();
     }
   }

  search() {
      this.props.onSearch(this.state.term);
    }

  handleTermChange(event) {
      this.setState({term: event.target.value});
      }



  render() {
    return (
      <div className="SearchBar">
          <input placeholder="Search for a song, album or artist"
                 onChange={this.handleTermChange}
                 onKeyUp={this.handleKeyUp}
                 tabIndex={1}
                 />
          <a onClick={this.search}
             tabIndex={2}>SEARCH</a>

      </div>
    );
  }
}

export default SearchBar;
