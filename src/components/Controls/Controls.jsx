
import PropTypes from "prop-types";
import { FaStepBackward, FaPlay, FaPause, FaStepForward } from "react-icons/fa";
import "./Controls.css";

const Controls = ({ isPlaying, setIsPlaying, handleNext, handlePrev }) => {
  return (
    <div className="controls-container">
      <button className="control-btn prev-btn" onClick={handlePrev}>
        <FaStepBackward />
      </button>
      <button
        className={`control-btn play-btn ${isPlaying ? "pause" : ""}`}
        onClick={() => setIsPlaying(!isPlaying)}
      >
        {isPlaying ? <FaPause /> : <FaPlay />}
      </button>
      <button className="control-btn next-btn" onClick={handleNext}>
        <FaStepForward />
      </button>
    </div>
  );
};

Controls.propTypes = {
  isPlaying: PropTypes.bool,
  setIsPlaying: PropTypes.func,
  handleNext: PropTypes.func,
  handlePrev: PropTypes.func,
};

export default Controls;
