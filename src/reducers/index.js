import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import filename from './filename';
import list from './list';
import message from './message';
import progress from './progress';

export default combineReducers({
  filename,
  list,
  message,
  progress,
  routing: routerReducer
});
