import { useState, useEffect } from 'react'
import scrollTop from '../Images/scrollToTop.svg'
import PropTypes from 'prop-types'
import './ScrollUp.css'

export default function ScrollUp(props) {
    const [isVisible, setIsVisible] = useState(true)

    useEffect(() => {
        const handleScroll = () => {
            //https://plainenglish.io/blog/hiding-dom-elements-in-react-based-on-scrolling-d9a9ef1f1f5
            let heightToHideFrom = 700;
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

            if (winScroll > heightToHideFrom) {
                isVisible && setIsVisible(false);
            } else {
                setIsVisible(true);
            }
        };
        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [isVisible])

    return (
        <div className={`top ${isVisible ? 'hide' : 'show'}`} onClick={props.scrollToTop}>
            <img src={scrollTop} onClick={props.scrollToTop} className='to-top' alt='To Top' />
        </div>
    )
}

ScrollUp.propTypes = {
    scrollToTop: PropTypes.func.isRequired
}