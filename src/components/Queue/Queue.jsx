
import PropTypes from "prop-types";
import "./Queue.css";

const Queue = ({ songsData, setCurrentSongIndex, currentSongIndex }) => {
  function formatDuration(durationMs) {
    const minutes = Math.floor(durationMs / 60000);
    const seconds = Math.floor((durationMs % 60000) / 1000);
    const formattedMinutes = String(minutes).padStart(2, "0");
    const formattedSeconds = String(seconds).padStart(2, "0");
    return `${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div className="queue-container">
      <div className="queue">
        <div className="title">Upnext</div>
        <div className="list">
          {songsData.map((song, i) => {
            const thumbnailUrl = song?.track?.album?.images?.[2]?.url;
            const isCurrentSong = currentSongIndex === i;
         

            if (thumbnailUrl) {
              return (
                <div
                  className={`song ${isCurrentSong ? "current-song" : ""}`}
                  key={i}
                  onClick={() => {
                    setCurrentSongIndex(i);
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
                    <div className="song-name">{song.track.name}</div>
                    <div className="song-duration">
                      {formatDuration(song.track.duration_ms)}
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

Queue.propTypes = {
  songsData: PropTypes.array.isRequired,
  setCurrentSongIndex: PropTypes.func.isRequired,
  currentSongIndex: PropTypes.number.isRequired
};

export default Queue;
