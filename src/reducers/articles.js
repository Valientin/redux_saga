import {
  ARTICLE_FETCH_SUCCEEDED,
  ARTICLE_FETCH_FAILED,
  GET_START_ARTICLES
} from '../actions/actionTypes';
  
export function articles(state = {}, action) {
  switch (action.type) {
    case GET_START_ARTICLES:
      return {...state, articles: action.payload}
    case ARTICLE_FETCH_SUCCEEDED:
      return {...state, articles: state.articles.concat(action.payload)}
    case ARTICLE_FETCH_FAILED:
      return {...state, message: action.payload}
    default:
      return state
  }
}