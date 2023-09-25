import { useState, useMemo } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import searchIcon from './Images/search-icon.svg';
import slideLeft from './Images/slideLeft.svg';

export default function App() {

  const navigate = useNavigate()
  const [userSearch, setUserSearch] = useState('');
  const [userSearchData, setUserSearchData] = useState('');
  const [searchBar, setSearchBar] = useState(false);

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.type === 'click') {
      e.preventDefault();
      setUserSearchData(userSearch.trim());
      navigate(`/${userSearch.trim()}`)
      setSearchBar(false);
      setUserSearch('')
    }
  }

  const handleInputChange = (e) => {
    setUserSearch(e.target.value);
  }

  const toggleSearchbar = () => {
    setSearchBar((e) => !e);
  }

  const memoizedRoutes = useMemo(() => {
    return (
      <Routes>
        <Route exact path="/" element={<News lang="en" qSearch="*" topic="news" key="/ " topText="Latest Headlines" />} />
        <Route exact path="/chai" element={<News lang={null} qSearch="tea OR coffee" topic={null} key="tea" topText="Tea/Coffee" />} />
        <Route exact path="/anime" element={<News lang={null} qSearch="anime" topic={null} key="anime" topText="Anime" />} />
        <Route exact path="/business" element={<News lang="en" qSearch="business" topic="business" key="business" topText="Business" />} />
        <Route exact path="/technology" element={<News lang="en" qSearch="tech" topic="tech" key="tech" topText="Technology" />} />
        <Route exact path="/entertainment" element={<News lang="en" qSearch="entertainment" topic="entertainment" key="entertainment" topText="Entertainment" />} />
        <Route exact path="/sport" element={<News lang="en" qSearch="sport" topic="sport" key="sport" topText="Sport" />} />
        <Route exact path="/gaming" element={<News lang="en" qSearch="gaming" topic="gaming" key="gaming" topText="Gaming" />} />
        <Route exact path="/music" element={<News lang="en" qSearch="music" topic="music" key="music" topText="Music" />} />
        <Route exact path="/beauty" element={<News lang="en" qSearch="beauty" topic="beauty" key="beauty" topText="Beauty" />} />
        <Route exact path="/science" element={<News lang="en" qSearch="science" topic="science" key="science" topText="Science" />} />
        <Route exact path="/food" element={<News lang="en" qSearch="food" topic="food" key="food" topText="Food" />} />
        {userSearchData && (
          <Route exact path={`/${userSearchData}`} element={<News lang={null} qSearch={`${userSearchData}`} topic={null} key={`${userSearchData}`} topText={`Results for: ${userSearchData}`} />} />
        )}
      </Routes>
    );
  }, [userSearchData]);

  return (
    <>
      <Navbar />

      {memoizedRoutes}

      <div className={`search-input ${searchBar ? 'show' : 'hide'}`}>
        <img className="search-icon" onClick={handleKeyDown} src={searchIcon} alt="Search" />
        <input
          type="text"
          placeholder="Search"
          value={userSearch}
          onKeyDown={handleKeyDown}
          onChange={handleInputChange}
        />
        <img className="search-close" onClick={toggleSearchbar} src={slideLeft} alt="Close" />

      </div>

      <div className={`search-button ${searchBar ? 'hide' : 'show'}`}>
        <img src={searchIcon} onClick={toggleSearchbar} alt="Search bar" />
      </div>
    </>
  );
}
