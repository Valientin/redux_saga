import { call, put, takeEvery } from 'redux-saga/effects';
import { fetchArticlesApi, fetchAllArticlesApi} from '../api/index';

import {
    ARTICLE_FETCH_SUCCEEDED,
    ARTICLE_FETCH_FAILED,
    ARTICLE_FETCH_REQUEST,
    GET_ALL_ARTICLES_SUCCEEDED,
    GET_ALL_ARTICLES_FAILED,
    GET_ALL_ARTICLES
} from '../actions/actionTypes';


function* fetchArticles(action) {
   try {
      const article = yield call(fetchArticlesApi, action.payload);
      yield put({type: ARTICLE_FETCH_SUCCEEDED, payload: article});
   } catch (e) {
      yield put({type: ARTICLE_FETCH_FAILED, payload: e.message});
   }
}

function* fetchAllArticles(action) {
  try {
     const article = yield call(fetchAllArticlesApi, action.payload);
     yield put({type: GET_ALL_ARTICLES_SUCCEEDED, payload: article});
  } catch (e) {
     yield put({type: GET_ALL_ARTICLES_FAILED, payload: e.message});
  }
}

function* mySaga() {
  yield takeEvery(ARTICLE_FETCH_REQUEST, fetchArticles);
  yield takeEvery(GET_ALL_ARTICLES, fetchAllArticles);
}


export default mySaga;