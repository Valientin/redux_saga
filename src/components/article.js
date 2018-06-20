import React from 'react';

const Article = (props) => {
    return (
        <div className="item">
            <div className="item-name">{props.title}</div>
            <div className="item-button">{props.id}</div>
        </div>
    )
}

export default Article;