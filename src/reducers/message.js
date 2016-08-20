import * as types from '../constants/actionTypes';

export default function message(state = '', action) {
  switch (action.type) {
    case types.MESSAGE_CHANGED:
      return action.payload;
    default:
      return state;
  }
}