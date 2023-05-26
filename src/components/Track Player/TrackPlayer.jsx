import PropTypes from "prop-types";
import ProgressBar from "../Progress Bar/ProgressBar";
import Controls from "../Controls/Controls";
import "./TrackPlayer.css";
import { useState, useEffect, useRef } from "react";

const TrackPlayer = ({
  currentSong,
  currentSongIndex,
  setCurrentSongIndex,
  songsData
}) => {
  // Check if currentSong exists and has the required properties

  const [isPlaying, setIsPlaying] = useState(false);
  const [songProgress, setSongProgress] = useState(0);
  let preview_url = songsData[currentSongIndex]?.track?.preview_url;
  const [url, setUrl] = useState(preview_url);

  // initializing audioRef with Audio object constructor with preview URL value
  const audioRef = useRef(new Audio(songsData[0]?.track?.preview_url));

  // creating new ref initialized with undefined value
  const intervalRef = useRef();

  // creating new ref initialized with false
  const isReady = useRef(false);
  // destructuring duration from audioRef.current
  const { duration } = audioRef.current;

  // calculating the percentage for song completion
  const currentPercentage = duration ? (songProgress / duration) * 100 : 0;

  // timer function
  const startTimer = () => {
    // clearing the interval to avoid multiple timers running simultaneously
    clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      // if the current song has ended, play the next song
      if (audioRef.current.ended) {
        handleNext();
      } else {
        setSongProgress(audioRef.current.currentTime);
      }
    }, 1000);
  };

  useEffect(() => {
    setUrl(songsData[currentSongIndex]?.track?.preview_url);
  }, [songsData, currentSongIndex]);

  useEffect(() => {
    if (audioRef.current.src) {
      if (isPlaying && audioRef.current) {
        audioRef.current.play();
        startTimer();
      } else {
        audioRef.current.pause();
      }
    } else {
      if (isPlaying && audioRef.current) {
        audioRef.current = new Audio(url);
        audioRef.current.play();
        startTimer();
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current = new Audio(url);
    setSongProgress(audioRef.current.currentTime);

    if (isReady.current && url) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [url]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  const handleNext = () => {
    if (currentSongIndex < songsData.length - 1) {
      setCurrentSongIndex(currentSongIndex + 1);
    } else {
      setCurrentSongIndex(0);
    }
  };

  const handlePrev = () => {
    if (currentSongIndex > 0) {
      setCurrentSongIndex(currentSongIndex - 1);
    } else {
      setCurrentSongIndex(songsData.length - 1);
    }
  };

  const getArtists = () => {
    if (currentSong && currentSong.artists) {
      const artists = currentSong.artists.map((artist) => artist.name);
      if (artists.length <= 2) {
        return artists.join(" and ");
      } else {
        const firstTwoArtists = artists.slice(0, 2).join(" , ");
        return firstTwoArtists + " and more.";
      }
    }
    return "";
  };

  const handleProgressBarClick = (clickedProgress) => {
    setSongProgress(clickedProgress);
    audioRef.current.currentTime = clickedProgress;
  };

  if (
    !currentSong ||
    !currentSong.album ||
    !currentSong.album.name ||
    !songsData
  ) {
    return <div>Invalid song data</div>;
  }

  return (
    <div className="track-player-container">
      <div className="main-album-name">
        <p>
          {currentSong.name && currentSong.name.indexOf("(") !== -1
            ? currentSong.name.slice(0, currentSong.name.indexOf("(")).length > 20
              ? currentSong.name.slice(0, currentSong.name.indexOf("(")) + "..."
              : currentSong.name.slice(0, currentSong.name.indexOf("("))
            : currentSong.name && currentSong.name.length > 20
            ? currentSong.name.slice(0, 20) + "..."
            : currentSong.name}
        </p>
      </div>
      <div className="artist-name">{getArtists()}</div>

      <Controls
        isPlaying={isPlaying}
        setIsPlaying={setIsPlaying}
        handleNext={handleNext}
        handlePrev={handlePrev}
      />
      <ProgressBar
        percentage={currentPercentage}
        isPlaying={isPlaying}
        songProgress={songProgress}
        setSongProgress={handleProgressBarClick}
      />
    </div>
  );
};

TrackPlayer.propTypes = {
  currentSong: PropTypes.shape({
    album: PropTypes.shape({
      name: PropTypes.string.isRequired
    }).isRequired,
    name: PropTypes.string.isRequired,
    artists: PropTypes.array
  }),
  currentSongIndex: PropTypes.number.isRequired,
  setCurrentSongIndex: PropTypes.func.isRequired,
  songsData: PropTypes.array.isRequired
};

export default TrackPlayer;
