import { useEffect, useState } from "react";
import { apiClient } from "../../spotify";
import "./Feed.css";
import { useNavigate } from "react-router-dom";

export default function Feed() {
  const [categories, setCategories] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [albums, setAlbums] = useState([]);

  //instance of navigate
  const navigate = useNavigate();
  const openPlayer = (id) => () => {
    navigate("/player", { state: { id: id } });

  };

  const handleNotDeveloped = () => {
    navigate("/notdeveloped");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch audio book categories
        const categoriesResponse = await apiClient.get(
          "/browse/categories?country=IN"
        );
        setCategories(categoriesResponse.data.categories.items);

        // Fetch various playlists
        const playlistsResponse = await apiClient.get(
          "/browse/featured-playlists?country=IN"
        );
        setPlaylists(playlistsResponse.data.playlists.items);

        // Fetch new album releases
        const albumsResponse = await apiClient.get("/browse/new-releases");
        setAlbums(albumsResponse.data.albums.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="feed-container">
      {/* Various playlists */}
      <div>
        <h2 className="feed-title">Top Playlists</h2>
        <div className="feed-grid">
          {playlists.map((playlist) => (
            <div
              key={playlist.id}
              className="card"
              onClick={openPlayer(playlist.id)}
            >
              <img
                src={playlist.images[0].url}
                alt="Playlist"
                className="track-image"
              />
              <div className="details">
                <p className="track-name">{playlist.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Audio book categories */}
      <div>
        <h2 className="feed-title second">Audio Books</h2>
        <div className="feed-grid">
          {categories.map((category) => (
            <div
              key={category.id}
              className="card"
              onClick={() => handleNotDeveloped()}
            >
              <img
                src={category.icons[0].url}
                alt="Category"
                className="track-image"
              />
              <div className="details">
                <p className="track-name">{category.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New album releases */}
      <div>
        <h2 className="feed-title second">New Albums</h2>
        <div className="feed-grid">
          {albums.map((album) => (
            <div key={album.id} className="card"  onClick={() => handleNotDeveloped()}>
              <img
                src={album.images[0].url}
                alt="Album"
                className="track-image"
              />
              <div className="details">
                <p className="track-name">{album.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
