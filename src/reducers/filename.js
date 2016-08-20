import * as types from '../constants/actionTypes';

export default function filename(state = '', action) {
  switch (action.type) {
    case types.FILE_SELECTED:
      return action.payload;
    default:
      return state;
  }
}