import * as types from '../constants/actionTypes';

export default function progress(state = 0, action) {
  switch (action.type) {
    case types.PROGRESS_CHANGE:
      return action.payload;
    default:
      return state;
  }
}