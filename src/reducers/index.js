import { combineReducers } from 'redux';
import { articles } from './articles';
import { users } from './users';

const rootReducer = combineReducers({
  articles,
  users
})

export default rootReducer;