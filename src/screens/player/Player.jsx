// player.jsx
import  { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiClient } from "../../spotify";
import Queue from "../../components/Queue/Queue";
import Card from "../../components/Card/Card";
import TrackPlayer from "../../components/Track Player/TrackPlayer";
import "./Player.css";
import PropTypes from "prop-types";
import PopularTracks from "../../components/Popular Tracks/PopularTracks";

export default function Player() {
  const [songsData, setSongsData] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.trackId) {
      const trackId = location.state.trackId;
      // Fetch track details using trackId
      apiClient.get(`/tracks/${trackId}`).then((response) => {
        setSongsData([{ track: response.data }]);
        setCurrentSongIndex(0); // Set the current song index to 0
      });
    } else {
      
      const trackId = location.state && location.state.id ? location.state.id : "3HcJoCoDBCfBjjEc2OEDfb";
      // Fetch playlist tracks using the provided ID
      apiClient.get(`/playlists/${trackId}/tracks`).then((response) => {
        setSongsData(response.data.items);
        setCurrentSongIndex(0); // Set the current song index to 0
      });
    }
  }, [location.state]);

  const setCurrentSong = (index) => {
    setCurrentSongIndex(index);
  };

  if (songsData.length > 0) {
    const currentSong = songsData[currentSongIndex]?.track || {};

    return (
      <div className=" player-container">
        <div className="left-player">
          <Card album={currentSong.album}></Card>
        
          <Queue
            songsData={songsData}
            setCurrentSongIndex={setCurrentSong}
            currentSongIndex={currentSongIndex}
          />
        </div>
        <div className="right-player">
          <TrackPlayer
            currentSong={currentSong}
            currentSongIndex={currentSongIndex}
            setCurrentSongIndex={setCurrentSong}
            songsData={songsData}
          />
            <PopularTracks
            songsData={songsData}
            setCurrentSongIndex={setCurrentSong}
            currentSongIndex={currentSongIndex}
          />
          
        </div>
      </div>
    );
  } else {
    return <div>Loading...</div>;
  }
}

Player.propTypes = {
  trackId: PropTypes.string
};
