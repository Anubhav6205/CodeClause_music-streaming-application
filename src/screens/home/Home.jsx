/* Home.jsx */
import { Route, Routes } from 'react-router-dom';
import Feed from '../feed/Feed';
import Favourites from '../favourites/Favourites';
import Library from '../library/Library';
import Player from '../player/Player';
import Trending from '../trending/Trending';
import Sidebar from '../../components/sidebar/Sidebar';
import Login from '../auth/Login';
import './Home.css';
import { useEffect, useState } from 'react';
import { setClientToken } from '../../spotify';
import SearchSong from '../Search/SearchSong';
import NotDeveloped from '../under development/NotDeveloped';

const Home = () => {
  const [token, setToken] = useState('');
  const [latestId, setLatestId] = useState(null);
  const [searchHistory, setSearchHistory] = useState([]);

  useEffect(() => {
    const hash = window.location.hash;
    const token = window.localStorage.getItem('token');
    window.location.hash = '';

    if (hash && !token) {
      let _token = hash.split('&')[0].split('=')[1];
      window.localStorage.setItem('token', _token);
      setToken(_token);
      setClientToken(_token);
    } else {
      setToken(token);
      setClientToken(token);
    }
  }, []);

  return !token ? (
    <Login />
  ) : (
    <div className="main-body">
      <Sidebar />
      <Routes>
        <Route path="/" element={<Library setLatestId={setLatestId} />} />
        <Route path="/feed" element={<Feed />} />
        <Route path="/favourites" element={<Favourites />} />
        <Route path="/library" element={<Library />} />
        <Route path="/player" element={<Player id={latestId} />} />
        <Route path="/trending" element={<Trending />} />
        <Route
          path="/search"
          element={<SearchSong searchHistory={searchHistory} setSearchHistory={setSearchHistory} />}
        />
        <Route path="/notdeveloped" element={<NotDeveloped/>}/>
      </Routes>
    </div>
  );
};

export default Home;
