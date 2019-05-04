import React from 'react';
import './Playlist.css';
import TrackList from '../TrackList/TrackList'

class Playlist extends React.Component {
  constructor(props) {
    super(props);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleNameChange(event) {
    this.props.onNameChange(event.target.value);
  }

  render() {
    return (
      <div className="Playlist">
        <input value={this.props.playlistName}
               onChange={this.handleNameChange}
               tabIndex={3}  />
        <TrackList  tracks={this.props.playlistTracks}
                    onRemove={this.props.onRemove}
                    isRemoval={true}  />

        <a className="Playlist-save"
           onClick={this.props.onSave}
           tabIndex={4}  >SAVE TO SPOTIFY</a>
      </div>
    );
  }
}

export default Playlist;
