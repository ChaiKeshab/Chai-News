import { useState, useEffect } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import NewsItem from './NewsItem'
import zoro from '../Images/zoro.png'
import './News.css'
import axios from 'axios'
import ScrollUp from './ScrollUp';
import PropTypes from 'prop-types'
import LoadingBar from 'react-top-loading-bar'

// import exdata from './example2.json'

const News = (props) => {

    const [progress, setProgress] = useState(0)
    const [articles, setArticles] = useState([])
    const [pageNo, setPageNo] = useState(2)
    const [totalResults, setTotalResults] = useState(0)
    const [count, setCount] = useState(0)

    const { getNews, qSearch, topic, lang } = props;
    useEffect(() => {
        const getRequestNews = async () => {
            try {
                const apiKey = await import.meta.env.VITE_API;
                setProgress((value) => value + 20);
                const apiUrl = `https://api.newscatcherapi.com/v2/${getNews}`;

                const params = {
                    page_size: 50,
                    page: 1,
                    topic: topic,
                };

                if (getNews === 'search') {
                    params.q = qSearch;
                    params.sort_by = 'relevancy';
                }
                else if (getNews === 'latest_headlines') {
                    params.lang = lang;
                }

                const format = {
                    method: 'GET',
                    url: apiUrl,
                    params: params,
                    headers: {
                        'x-api-key': apiKey
                    }
                };

                const response = await axios.request(format);
                setProgress((value) => value + 40);
                setArticles(response.data.articles);
                setTotalResults(response.data.total_hits);
                setProgress(100);
            } catch (error) {
                console.error(error);
                setTimeout(() => {
                    setCount(count + 1)
                }, 1000);
            }
        };
        getRequestNews();
        scrollToTop();
    }, [getNews, lang, qSearch, topic, count]);

    const fetchMoreData = async () => {
        setPageNo((page) => page + 1)
        try {
            const apiKey = await import.meta.env.VITE_API;
            setProgress((value) => value + 20);
            const apiUrl = `https://api.newscatcherapi.com/v2/${getNews}`;

            const params = {
                page_size: 50,
                page: pageNo,
                topic: topic,
            };

            if (getNews === 'search') {
                params.q = qSearch;
                params.sort_by = 'relevancy';
            }
            else if (getNews === 'latest_headlines') {
                params.lang = lang;
            }

            const format = {
                method: 'GET',
                url: apiUrl,
                params: params,
                headers: {
                    'x-api-key': apiKey,
                },
            };

            const response = await axios.request(format)
            setProgress((value) => value + 40);
            setArticles((data) => data.concat(response.data.articles));
            setTotalResults(response.data.total_hits);
            setProgress(100);
        } catch (error) {
            // setArticles(exdata.articles);
            setTimeout(() => {
                fetchMoreData()
            }, 1000);
            console.error(error);
        }
    };

    const formattedDate = (dateString) => {
        const currentDate = new Date();
        const inputDate = new Date(dateString);
        const timeDiff = currentDate.getTime() - inputDate.getTime();
        const secondsDiff = Math.floor(timeDiff / 1000);

        if (secondsDiff < 60) {
            return 'Just now';
        } else if (secondsDiff < 3600) {
            const minutesDiff = Math.floor(secondsDiff / 60);
            return `${minutesDiff} minute${minutesDiff === 1 ? '' : 's'} ago`;
        } else if (secondsDiff < 86400) {
            const hoursDiff = Math.floor(secondsDiff / 3600);
            return `${hoursDiff} hour${hoursDiff === 1 ? '' : 's'} ago`;
        } else {
            const daysDiff = Math.floor(secondsDiff / 86400);
            return `${daysDiff} day${daysDiff === 1 ? '' : 's'} ago`;
        }
    }

    const scrollToTop = () => {
        window.scrollTo({
            top: 10,
            left: 0,
            behavior: 'smooth',
        });
    }

    const currentDate = new Date();
    const format = { weekday: 'long', month: 'long', day: 'numeric' };
    const formatDate = currentDate.toLocaleDateString('en-US', format);

    return (
        <>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            <div className="main">

                <div className="top-text">
                    <h2>{props.topText}</h2>
                    <p>{formatDate}</p>
                </div>

                <div className="wrap">
                    <InfiniteScroll
                        className='infiniteScroll'
                        dataLength={articles.length}
                        next={() => fetchMoreData()}
                        hasMore={articles.length !== totalResults}
                    // loader={<div>loading</div>}
                    >
                        {articles.length > 0 ? (
                            articles.map((element, index) => (
                                <div className="container-news" key={`${element._id}${index}`}>
                                    <NewsItem
                                        title={element.title}
                                        link={element.link}
                                        media={element.media ? element.media : zoro}
                                        postDate={formattedDate(element.published_date)}
                                        rights={element.rights}
                                        summary={`${!element.summary ? '' : element.summary.slice(0, 169)}...`}
                                    />
                                </div>
                            ))
                        ) : <div className='no-item'></div>}
                    </InfiniteScroll>
                </div>
                <ScrollUp scrollToTop={scrollToTop} />
            </div>
        </>
    );
}

News.propTypes = {
    qSearch: PropTypes.string,
    topic: PropTypes.string,
    topText: PropTypes.string.isRequired,
    getNews: PropTypes.string.isRequired,
    lang: PropTypes.string.isRequired,
}

News.defaultProps = {
    qSearch: "*",
    topic: "null",
    topText: "Latest Headlines",
    getNews: 'latest_headlines',
    lang: "en"
}

export default News