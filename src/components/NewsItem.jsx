import './NewsItem.css'
import zoro from '../Images/zoro.png'
import PropTypes from 'prop-types'

export default function NewsItem(props) {
    const { link, media, title, summary, postDate, rights } = props
    return (
        <article className='article-newsItem'>
            <div className='c-one'>
                <div className='c-two'>
                    <a className='link-cta' href={link} target='_blank' rel='noreferrer'>
                        <div className='c-three'>
                            <img className='thumbnail' src={media} onError={(e) => e.target.src = zoro} alt="Couldn't load" />
                            <h1>{title}</h1>
                            <p className='para'>{summary}</p>
                        </div>
                    </a>
                </div>
            </div>
            <div className='source-info'>
                <p className='postDate'>{postDate}</p>
                <a className='rights' href={rights}>{rights}</a>
            </div>
        </article >
    )
}

NewsItem.propTypes = {
    link: PropTypes.string.isRequired,
    media: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    postDate: PropTypes.string.isRequired,
    rights: PropTypes.string,
}