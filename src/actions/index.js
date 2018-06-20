import axios from 'axios';
import { GET_START_ARTICLES } from './actionTypes';

export async function getArticles() {
	const request = await axios.get('http://localhost:3004/articles?_limit=3')
	.then(res => {
		return res.data
	})

	return{
		type: GET_START_ARTICLES,
		payload: request
	}
}
