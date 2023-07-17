import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import menu from '../Images/menu.svg';
import exit from '../Images/exit.svg';
import moon from '../Images/moon.svg';
import sun from '../Images/sun.svg';
import ellipsis from '../Images/ellipsis.svg';
import './Navbar.css'

export default function Navbar() {
  const [mode, setMode] = useState(true)
  const [theme, setTheme] = useState('darkMode')
  const [hamBar, setHamBar] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('darkMode', theme === 'darkMode');
    document.body.classList.toggle('lightMode', theme === 'lightMode');
  }, [theme])

  const toggleMode = () => {
    if (theme === 'darkMode') {
      setTheme('lightMode')
      setMode(false)
    } else if (theme === 'lightMode') {
      setTheme('darkMode')
      setMode(true)
    }
  }

  const toggleHambar = () => {
    if (window.matchMedia('(max-width: 1370px)').matches) {
      if (hamBar === false) {
        setHamBar(true);
      } else if (hamBar === true) {
        setHamBar(false);
      }
    }
  }

  const closeMenu = () => {
    setHamBar(false);
  }

  return (
    <div className="navbar">
      <div className="container-navbar">
        <div className="logo-container">
          <Link to="/" className="logo">CHAI <span>NEWS</span></Link>
        </div>
        <img id="mobile-cta" className={`mobile-menu ${hamBar ? 'hide' : 'show'}`} src={menu} alt="Open Navigation" onClick={() => toggleHambar()} />

        <nav>
          <img id="mobile-exit" className={`mobile-menu-exit ${hamBar ? 'show' : 'hide'}`} src={exit} alt="Close Navigation" onClick={() => toggleHambar()} />

          <div className={`nav-div ${hamBar ? 'show' : 'hide'}`}>

            <ul className={`nav-one`}>
              <li><Link to="/" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Home</Link></li>
              <li><Link to="/chai" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Chai</Link></li>
              <li><Link to="/anime" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Anime</Link></li>
            </ul>

            <div className='line-break'>
              <div></div>
            </div>

            <ul className={`nav-two`}>
              <li><Link to="/business" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Business</Link></li>
              <li><Link to="/technology" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Technology</Link></li>
              <li><Link to="/entertainment" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Entertainment</Link></li>
            </ul>

            <ul className={`nav-three`}>
              <li><Link to="/sport " onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Sport </Link></li>
              <li><Link to="/gaming" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Gaming</Link></li>
              <li><Link to="/music" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Music</Link></li>
            </ul>

            <ul className={`nav-four`}>
              <li><Link to="/beauty" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Beauty</Link></li>
              <li><Link to="/science" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Science</Link></li>
              <li><Link to="/food" onClick={() => closeMenu()} className={`${hamBar ? 'hide' : 'show'}`}>Food</Link></li>
            </ul>
          </div>

          <div className='ellipsis-container'>
            <img className={`ellipsis ${hamBar ? 'hide' : 'show'}`} src={ellipsis} alt="Open Navigation" onClick={() => toggleHambar()} />
          </div>

          <div className='sun-moon'>
            <img className={`sun ${mode ? 'show' : 'hide'}`} onClick={() => toggleMode()} src={sun} alt="Dark Mode" />
            <img className={`moon ${mode ? 'hide' : 'show'}`} onClick={() => toggleMode()} src={moon} alt="Light Mode" />
          </div>
        </nav>
      </div>
    </div>
  )
}