import { useState, useEffect } from 'react'
import scrollTop from '../Images/scrollToTop.svg'
import './ScrollUp.css'

export default function ScrollUp() {
    const [isVisible, setIsVisible] = useState(true)

    const scrollToTop = () => {
        window.scrollTo({
            top: 10,
            left: 0,
            behavior: 'smooth',
        });
    }

    useEffect(() => {
        const handleScroll = () => {
            //https://plainenglish.io/blog/hiding-dom-elements-in-react-based-on-scrolling-d9a9ef1f1f5
            let heightToHideFrom = 700;
            const winScroll = document.body.scrollTop || document.documentElement.scrollTop;

            if (winScroll > heightToHideFrom) {
                isVisible &&      // to limit setting state only the first time
                    setIsVisible(false);
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
        <div className={`top ${isVisible ? 'hide' : 'show'}`} onClick={() => scrollToTop()}>
            <img src={scrollTop} onClick={() => scrollToTop()} className='to-top' alt='To Top' />
        </div>
    )
}