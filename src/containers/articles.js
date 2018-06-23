import React from 'react';
import { connect } from 'react-redux';
import { ARTICLE_FETCH_REQUEST } from '../actions/actionTypes';


import {getArticles} from '../actions';
import Article from '../components/widgets/articlesItemHome';

class Articles extends React.Component {

    componentDidMount(){
        this.props.getArticles();
    }

    renderItems = (articles) => (
        articles ? 
            articles.map( item => (
                <Article {...item} onClick={() => this.handleButton(item.id)} key={item.id}/>
            ))
        : null
    )
    
    handleButton = () => (
        this.props.getNextArticle(this.props.articles.length)
    )

	render(){
		return(
			<div>
				<h1>Articles</h1>
                {this.renderItems(this.props.articles)}
                <button className="load-more" onClick={this.handleButton}>Load more</button>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch){
    return {
        getNextArticle: (limit) => dispatch({type: ARTICLE_FETCH_REQUEST, payload: limit}),
        getArticles: () => dispatch(getArticles())
    }
}


function mapStateToProps(state){
	return {
        articles: state.articles.articles
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);