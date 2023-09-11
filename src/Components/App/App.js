import React from 'react';
import './App.css';
import { SearchBar } from '../SearchBar/SearchBar'
import { SearchResults } from '../SearchResults/SearchResults'
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchResults: [],
      playlistName: "",
      playlistTracks: [],
    };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    const foundTrack = this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id);
    const newTracks = this.state.playlistTracks.concat(track)
    foundTrack ? console.log("Track already exists") : this.setState({ playlistTracks: newTracks });
  }

  removeTrack(track) {
    const newTracks = this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id);
    this.setState({ playlistTracks: newTracks });
  }

  updatePlaylistName(name) {
    this.setState({ playlistName: name });
  }

  savePlaylist() {
    const trackURIs = this.state.playlistTracks.map(track => track.uri);
    const name = this.state.playlistName;
    Spotify.savePlaylistName(name, trackURIs).then(
      response => {
        this.setState({
          playlistName: "",
          playlistTracks: []
        })
      }
    )
  }

  search(term) {
    Spotify.search(term)
      .then(response => {
        this.setState({
          searchResults: response
        })
      })
  }

  render() {
    return (
      <div>
        <h1>
          Ja<span className='highlight'>mmm</span>ing
        </h1>
        <div className='App'>
          <SearchBar onSearch={this.search} />
          <div className='App-playlist'>
            <SearchResults
            searchResults={this.state.searchResults}
            onAdd={this.addTrack}
             />
            <Playlist
              playlistName={this.state.playlistName}
              playlistTracks={this.state.playlistTracks}
              onRemove={this.removeTrack}
              onNameChange={this.updatePlaylistName}
              onSave={this.savePlaylist}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
