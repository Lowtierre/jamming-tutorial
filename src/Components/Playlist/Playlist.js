import React from "react";
import './Playlist.css'
import { Tracklist } from "../Tracklist/Tracklist";

export class Playlist extends React.Component {

    constructor(props) {
        super(props);
        this.handlePlaylistName = this.handlePlaylistName.bind(this);
    }

    handlePlaylistName(e) {
        this.props.onNameChange(e.target.value)
    }

    render() {
        return (
            <div className="Playlist">
                <input placeholder="Playlist Name" value={this.props.playlistName} onChange={this.handlePlaylistName} />
                <Tracklist
                tracks={this.props.playlistTracks}
                onRemove={this.props.onRemove}
                isRemoval={true}
                />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}