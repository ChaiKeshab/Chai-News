import { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import './App.css';
import Navbar from './components/Navbar';
import News from './components/News';
import searchIcon from './Images/search-icon.svg';
import slideLeft from './Images/slideLeft.svg';

export default function App() {

  const linkRef = useRef(null)
  const [userSearch, setUserSearch] = useState('')
  const [userSearchData, setUserSearchData] = useState('')
  const [searchBar, setSearchBar] = useState(false)

  useEffect(() => {
    
    document.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    }
  }, [])
  
  const handleKeyDown = (event) => {
    if (event.key === 'Enter' || event.type === 'click') {
      event.preventDefault();
      // setState({ userSearchData: userSearch.trim() }, () => { // for avoiding double Enter
      //   linkRef.current.click();
      // });
      setUserSearchData(userSearch.trim())
      setSearchBar(false);
    }
  };

  const handleInputChange = (event) => {
    setUserSearch(event.target.value);
  };

  const toggleSearchbar = () => {
    if (searchBar === false) {
      setSearchBar(true);
    } else if (searchBar === true) {
      setSearchBar(false);
    }
  }

  return (
    <BrowserRouter>
      <Navbar title='CHAI ' spanTitle='News' />

      <Routes>
        <Route exact path='/' element={<News getNews="latest_headlines" topic={null} lang="en" key="/ " topText="Latest Headlines" />} />
        <Route exact path='/chai' element={<News getNews="search" qSearch="tea OR coffee" topic={null} key="tea" topText="Tea/Coffee" />} />
        <Route exact path='/anime' element={<News getNews="search" qSearch="anime" topic={null} key="anime" topText="Anime" />} />
        <Route exact path='/business' element={<News getNews="latest_headlines" topic="business" key="business" topText="Business" />} />
        <Route exact path='/technology' element={<News getNews="latest_headlines" topic="tech" key="tech" topText="Technology" />} />
        <Route exact path='/entertainment' element={<News getNews="latest_headlines" topic="entertainment" key="entertainment" topText="Entertainment" />} />
        <Route exact path='/sport' element={<News getNews="latest_headlines" topic="sport" key="sport" topText="Sport" />} />
        <Route exact path='/gaming' element={<News getNews="latest_headlines" topic="gaming" key="gaming" topText="Gaming" />} />
        <Route exact path='/music' element={<News getNews="latest_headlines" topic="music" key="music" topText="Music" />} />
        <Route exact path='/beauty' element={<News getNews="latest_headlines" topic="beauty" key="beauty" topText="Beauty" />} />
        <Route exact path='/science' element={<News getNews="latest_headlines" topic="science" key="science" topText="Science" />} />
        <Route exact path='/food' element={<News getNews="latest_headlines" topic="food" key="food" topText="Food" />} />

        {userSearchData && (
          <Route exact path={`/${userSearchData}`} element={<News getNews="search" qSearch={`${userSearchData}`} topic={null} key={`${userSearchData}`} topText={`Results for: ${userSearchData}`} />} />
        )}
      </Routes>

      <div className={`search-input ${searchBar ? 'show' : 'hide'}`}>

        <img className='search-icon' onClick={() => handleKeyDown()} src={searchIcon} alt="Search" />
        <input type="text" placeholder="Search.." value={userSearch} onChange={handleInputChange} />
        <img className='search-close' onClick={() => toggleSearchbar()} src={slideLeft} alt="Close" />

        {/* <Link to={`/${userSearchData}`} ref={linkRef} ></Link> */}

      </div>

      <div className={`search-button ${searchBar ? 'hide' : 'show'}`}>
        <img src={searchIcon} onClick={() => toggleSearchbar()} alt="Search bar" />
      </div>
    </BrowserRouter>
  )
}