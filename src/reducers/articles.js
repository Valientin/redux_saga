import {
  ARTICLE_FETCH_SUCCEEDED,
  ARTICLE_FETCH_FAILED,
  GET_START_ARTICLES,
  GET_ALL_ARTICLES_SUCCEEDED,
  GET_ALL_ARTICLES_FAILED,
  GET_ARTICLE,
  CLEAR_ARTICLES
} from '../actions/actionTypes';

const initialState = {
  articles: []
}

export function articles(state = initialState, action) {
  switch (action.type) {
    case GET_START_ARTICLES:
      return {...state, articles: action.payload}
    case ARTICLE_FETCH_SUCCEEDED:
      return {...state, articles: state.articles.concat(action.payload)}
    case ARTICLE_FETCH_FAILED:
      return {...state, message: action.payload}
    case GET_ALL_ARTICLES_SUCCEEDED:
      return {...state, allArticles: action.payload}
    case GET_ALL_ARTICLES_FAILED:
      return {...state, message: action.payload}
    case GET_ARTICLE:
      return {...state, article: action.payload}
    case CLEAR_ARTICLES:
      return {...state, articles: action.payload}
    default:
      return state
  }
}