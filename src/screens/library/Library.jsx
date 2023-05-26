import { useEffect, useState } from "react";
import { apiClient } from "../../spotify";
import PropTypes from "prop-types";
import { FiPlayCircle } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import "./Library.css";
export default function Library({setLatestId}) {
  const [playlists, setPlaylists] = useState([]);
  useEffect(() => {
    apiClient.get("me/playlists").then((response) => {
     
      setPlaylists(response.data.items);
    });
  }, []);
  
  //instance of navigate
  const navigate = useNavigate();
  const openPlayer = ((id) => () => {
    navigate('/player',{state:{id:id}})
  
    setLatestId(id);
  })


  return (
    <div className="library-body">
      {playlists.map((playlist) => {
        return (
          <div className="playlist-container" key={playlist.id} onClick={openPlayer(playlist.id)}>
            
            <img
              src={playlist.images[0].url}
              alt="image"
              className="playlist-image"
            ></img>
            <div className="playlist-details">
              <p className="playlist-name">{playlist.name}</p>
              <p className="playlist-total">{playlist.tracks.total} Songs</p>
            </div>
            <div className="playlist-button">
              <FiPlayCircle />
            </div>
          </div>
        );
      })}
    </div>
  );
}
Library.propTypes = {

  setLatestId: PropTypes.func.isRequired,


  
};
