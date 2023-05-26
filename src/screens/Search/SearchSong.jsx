import { useState, useEffect } from 'react';
import { apiClient } from '../../spotify';
import { RiSearchLine } from 'react-icons/ri';
import { useNavigate } from 'react-router-dom';
import './SearchSong.css';
import PropTypes from 'prop-types';

const SearchSong = ({ searchHistory, setSearchHistory, handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showPreviousSearches, setShowPreviousSearches] = useState(true);

  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    setShowPreviousSearches(true);
  };

  // Function to handle opening a track in the player
  const openTrack = (id) => {
    navigate('/player', { state: { trackId: id } });
  };

  const handlePreviousSearchClick = (prevSearch) => {
    setSearchQuery(prevSearch);
    handleSearch(prevSearch);
  };

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults([]);
      return;
    }

    const performSearch = async () => {
      try {
        const response = await apiClient.get(`/search?q=${searchQuery}&type=track`);

        if (response.status === 200) {
          setSearchResults(response.data.tracks.items);
          setShowPreviousSearches(false);

          // Update search history
          setSearchHistory((prevHistory) => [searchQuery, ...prevHistory.slice(0, 4)]);
        } else {
          console.error('Search failed:', response.status, response.statusText);
        }
      } catch (error) {
        console.error('Search failed:', error);
      }
    };

    performSearch();
  }, [searchQuery, setSearchHistory]);

  return (
    <div className="search-page">
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search for a song..."
          value={searchQuery}
          onChange={handleInputChange}
        />
        <button onClick={() => handleSearch(searchQuery)}>
          <RiSearchLine />
        </button>
      </div>

      <div className="search-results">
        {showPreviousSearches && (
          <div className="search-history">
            <h3 className="prev-search">Previous Searches</h3>
            {searchHistory.map((prevSearch, index) => (
              <div
                key={index}
                className="prev-search-item"
                onClick={() => handlePreviousSearchClick(prevSearch)}
              >
                {prevSearch}
              </div>
            ))}
          </div>
        )}

        {!showPreviousSearches && (
          <div className="search-results-list">
            {searchResults.length > 0 ? (
              searchResults.map((track) => (
                <div
                  key={track.id}
                  className="search-result-card"
                  onClick={() => openTrack(track.id)}
                >
                  <img src={track.album.images[0].url} alt={track.name} />
                  <div className="song-name">{track.name}</div>
                  <div className="artist-name">{track.artists[0].name}</div>
                </div>
              ))
            ) : (
              <div className="no-results">No results found</div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

SearchSong.propTypes = {
  searchHistory: PropTypes.array.isRequired,
  setSearchHistory: PropTypes.func.isRequired,
  handleSearch: PropTypes.func.isRequired,
};

export default SearchSong;
