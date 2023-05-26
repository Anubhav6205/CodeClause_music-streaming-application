import PropTypes from "prop-types";
import "./ProgressBar.css";

const ProgressBar = ({ percentage, isPlaying, songProgress, setSongProgress }) => {
  const progressBarStyle = {
    width: `${percentage}%`,
    background: "red",
    transition: isPlaying ? "width .1s linear" : "none"
  };

  const handleClick = (event) => {
    const progressBarWidth = event.target.clientWidth;
    const clickedPosition = event.nativeEvent.offsetX;
    const clickedPercentage = (clickedPosition / progressBarWidth) * 100;
    const newSongProgress = (clickedPercentage / 100) * songProgress;
    setSongProgress(newSongProgress);
  };

  return (
    <div className="progress-bar-container">
      <span className="song-progress">
        {Math.round(songProgress) < 10 ? "00:0" + Math.round(songProgress) : "00:" + Math.round(songProgress)}
      </span>
      <div className="progress-box" onClick={handleClick}>
        <div className="progress-bar" style={progressBarStyle}></div>
      </div>
      <span className="song-end">00:30</span>
    </div>
  );
};

ProgressBar.propTypes = {
  percentage: PropTypes.number.isRequired,
  isPlaying: PropTypes.bool.isRequired,
  songProgress: PropTypes.number.isRequired,
  setSongProgress: PropTypes.func.isRequired
};

export default ProgressBar;
