import { call, put, takeEvery } from 'redux-saga/effects';
import axios from 'axios';

import {
    ARTICLE_FETCH_SUCCEEDED,
    ARTICLE_FETCH_FAILED,
    ARTICLE_FETCH_REQUEST
} from '../actions/actionTypes';


const fetchArticlesApi = (limit) => {
    const request = axios.get(`http://localhost:3004/articles?_limit=${3}&_start=${limit}`)
	.then(res => {
		return res.data
    })
    return request;
}

function* fetchArticles(action) {
   try {
      const article = yield call(fetchArticlesApi, action.payload);
      yield put({type: ARTICLE_FETCH_SUCCEEDED, payload: article});
   } catch (e) {
      yield put({type: ARTICLE_FETCH_FAILED, payload: e.message});
   }
}


function* mySaga() {
  yield takeEvery(ARTICLE_FETCH_REQUEST, fetchArticles);
}


export default mySaga;