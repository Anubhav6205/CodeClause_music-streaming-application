// populartracks.jsx
import  { useEffect, useState } from "react";
import PropTypes from "prop-types";
import "./PopularTracks.css";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../../spotify";

const PopularTracks = ({
  songsData,
  currentSongIndex
}) => {
  const [topTracks, setTopTracks] = useState([]);

  const navigate = useNavigate();

  const openTopTrack = (id) => {
    navigate("/player", { state: { trackId: id } });
  };

  function formatDuration(durationMs) {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }
  useEffect(() => {
    const fetchTopTracks = async () => {
      if (
        songsData &&
        songsData[currentSongIndex] &&
        songsData[currentSongIndex].track &&
        songsData[currentSongIndex].track.artists
      ) {
        try {
          const artistId = songsData[currentSongIndex].track.artists[0].id;
          const response = await apiClient.get(
            `/artists/${artistId}/top-tracks`,
            {
              params: {
                country: "ES" // Replace with the desired country code
              }
            }
          );
          setTopTracks(response.data.tracks);
          
        } catch (error) {
          console.error("Failed to fetch top tracks:", error);
        }
      }
    };

    fetchTopTracks();
  }, [songsData, currentSongIndex]);

  return (
    <div className="popular-tracks-container">
      <div className="popular-tracks">
        <div className="title">
          Popular Tracks by
          <span className="artist">{songsData[currentSongIndex].track.artists[0].name}</span>
          <span></span>
        </div>
        <div className="list">
          {topTracks.map((track, ii) => {
            const thumbnailUrl = track?.album?.images?.[2]?.url;

            if (thumbnailUrl) {
              return (
                <div
                  className={`song `}
                  key={ii}
                  onClick={() => {
                    openTopTrack(track.id);
                  }}
                >
                  <div className="thumbnail">
                    {thumbnailUrl ? (
                      <img
                        src={thumbnailUrl}
                        alt=""
                        className="thumbnail-image"
                      />
                    ) : (
                      <div className="placeholder-thumbnail">No Image</div>
                    )}
                  </div>
                  <div className="song-info">
                    <div className="song-name">{track.name}</div>
                    <div className="song-duration">
                      {formatDuration(track.duration_ms)}
                    </div>
                  </div>
                </div>
              );
            }
            return null;
          })}
        </div>
      </div>
    </div>
  );
};

PopularTracks.propTypes = {
  songsData: PropTypes.array.isRequired,
  setCurrentSongIndex: PropTypes.func.isRequired,
  currentSongIndex: PropTypes.number.isRequired
};

export default PopularTracks;
