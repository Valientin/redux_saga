import React from 'react';
import { connect } from 'react-redux';
import { GET_ALL_ARTICLES } from '../../actions/actionTypes';

import { Link } from 'react-router-dom';

class Admin extends React.Component {

    componentDidMount(){
        this.props.getAllArticles();
    }

    showArticles = (articles) => (
        articles ?
            articles.map(item => (
                <tr key={item.id}>
                    <td>{item.author}</td>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    <td>
                        <Link className="admin-page__edit" to={`/admin/edit/${item.id}`}>Edit</Link>
                    </td>
                </tr>
            ))
        : null
    )

    render(){
        return(
            <div className="user_posts">
                <div className="admin-page__top">
                    <h4 className="admin-page__title">All articles:</h4>
                    <Link className="admin-page__add" to={`/admin/add`}>Add article</Link>
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Author</th>
                            <th>Title</th>
                            <th>Date Edit</th>
                            <th>Edit</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.showArticles(this.props.allArticles)}
                    </tbody>
                </table>
            </div>
        )
    }
}


function mapDispatchToProps(dispatch){
    return {
        getAllArticles: () => dispatch({type: GET_ALL_ARTICLES}),
    }
}


function mapStateToProps(state){
	return {
        allArticles: state.articles.allArticles
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Admin);