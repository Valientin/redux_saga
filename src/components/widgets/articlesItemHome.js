import React from 'react';
import ReactHtmlParser from 'react-html-parser';

const Article = (props) => {
    return (
        <div className="articles-item">
            <div className="articles-item__title">{props.title}</div>
            <div className="articles-item__body">{ReactHtmlParser(props.body)}</div>
            <div className="articles-item__date" >{props.date}</div>
        </div>
    )
}

export default Article;