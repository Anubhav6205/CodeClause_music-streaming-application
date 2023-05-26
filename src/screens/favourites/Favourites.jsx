import  { useEffect, useState } from 'react';
import { apiClient } from '../../spotify';
import './Favourites.css';
import { useNavigate } from "react-router-dom";
const Favourites = () => {
  const [favorites, setFavorites] = useState([]);

  const navigate = useNavigate();
  const openTrack = (id) => {
    navigate("/player", { state: { trackId: id } });

  };

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        const response = await apiClient.get('/me/tracks');
        setFavorites(response.data.items);
      } catch (error) {
        console.error('Failed to fetch favorites:', error);
      }
    };

    fetchFavorites();
  }, []);

  return (
    <div className="favourites-container">
      <h1 className='favourites-title'>My Favorites</h1>
      <div className="favorites-grid">
        {favorites.map((favorite) => {
          const track = favorite.track;
          const thumbnailUrl = track.album.images.length > 0 ? track.album.images[0].url : '';
          const artistName = track.artists[0].name;
          if(thumbnailUrl)
          {
          return (
            <div className="card" key={track.id} 
            onClick={() => openTrack(track.id)}>
              <img src={thumbnailUrl} alt={track.name} className="track-image" />
              <div className="details">
                <div className="track-name">{track.name}</div>
                <div className="artist-name">{artistName}</div>
              </div>
            </div>
          );
          }
        })}
      </div>
    </div>
  );
};

export default Favourites;
