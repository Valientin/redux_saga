import React from 'react';
import { connect } from 'react-redux';
import { ARTICLE_FETCH_REQUEST } from '../actions/actionTypes';


import {getArticles} from '../actions';
import Article from './article';

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
    this.props.getArticle(this.props.articles.articles.length)
  )
  
  componentWillReceiveProps(nextProps){
      console.log(nextProps);
  }

	render(){
		return(
			<div>
				<h1>Hello!</h1>
        {this.renderItems(this.props.articles.articles)}
        <button className="load-more" onClick={this.handleButton}>Load more</button>
			</div>
		)
	}
}

function mapDispatchToProps(dispatch){
  return {
    getArticle: (limit) => dispatch({type: ARTICLE_FETCH_REQUEST, payload: limit}),
    getArticles: () => dispatch(getArticles())
  }
}


function mapStateToProps(state){
	return {
    articles: state.articles
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Articles);