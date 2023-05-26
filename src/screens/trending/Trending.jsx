import  { useEffect, useState } from 'react';
import { apiClient } from '../../spotify';
import './Trending.css';
import { useNavigate } from 'react-router-dom';

const Trending = () => {
  const [trendingSongs, setTrendingSongs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTrendingSongs = async () => {
      try {
        const response = await apiClient.get('/browse/new-releases');
        setTrendingSongs(response.data.albums.items);
        console.log(response.data.albums.items);
      } catch (error) {
        console.error('Failed to fetch trending songs:', error);
      }
    };

    fetchTrendingSongs();
  }, []);

  const openTrack = (id) => {
    navigate("/player", { state: { trackId: id } });

  };

  const handleNotDeveloped = () => {
    navigate("/notdeveloped");
  };

  return (
    <div className="trending-container">
      <h1 className='trending-title'>Trending Songs</h1>
      <div className="trending-grid">
        {trendingSongs.map((song) => {
          const thumbnailUrl = song.images.length > 0 ? song.images[0].url : '';
          const artistName = song.artists[0].name;
         

          return (
            <div className="card" key={song?.id}  onClick={() => handleNotDeveloped()}>

              <img src={thumbnailUrl} alt={song.name} className="track-image" />
              <div className="details">
                <div className="track-name">{song.name}</div>
                <div className="artist-name">{artistName}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Trending;
