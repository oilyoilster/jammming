import React from 'react';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import './App.css';
import Spotify from '../../util/Spotify';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: 'New Playlist',
      playlistTracks: []
    };

//Handler-Binders
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

//+
  addTrack(track) {
    let tracksArr = this.state.playlistTracks;

    if (!tracksArr.find(trackIndex => trackIndex.id === track.id)) {
      tracksArr.push(track);
      this.setState({playlistTracks: tracksArr});
    }
  }

//-
  removeTrack(track) {
    let tracksArr = this.state.playlistTracks;

    let newTracksArr = tracksArr.filter(trackIndex => trackIndex.id !== track.id);
    this.setState({playlistTracks: newTracksArr});
  }

// New playlist name
  updatePlaylistName(newPlaylistName) {
    this.setState({playlistName: newPlaylistName});
  }

// Save playlist
  savePlaylist() {

    //const trackURIs = this.state.playlistTracks.map(track => track.uri);

    let trackURIs = [];
    this.state.playlistTracks.forEach(playlistTrack => {
      trackURIs.push(playlistTrack.uri);
    });
    Spotify.savePlaylist(
      this.state.playlistName, trackURIs
    );
    this.setState({
      playlistTracks:[],
      playlistName: 'New Playlist',
      searchResults:[]
    });
  }

// Search engine
  search(searchTerm) {
      Spotify.search(searchTerm)
      .then(tracks => this.setState({searchResults: tracks}));
    }



// Render function
  render() {
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
            <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults
                searchResults={this.state.searchResults}
                onAdd={this.addTrack}  />
            <Playlist
                playlistName={this.state.playlistName}
                playlistTracks={this.state.playlistTracks}
                onRemove={this.removeTrack}
                onNameChange={this.updatePlaylistName}
                onSave={this.savePlaylist} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
